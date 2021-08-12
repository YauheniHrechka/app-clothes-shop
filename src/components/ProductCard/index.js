import React from 'react';
import './ProductCard.scss';

class ProductCard extends React.Component {

    render() {
        // console.log(this.props);
        const { name, gallery, prices, currency } = this.props;
        const price = prices.find(price => price.currency === currency).amount;

        return (
            <figure className="product-card">
                <img src={gallery[0]} alt={name} />
                <figcaption>
                    <p>{name}</p>
                    <p>{price}</p>
                </figcaption>
            </figure>
        )
    }
}

export default ProductCard;