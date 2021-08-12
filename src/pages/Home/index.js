import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ProductCard } from '../../components';
import './Home.scss';

class Home extends React.Component {

    render() {
        const { activeCategory, products, currency } = this.props;
        // console.log('products => ', products);
        // console.log('render HOME');

        return (
            <main>
                <h2 className="title">{activeCategory.toUpperCase()}</h2>
                <div className="products">
                    {products.length > 0 &&
                        products.map(product =>
                            <Link to={`/products/${product.category}/${product.id}`}
                                key={product.id}>
                                <ProductCard currency={currency} {...product} />
                            </Link>)}
                </div>
            </main>
        )
    }
}

const mapStateToProps = ({ categories: { products, filters }, cart: { currency } }) => ({
    products: products.get(filters.category) || [],
    activeCategory: filters.category,
    currency
})

export default connect(mapStateToProps)(Home);