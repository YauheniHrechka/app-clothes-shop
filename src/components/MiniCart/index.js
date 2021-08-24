import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Button, ProductCartSmall } from '..';
import { deleteProduct, minusItem, plusItem } from '../../redux/actions/cart';

import './MiniCart.scss';

class MiniCart extends React.PureComponent {

    render() {
        const { products, currency, deleteProduct, minusItem, plusItem, totalCount, totalAmount, refMiniCart } = this.props;

        return (
            <div ref={refMiniCart} className="mini-cart">
                <div className="mini-title">
                    <span>My Bag,</span><span>{` ${totalCount} items`}</span>
                </div>
                <div className="mini-products">
                    {products.map(product =>
                        <ProductCartSmall
                            currency={currency}
                            deleteProduct={deleteProduct}
                            plusItem={plusItem}
                            minusItem={minusItem}
                            product={product}
                            key={product[0]} />
                    )}
                </div>
                <div className="mini-total">
                    <span>Total</span><span>{`${currency} ${totalAmount}`}</span>
                </div>
                <div className="buttons">
                    <Link to="/cart">
                        <Button {...btnViewBag} />
                    </Link>
                    <Button {...btnCheckOut} />
                </div>
            </div>
        )
    }
}

const btnProps = {
    style: {
        width: '140px',
        height: '43px',
        padding: '16px',
        backgroundColor: '#ffffff'
    },
    title: ''
}

const btnViewBag = {
    style: {
        ...btnProps.style,
        border: '1px solid #1d1f22',
    },
    title: 'VIEW BAG'
}

const btnCheckOut = {
    style: {
        ...btnProps.style,
        background: '#5ece7b',
        color: '#ffffff'
    },
    title: 'CHECK OUT'
}

const mapStateToProps = ({ cart: { products, currency, totalCount, totalAmount } }) => ({
    products: [...products],
    currency,
    totalCount,
    totalAmount: totalAmount.toFixed(2)
})

const mapDispatchToProps = dispatch => ({
    plusItem: product => dispatch(plusItem(product)),
    minusItem: product => dispatch(minusItem(product)),
    deleteProduct: product => dispatch(deleteProduct(product))
})

MiniCart.propTypes = {
    products: PropTypes.array,
    currency: PropTypes.string,
    deleteProduct: PropTypes.func,
    minusItem: PropTypes.func,
    plusItem: PropTypes.func,
    totalCount: PropTypes.number,
    totalAmount: PropTypes.string,
    refPreviewCart: PropTypes.any
}

MiniCart.defaultProps = {
    products: [],
    currency: '',
    deleteProduct: () => { },
    minusItem: () => { },
    plusItem: () => { },
    totalCount: 0,
    totalAmount: '0.00',
    refPreviewCart: React.createRef()
}

export default connect(mapStateToProps, mapDispatchToProps)(MiniCart);