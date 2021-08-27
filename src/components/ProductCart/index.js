import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Button } from '../';
import arrowPrev from '../../assets/img/arrow-left-white.svg';
import arrowNext from '../../assets/img/arrow-right-white.svg';

import './ProductCart.scss';

class ProductCart extends React.PureComponent {
    state = {
        activeSlide: 0
    }

    onClickPlus = () => {
        const { product: [productId, { product }], plusItem } = this.props;
        plusItem({ productId, product });
    }

    onClickMinus = () => {
        const { product: [productId, { product, count }], deleteProduct, minusItem } = this.props;
        (count === 1 ? deleteProduct : minusItem)({ productId, product });
    }

    onClickPrev = () => {               // get the previous slide ...
        const { product: [, { product }] } = this.props;
        let { activeSlide } = this.state;

        this.setState({
            activeSlide: activeSlide === 0 ?
                product.gallery.length - 1 :
                --activeSlide
        })
    }

    onClickNext = () => {               // get the next slide ...
        const { product: [, { product }] } = this.props;
        let { activeSlide } = this.state;

        this.setState({
            activeSlide: activeSlide === product.gallery.length - 1 ?
                0 :
                ++activeSlide
        })
    }

    render() {
        const { product: [, { product, attributes, count }], currency } = this.props;
        const { activeSlide } = this.state;
        const price = product.prices.find(price => price.currency === currency).amount.toFixed(2);

        return (
            <div className="product-cart">
                <div className="separator"></div>
                <div className="info-wrapper">
                    <div className="product-info">
                        <Link to={`/products/${product.category}/${product.id}`}>
                            <p className="product-title">{product.brand}</p>
                            <p className="product-name">{product.name}</p>
                            <p className="price">{`${currency} ${price}`}</p>
                        </Link>
                        <div className="attributes">
                            {product.attributes.length > 0 &&
                                product.attributes.map(attribute =>
                                    <div key={attribute.id} className="attribute-items">
                                        {attribute.items.map(item =>
                                            <Button
                                                style={{
                                                    ...btnAttribute.style,
                                                    background: attribute.type === 'swatch' ? item.value : btnAttribute.style.background,
                                                    color: attributes.get(attribute.id) === item.id ? '#a6a6a6' :
                                                        attribute.type === 'swatch' && item.value === '#000000' ? '#ffffff' : btnAttribute.style.color,
                                                    border: attributes.get(attribute.id) === item.id ? '1px solid #a6a6a6' : btnAttribute.style.border
                                                }}
                                                title={attribute.type === 'swatch' ? '' : item.value}
                                                key={item.id} />
                                        )}
                                    </div>)}
                        </div>
                    </div>
                    <div className="count">
                        <Button {...btnPlus} onClick={this.onClickPlus} />
                        <span>{count}</span>
                        <Button {...btnMinus} onClick={this.onClickMinus} />
                    </div>
                    <div className="image-show">
                        <img src={product.gallery[activeSlide]} alt={product.name} />
                        {product.gallery.length > 1 &&
                            <>
                                <button className="btn btn-prev" onClick={this.onClickPrev}>
                                    <img src={arrowPrev} alt="prev" />
                                </button>
                                <button className="btn btn-next" onClick={this.onClickNext}>
                                    <img src={arrowNext} alt="next" />
                                </button>
                            </>}
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

const btnAttribute = {
    style: {
        padding: '5px',
        margin: '0 10px 12px 0',
        minWidth: '65px',
        height: '45px',
        background: '#ffffff',
        color: '#292929',
        fontSize: '18px',
        border: '1px solid #1d1f22'
    },
    title: ''
}

ProductCart.propTypes = {
    product: PropTypes.array,
    deleteProduct: PropTypes.func,
    minusItem: PropTypes.func,
    plusItem: PropTypes.func
}

ProductCart.defaultProps = {
    product: [],
    deleteProduct: () => { },
    minusItem: () => { },
    plusItem: () => { }
}

export default ProductCart;