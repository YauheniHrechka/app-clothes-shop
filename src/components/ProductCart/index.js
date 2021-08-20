import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../';
import arrowPrev from '../../assets/img/arrow-left-white.svg';
import arrowNext from '../../assets/img/arrow-right-white.svg';

import './ProductCart.scss';

class ProductCart extends React.Component {
    state = {
        activeSlide: 0
    }

    onClickPlus = () => {
        const { product: { product }, plusItem } = this.props;
        plusItem(product);
    }

    onClickMinus = () => {
        const { product: { product, count }, deleteProduct, minusItem } = this.props;
        (count === 1 ? deleteProduct : minusItem)(product);
    }

    onClickPrev = () => {
        const { product: { product } } = this.props;
        let { activeSlide } = this.state;

        this.setState({
            activeSlide: activeSlide === 0 ?
                product.gallery.length - 1 :
                --activeSlide
        })
    }

    onClickNext = () => {
        const { product: { product } } = this.props;
        let { activeSlide } = this.state;

        this.setState({
            activeSlide: activeSlide === product.gallery.length - 1 ?
                0 :
                ++activeSlide
        })
    }

    render() {
        const { product: { product, amount, count } } = this.props;
        const { activeSlide } = this.state;

        return (
            <div className="product-cart">
                <hr />
                <div className="info-wrapper">
                    <div className="product-info">
                        <p className="title">{product.brand}</p>
                        <p className="name">{product.name}</p>
                        <p>{amount}</p>
                        <div className="attributes">
                            {/* <span>SIZE:</span> */}
                        </div>
                    </div>
                    <div className="count">
                        <Button {...btnPlus} onClick={this.onClickPlus} />
                        <span>{count}</span>
                        <Button {...btnMinus} onClick={this.onClickMinus} />
                    </div>
                    <div className="image-show">
                        <img src={product.gallery[activeSlide]} alt={product.name} />
                        <button className="btn btn-prev" onClick={this.onClickPrev}>
                            <img src={arrowPrev} alt="prev" />
                        </button>
                        <button className="btn btn-next" onClick={this.onClickNext}>
                            <img src={arrowNext} alt="next" />
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

const btnProps = {
    style: {
        width: '45px',
        height: '45px',
        backgroundColor: '#ffffff',
        fontSize: '30px',
        border: '1px solid #1d1f22'
    },
    title: ''
}

const btnPlus = {
    style: {
        ...btnProps.style
    },
    title: '+'
}

const btnMinus = {
    style: {
        ...btnProps.style
    },
    title: '-'
}

ProductCart.propTypes = {
    product: PropTypes.object,
    deleteProduct: PropTypes.func,
    minusItem: PropTypes.func,
    plusItem: PropTypes.func
}

ProductCart.defaultProps = {
    product: {},
    deleteProduct: () => { },
    minusItem: () => { },
    plusItem: () => { }
}

export default ProductCart;