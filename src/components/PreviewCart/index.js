import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Button, ProductCartSmall } from '../';
import { deleteProduct, minusItem, plusItem } from '../../redux/actions/cart';

import './PreviewCart.scss';

class PreviewCart extends React.Component {

    render() {
        const { products, deleteProduct, minusItem, plusItem, totalCount, totalAmount, refPreviewCart } = this.props;

        return (
            <div ref={refPreviewCart} className="preview-cart">
                <div className="preview-title">
                    <span>My Bag,</span><span>{` ${totalCount} items`}</span>
                </div>
                {products.map(product =>
                    <ProductCartSmall
                        deleteProduct={deleteProduct}
                        plusItem={plusItem}
                        minusItem={minusItem}
                        product={product}
                        key={product[0]} />
                )}
                <div className="total">
                    <span>Total</span><span>{totalAmount}</span>
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

const mapStateToProps = ({ cart: { products, totalCount, totalAmount } }) => ({
    products: [...products],
    totalCount,
    totalAmount
})

const mapDispatchToProps = dispatch => ({
    plusItem: product => dispatch(plusItem(product)),
    minusItem: product => dispatch(minusItem(product)),
    deleteProduct: product => dispatch(deleteProduct(product))
})

PreviewCart.propTypes = {
    products: PropTypes.array,
    deleteProduct: PropTypes.func,
    minusItem: PropTypes.func,
    plusItem: PropTypes.func,
    totalCount: PropTypes.number,
    totalAmount: PropTypes.number,
    refPreviewCart: PropTypes.any
}

PreviewCart.defaultProps = {
    products: [],
    deleteProduct: () => { },
    minusItem: () => { },
    plusItem: () => { },
    totalCount: 0,
    totalAmount: 0,
    refPreviewCart: React.createRef()
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviewCart);