import React from 'react';
import { Link } from 'react-router-dom';
import emptyCart from '../../img/empty-cart.svg';
import './ProductCard.scss';

class ProductCard extends React.Component {

    render() {
        // console.log(this.props);
        const { id, category, name, gallery, prices, inCart, inStock, currency } = this.props;
        const price = prices.find(price => price.currency === currency).amount;

        return (
            <figure className={`product-card ${inCart ? `product-in-cart` : ``}`}>
                {inStock && <div className="out-of-stock">OUT OF STOCK</div>}
                <Link to={`/products/${category}/${id}`}>
                    <img src={gallery[0]} alt={name} />
                    <figcaption>
                        <p>{name}</p>
                        <p className="product-price">{price}</p>
                        {inCart && <div className="in-cart">
                            <img src={emptyCart} alt="in cart" />
                        </div>}
                    </figcaption>
                </Link>
            </figure>
        )
    }
}

export default ProductCard;