import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Button, OutOfStock } from '../../components';
import { queryProductById } from '../../redux/actions/categories';
import { addProduct, plusItem } from '../../redux/actions/cart';

import './Product.scss';

class Product extends React.PureComponent {
    state = {
        activeImage: '',
        selectedAttributes: new Map()
    }

    refDescription = React.createRef();

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.activeImage === '' && nextProps.product.gallery.length) {
            return { activeImage: nextProps.product.gallery[0] }
        }

        return null;
    }

    async getProductById(id) {
        await this.props.queryProductById(id);
        this.refDescription.current.innerHTML = this.props.product.description;
    }

    componentDidMount() {
        const { visitedProducts, match: { params } } = this.props;
        if (!visitedProducts.has(params.id)) {
            this.getProductById(params.id);
        } else {
            this.refDescription.current.innerHTML = this.props.product.description;
        }
    }

    onClickImage = image => this.setState({ activeImage: image })

    onClickAttribute = ({ attributeId, itemId }) => {
        const selectedAttributes = new Map(this.state.selectedAttributes.entries());
        selectedAttributes.set(attributeId, itemId);
        this.setState({ selectedAttributes });
    }

    onClickAddToCart = () => {
        const { product, productsCart, addProduct, plusItem } = this.props;
        const { selectedAttributes } = this.state;

        if (selectedAttributes.size !== product.attributes.length) {
            alert('Select all attribute types'); return
        }

        const productId = `${product.id}-${[...selectedAttributes].flat().join('-')}`;
        productsCart.has(productId) ?
            plusItem({ productId, product }) :
            addProduct({ product, attributes: selectedAttributes });

        this.setState({ selectedAttributes: new Map() })
    }

    render() {
        const { product: { attributes, brand, name, gallery, prices, inStock }, currency } = this.props;
        const { activeImage, selectedAttributes } = this.state;
        const price = !prices.length ? '0.00' : prices.find(price => price.currency === currency).amount.toFixed(2);

        return (
            <div className="product-wrapper">
                {!inStock && <OutOfStock />}
                <div className="images-preview">
                    <ul>
                        {gallery.map(image =>
                            <li
                                onMouseEnter={() => this.onClickImage(image)}
                                key={image}>
                                <img src={image} alt={name} />
                            </li>)}
                    </ul>
                </div>
                <figure className="info">
                    <div className="image-show">
                        <img src={activeImage} alt={name} />
                    </div>
                    <figcaption className="product-info">
                        <p className="title">{brand}</p>
                        <p className="name">{name}</p>
                        <div className="attributes">
                            {attributes.length > 0 &&
                                attributes.map(attribute =>
                                    <div key={attribute.id} className="attribute-wrapper">
                                        <p className="attribute-title">{attribute.name}</p>
                                        <div className="attribute-items">
                                            {attribute.items.map(item =>
                                                <Button
                                                    style={{
                                                        ...btnAttribute.style,
                                                        background: attribute.type === 'swatch' ? item.value : btnAttribute.style.background,
                                                        color: selectedAttributes.get(attribute.id) === item.id ? '#a6a6a6' :
                                                            attribute.type === 'swatch' && item.value === '#000000' ? '#ffffff' : btnAttribute.style.color,
                                                        border: selectedAttributes.get(attribute.id) === item.id ? '1px solid #a6a6a6' : btnAttribute.style.border
                                                    }}
                                                    title={attribute.type === 'swatch' ? '' : item.value}
                                                    onClick={() => this.onClickAttribute({
                                                        attributeId: attribute.id,
                                                        itemId: item.id
                                                    })}
                                                    key={item.id} />
                                            )}
                                        </div>
                                    </div>)}
                        </div>
                        <div className="price">
                            <span>PRICE:</span>
                            <p>{`${currency} ${price}`}</p>
                            <Button {...btnProps} onClick={this.onClickAddToCart} />
                        </div>
                        <div ref={this.refDescription} className="description"></div>
                    </figcaption>
                </figure>
            </div >
        )
    }
}

const btnProps = {
    style: {
        width: '100%',
        height: '52px',
        background: '#5ece7b',
        color: '#ffffff',
        fontSize: '16px',
    },
    title: 'ADD TO CART'
}

const btnAttribute = {
    style: {
        padding: '5px',
        margin: '0 10px 12px 0',
        minWidth: '65px',
        height: '45px',
        background: '#ffffff',
        color: '#292929',
        fontSize: '18px',
        border: '1px solid #1d1f22'
    },
    title: ''
}

const mapStateToProps = (state, props) => {
    const { categories: { visitedProducts }, cart } = state;
    const { id } = props.match.params;

    return {
        visitedProducts,
        product: visitedProducts.get(id),
        currency: cart.currency,
        productsCart: cart.products
    }
}

const mapDispatchToProps = dispatch => ({
    queryProductById: productId => dispatch(queryProductById(productId)),
    addProduct: product => dispatch(addProduct(product)),
    plusItem: product => dispatch(plusItem(product))
})

Product.propTypes = {
    visitedProducts: PropTypes.any,
    product: PropTypes.object,
    currency: PropTypes.string,
    productsCart: PropTypes.any
}

Product.defaultProps = {
    visitedProducts: new Map(),
    product: { attributes: [], gallery: [], prices: [] },
    currency: '',
    productsCart: new Map()
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);