import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import emptyCart from '../../assets/img/empty-cart.svg';

import './ProductCard.scss';

class ProductCard extends React.Component {

    render() {
        const { id, category, name, gallery, prices, inCart, inStock, currency } = this.props;
        const price = prices.find(price => price.currency === currency).amount;

        return (
            <figure className={`product-card ${inCart ? `product-in-cart` : ``}`}>
                {!inStock && <div className="out-of-stock">OUT OF STOCK</div>}
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

ProductCard.propTypes = {
    id: PropTypes.string,
    category: PropTypes.string,
    name: PropTypes.string,
    gallery: PropTypes.array,
    prices: PropTypes.array,
    inCart: PropTypes.bool,
    inStock: PropTypes.bool,
    currency: PropTypes.string
}

ProductCard.defaultProps = {
    id: '',
    category: '',
    name: '',
    gallery: [],
    prices: [],
    inCart: false,
    inStock: false,
    currency: ''
}

export default ProductCard;