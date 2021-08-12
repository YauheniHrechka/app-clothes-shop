import React from 'react';
import './ProductCard.scss';

class ProductCard extends React.Component {

    render() {
        // console.log(this.props);
        const { name, gallery, prices } = this.props;

        return (
            <figure className="product-card">
                <img src={gallery[0]} alt={name} />
                <figcaption>
                    <p>{name}</p>
                    <p>{prices[0].amount}</p>
                </figcaption>
            </figure>
        )
    }
}

export default ProductCard;