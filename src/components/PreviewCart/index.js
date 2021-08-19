import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, ProductCartSmall } from '../';

import { deleteProduct, minusItem, plusItem } from '../../redux/actions/cart';

import './PreviewCart.scss';

class PreviewCart extends React.Component {

    render() {
        const { products, deleteProduct, minusItem, plusItem, totalCount, totalAmount, refPreviewCart } = this.props;
        // console.log('products => ', products);

        return (
            <div ref={refPreviewCart} className="preview-cart">
                <div className="title">
                    <span>My Bag,</span><span>{` ${totalCount} items`}</span>
                </div>
                {products.map(product =>
                    <ProductCartSmall
                        deleteProduct={deleteProduct}
                        plusItem={plusItem}
                        minusItem={minusItem}
                        product={product}
                        key={product.product.id} />
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
    products: [...products.values()],
    totalCount,
    totalAmount
})

const mapDispatchToProps = dispatch => ({
    plusItem: product => dispatch(plusItem(product)),
    minusItem: product => dispatch(minusItem(product)),
    deleteProduct: product => dispatch(deleteProduct(product))
})

export default connect(mapStateToProps, mapDispatchToProps)(PreviewCart);