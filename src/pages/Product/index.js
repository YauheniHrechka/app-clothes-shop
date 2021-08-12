import React from 'react';
import { connect } from 'react-redux';

import { queryProductById } from '../../redux/actions/categories';

import './Product.scss';

class Product extends React.Component {
    state = {
        activeImage: this.props.product.gallery[0]
    }

    componentDidMount() {
        // console.log('componentDidMount product => ', this.props.product);
        if (!this.props.product.visited) {
            this.props.queryProductById(this.props.product.id);
        }
    }

    onClickImage = image => this.setState({ activeImage: image })

    render() {
        console.log('product => ', this.props.product);
        const { product: { brand, name, gallery, prices, description } } = this.props;
        const { activeImage } = this.state;
        // console.log('description => ', description);
        // const test = React.createElement('div', {}, description)
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
                            <p>{prices[0].amount}</p>
                            <button>ADD TO CART</button>
                        </div>
                        <div className="description" dangerouslySetInnerHTML={{ __html: description }}></div>
                    </figcaption>
                </figure>
            </div >
        )
    }
}

const mapStateToProps = (state, props) => {
    const { categories: { products } } = state;
    const { id, category } = props.match.params;
    return {
        product: products.get(category).find(product => product.id === id) || {}
    }
}

const mapDispatchToProps = dispatch => ({
    queryProductById: productId => dispatch(queryProductById(productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Product);