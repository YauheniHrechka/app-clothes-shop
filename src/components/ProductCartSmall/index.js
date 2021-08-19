import React from 'react';
import './ProductCartSmall.scss';

class ProductCartSmall extends React.Component {

    onClickPlus = () => {
        const { product: { product }, plusItem } = this.props;
        plusItem(product);
    }

    onClickMinus = () => {
        const { product: { product, count }, deleteProduct, minusItem } = this.props;
        // console.log('count => ', count);
        (count === 1 ? deleteProduct : minusItem)(product);
    }

    render() {
        const { product: { product, amount, count } } = this.props;

        return (
            <div className="product-cart-small">
                <div className="info-wrapper-small">
                    <div className="product-info-small">
                        <div className="title-small">
                            <p>{product.brand}</p>
                            <p>{product.name}</p>
                        </div>
                        <p className="price-small">{amount}</p>
                        <div className="attributes">
                            <span>SIZE:</span>
                        </div>
                    </div>
                    <div className="count-small">
                        <button className="btn btn-plus" onClick={this.onClickPlus}>+</button>
                        <span>{count}</span>
                        <button className="btn btn-minus" onClick={this.onClickMinus}>-</button>
                    </div>
                    <div className="image-show-small">
                        <img src={product.gallery[0]} alt={product.name} />
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductCartSmall;