import React from 'react';
import { connect } from 'react-redux';
import { ProductCart } from '../../components';

import { deleteProduct, minusItem, plusItem } from '../../redux/actions/cart';

import './Cart.scss';

class Cart extends React.Component {

    render() {
        const { products, deleteProduct, minusItem, plusItem } = this.props;

        return (
            <div className="cart">
                <h2>CART</h2>
                {products.map(product =>
                    <ProductCart
                        deleteProduct={deleteProduct}
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
    minusItem: product => dispatch(minusItem(product)),
    deleteProduct: product => dispatch(deleteProduct(product))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart);