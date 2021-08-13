import React from 'react';
import { connect } from 'react-redux';
import { ProductCart } from '../../components';

import { minusItem, plusItem } from '../../redux/actions/cart';

import './Cart.scss';

class Cart extends React.Component {

    render() {
        const { products, minusItem, plusItem } = this.props;

        return (
            <div className="cart">
                <h2>CART</h2>
                {products.map(product =>
                    <ProductCart
                        plusItem={plusItem}
                        minusItem={minusItem}
                        product={product}
                        key={product.product.id} />
                )}
            </div>
        )
    }
}

const mapStateToProps = ({ cart: { products } }) => ({
    products: [...products.values()]
})

const mapDispatchToProps = dispatch => ({
    plusItem: product => dispatch(plusItem(product)),
    minusItem: product => dispatch(minusItem(product))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart);