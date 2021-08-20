import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ProductCard } from '../../components';

import './Home.scss';

class Home extends React.Component {

    render() {
        const { activeCategory, products, productsCart, currency } = this.props;
        // console.log('products => ', products);
        // console.log('render HOME');

        return (
            <>
                <h2 className="title">{activeCategory}</h2>
                <div className="products">
                    {products.length > 0 &&
                        products.map(product =>
                            <ProductCard
                                inCart={productsCart.has(product.id)}
                                currency={currency}
                                {...product}
                                key={product.id} />)}
                </div>
            </>
        )
    }
}

const mapStateToProps = ({ categories: { products, filters }, cart: { currency, products: productsCart } }) => ({
    activeCategory: filters.category,
    currency,
    products: products.get(filters.category) || [],
    productsCart
})

Home.propTypes = {
    activeCategory: PropTypes.string,
    currency: PropTypes.string,
    products: PropTypes.array,
    productsCart: PropTypes.any
}

Home.defaultProps = {
    activeCategory: '',
    currency: '',
    products: [],
    productsCart: new Map()
}

export default connect(mapStateToProps)(Home);