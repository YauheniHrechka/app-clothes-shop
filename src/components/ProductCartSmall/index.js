import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../';

import './ProductCartSmall.scss';

class ProductCartSmall extends React.Component {

    onClickPlus = () => {
        const { product: { product }, plusItem } = this.props;
        plusItem(product);
    }

    onClickMinus = () => {
        const { product: { product, count }, deleteProduct, minusItem } = this.props;
        // console.log('count => ', count);
        (count === 1 ? deleteProduct : minusItem)(product);
    }

    render() {
        const { product: { product, amount, count } } = this.props;

        return (
            <div className="product-cart-small">
                <div className="info-wrapper-small">
                    <div className="product-info-small">
                        <div className="title-small">
                            <p>{product.brand}</p>
                            <p>{product.name}</p>
                        </div>
                        <p className="price-small">{amount}</p>
                        <div className="attributes">
                            {product.attributes.length > 0 &&
                                product.attributes.map(attribute =>
                                    <div key={attribute.id} className="attribute-items">
                                        {attribute.items.map(item =>
                                            <Button
                                                style={{
                                                    ...btnAttribute.style,
                                                    background: attribute.type === 'swatch' ? item.value : btnAttribute.style.background,
                                                    color: attribute.type === 'swatch' && item.value === '#000000' ? '#ffffff' : btnAttribute.style.color
                                                }}
                                                title={attribute.type === 'swatch' ? '' : item.displayValue}
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
    product: PropTypes.object,
    deleteProduct: PropTypes.func,
    minusItem: PropTypes.func,
    plusItem: PropTypes.func
}

ProductCartSmall.defaultProps = {
    product: {},
    deleteProduct: () => { },
    minusItem: () => { },
    plusItem: () => { }
}

export default ProductCartSmall;