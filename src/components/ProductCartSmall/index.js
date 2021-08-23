import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Button } from '../';

import './ProductCartSmall.scss';

class ProductCartSmall extends React.PureComponent {

    onClickPlus = () => {
        const { product: [productId, { product }], plusItem } = this.props;
        plusItem({ productId, product });
    }

    onClickMinus = () => {
        const { product: [productId, { product, count }], deleteProduct, minusItem } = this.props;
        (count === 1 ? deleteProduct : minusItem)({ productId, product });
    }

    render() {
        const { product: [, { product, attributes, count }], currency } = this.props;
        const price = product.prices.find(price => price.currency === currency).amount.toFixed(2);

        return (
            <div className="product-cart-small">
                <div className="info-wrapper-small">
                    <div className="product-info-small">
                        <Link to={`/products/${product.category}/${product.id}`}>
                            <div className="title-small">
                                <p>{product.brand}</p>
                                <p>{product.name}</p>
                            </div>
                            <p className="price-small">{`${currency} ${price}`}</p>
                        </Link>
                        <div className="attributes">
                            {product.attributes.length > 0 &&
                                product.attributes.map(attribute =>
                                    <div key={attribute.id} className="attribute-items">
                                        {attribute.items.map(item =>
                                            <Button
                                                style={{
                                                    ...btnAttribute.style,
                                                    background: attribute.type === 'swatch' ? item.value : btnAttribute.style.background,
                                                    color: attributes.get(attribute.id) === item.id ? '#a6a6a6' :
                                                        attribute.type === 'swatch' && item.value === '#000000' ? '#ffffff' : btnAttribute.style.color,
                                                    border: attributes.get(attribute.id) === item.id ? '1px solid #a6a6a6' : btnAttribute.style.border
                                                }}
                                                title={attribute.type === 'swatch' ? '' : item.value}
                                                key={item.id} />
                                        )}
                                    </div>)}
                        </div>
                    </div>
                    <div className="count-small">
                        <Button {...btnPlus} onClick={this.onClickPlus} />
                        <span>{count}</span>
                        <Button {...btnMinus} onClick={this.onClickMinus} />
                    </div>
                    <div className="image-show-small">
                        <img src={product.gallery[0]} alt={product.name} />
                    </div>
                </div>
            </div>
        )
    }
}

const btnProps = {
    style: {
        width: '24px',
        height: '24px',
        backgroundColor: '#ffffff',
        fontSize: '20px',
        border: '1px solid #1d1f22'
    },
    title: ''
}

const btnPlus = {
    style: {
        ...btnProps.style
    },
    title: '+'
}

const btnMinus = {
    style: {
        ...btnProps.style
    },
    title: '-'
}

const btnAttribute = {
    style: {
        padding: '5px',
        margin: '0 8px 10px 0',
        minWidth: '24px',
        height: '24px',
        background: '#ffffff',
        color: '#292929',
        fontSize: '14px',
        border: '1px solid #1d1f22'
    },
    title: ''
}

ProductCartSmall.propTypes = {
    product: PropTypes.array,
    deleteProduct: PropTypes.func,
    minusItem: PropTypes.func,
    plusItem: PropTypes.func
}

ProductCartSmall.defaultProps = {
    product: [],
    deleteProduct: () => { },
    minusItem: () => { },
    plusItem: () => { }
}

export default ProductCartSmall;