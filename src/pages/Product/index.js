import React from 'react';
import { connect } from 'react-redux';

import { queryProductById } from '../../redux/actions/categories';
import { addProduct } from '../../redux/actions/cart';

import './Product.scss';

class Product extends React.Component {
    state = {
        activeImage: this.props.product.gallery[0]
    }

    componentDidMount() {
        if (!this.props.product.visited) {
            this.props.queryProductById(this.props.product.id);
        }
    }

    onClickImage = image => this.setState({ activeImage: image })

    onClickAddToCart = () => this.props.addProduct(this.props.product);

    render() {
        // console.log('product => ', this.props.product);
        // console.log('render page PRODUCT');
        const { product: { brand, name, gallery, prices, description }, currency } = this.props;
        const { activeImage } = this.state;
        const price = prices.find(price => price.currency === currency).amount;

        return (
            <div className="product-wrapper">
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
                            <span>SIZE:</span>
                        </div>
                        <div className="price">
                            <span>PRICE:</span>
                            <p>{price}</p>
                            <button onClick={this.onClickAddToCart}>ADD TO CART</button>
                        </div>
                        <div className="description" dangerouslySetInnerHTML={{ __html: description }}></div>
                    </figcaption>
                </figure>
            </div >
        )
    }
}

const mapStateToProps = (state, props) => {
    const { categories: { products }, cart } = state;
    const { id, category } = props.match.params;
    return {
        product: products.get(category).find(product => product.id === id) || {},
        currency: cart.currency
    }
}

const mapDispatchToProps = dispatch => ({
    queryProductById: productId => dispatch(queryProductById(productId)),
    addProduct: product => dispatch(addProduct(product))
})

export default connect(mapStateToProps, mapDispatchToProps)(Product);