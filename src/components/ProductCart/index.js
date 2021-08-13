import React from 'react';
import arrowPrev from '../../img/arrow-left-white.svg';
import arrowNext from '../../img/arrow-right-white.svg';

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
        const { product: { product }, minusItem } = this.props;
        minusItem(product);
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
                <div className="info">
                    <div className="product-info">
                        <p className="title">{product.brand}</p>
                        <p className="name">{product.name}</p>
                        <p>{amount}</p>
                        <div className="attributes">
                            {/* <span>SIZE:</span> */}
                        </div>
                    </div>
                    <div className="count">
                        <button className="btn btn-plus" onClick={this.onClickPlus}>+</button>
                        <span>{count}</span>
                        <button className="btn btn-minus" onClick={this.onClickMinus}>-</button>
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

export default ProductCart;