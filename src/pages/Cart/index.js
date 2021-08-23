import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ProductCart } from '../../components';
import { deleteProduct, minusItem, plusItem } from '../../redux/actions/cart';

import './Cart.scss';

class Cart extends React.Component {

    render() {
        const { products, currency, deleteProduct, minusItem, plusItem, totalAmount } = this.props;

        return (
            <div className="cart">
                <h2>CART</h2>
                {products.length > 0 &&
                    products.map(product =>
                        <ProductCart
                            currency={currency}
                            deleteProduct={deleteProduct}
                            plusItem={plusItem}
                            minusItem={minusItem}
                            product={product}
                            key={product[0]} />
                    )}
                <div className="total">
                    <span>Total</span><span>{`${currency} ${totalAmount}`}</span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ cart: { products, currency, totalAmount } }) => ({
    products: [...products],
    currency,
    totalAmount: totalAmount.toFixed(2)
})

const mapDispatchToProps = dispatch => ({
    plusItem: product => dispatch(plusItem(product)),
    minusItem: product => dispatch(minusItem(product)),
    deleteProduct: product => dispatch(deleteProduct(product))
})

Cart.propTypes = {
    products: PropTypes.array,
    currency: PropTypes.string,
    totalAmount: PropTypes.string,
    deleteProduct: PropTypes.func,
    minusItem: PropTypes.func,
    plusItem: PropTypes.func
}

Cart.defaultProps = {
    products: [],
    currency: '',
    totalAmount: '0.00',
    deleteProduct: () => { },
    minusItem: () => { },
    plusItem: () => { }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);