import React from 'react';
import { ProductCard } from '../../components';
import { connect } from 'react-redux';
import './Home.scss';

class Home extends React.Component {

    render() {
        const { activeCategory, products } = this.props;
        // console.log('products => ', products);

        return (
            <main>
                <h2 className="title">{activeCategory.toUpperCase()}</h2>
                <div className="products">
                    {products.length > 0 &&
                        products.map(product => <ProductCard key={product.id} {...product} />)}
                </div>
            </main>
        )
    }
}

const mapStateToProps = ({ categories: { products, filters } }) => ({
    products: products.get(filters.category) || [],
    activeCategory: filters.category
})

export default connect(mapStateToProps)(Home);