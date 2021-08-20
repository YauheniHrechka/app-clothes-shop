import React from 'react';
import PropTypes from 'prop-types';
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
                {products.length > 0 &&
                    products.map(product =>
                        <ProductCart
                            deleteProduct={deleteProduct}
                            plusItem={plusItem}
                            minusItem={minusItem}
                            product={product}
                            key={product[0]} />
                    )}
            </div>
        )
    }
}

const mapStateToProps = ({ cart: { products } }) => ({
    products: [...products]
})

const mapDispatchToProps = dispatch => ({
    plusItem: product => dispatch(plusItem(product)),
    minusItem: product => dispatch(minusItem(product)),
    deleteProduct: product => dispatch(deleteProduct(product))
})

Cart.propTypes = {
    products: PropTypes.array,
    deleteProduct: PropTypes.func,
    minusItem: PropTypes.func,
    plusItem: PropTypes.func
}

Cart.defaultProps = {
    products: [],
    deleteProduct: () => { },
    minusItem: () => { },
    plusItem: () => { }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);