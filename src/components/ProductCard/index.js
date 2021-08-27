import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { OutOfStock } from '../';
import emptyCart from '../../assets/img/empty-cart.svg';

import './ProductCard.scss';

class ProductCard extends React.PureComponent {

    render() {
        const { id, category, brand, name, gallery, prices, inCart, inStock, currency } = this.props;
        const price = prices.find(price => price.currency === currency).amount.toFixed(2);

        return (
            <figure className={`product-card ${inCart ? `product-in-cart` : ``}`}>
                {!inStock && <OutOfStock />}
                <Link to={`/products/${category}/${id}`}>
                    <img src={`${gallery.length ? gallery[0] : ''}`} alt={name} />
                </Link>
                <figcaption>
                    <p>{`${brand} ${name}`}</p>
                    <p className="product-price">{`${currency} ${price}`}</p>
                    {inCart &&
                        <Link to="/cart">
                            <div className="in-cart">
                                <img src={emptyCart} alt="in cart" />
                            </div>
                        </Link>}
                </figcaption>
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