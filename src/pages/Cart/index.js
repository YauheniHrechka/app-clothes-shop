import React from 'react';
import { connect } from 'react-redux';

import { minusItem, plusItem } from '../../redux/actions/cart';

import './Cart.scss';

class Cart extends React.Component {

    render() {
        const { products, minusItem, plusItem } = this.props;

        return (
            <div className="cart">
                <h2>CART</h2>
                {products.map(({ product, count, amount }) =>
                    <div className="product-cart" key={product.id}>
                        <hr />
                        <div className="info">
                            <div className="product-info">
                                <p className="title">{product.brand}</p>
                                <p className="name">{product.name}</p>
                                <p>{amount}</p>
                                <div className="attributes">
                                    {/* <span>SIZE:</span> */}
                                </div>
                            </div>
                            <div className="count">
                                <button className="btn btn-plus" onClick={() => plusItem(product)}>+</button>
                                <span>{count}</span>
                                <button className="btn btn-minus" onClick={() => minusItem(product)}>-</button>
                            </div>
                            <div className="image-show">
                                <img src={product.gallery[0]} alt={product.name} />
                            </div>
                        </div>
                    </div>
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