import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { queryProductsByCategory, setFilterByCategory } from '../../redux/actions/categories';

import './Navigation.scss';

class Navigation extends React.PureComponent {

    onClickCategory = e => {             // select a category ...
        const category = e.target.parentElement.getAttribute('data-category');
        if (category === null) return

        const { products, queryProductsByCategory, setFilterByCategory } = this.props;

        (products.get(category).length ?
            setFilterByCategory :
            queryProductsByCategory)(category);
    }

    render() {
        const { activeCategory, categories } = this.props;

        return (
            <nav className="navigation">
                <ul onClick={this.onClickCategory}>
                    {categories.map(category =>
                        <li data-category={category} key={category}>
                            <Link to="/" className={activeCategory === category ? `active` : ``}>{category}</Link>
                        </li>)}
                </ul>
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log('state => ', state);
    const { categories: { categories, products, filters } } = state;
    return {
        activeCategory: filters.category,
        categories,
        products
    }
}

const mapDispatchToProps = dispatch => ({
    queryProductsByCategory: category => dispatch(queryProductsByCategory(category)),
    setFilterByCategory: category => dispatch(setFilterByCategory(category))
})

Navigation.propTypes = {
    activeCategory: PropTypes.string,
    categories: PropTypes.array,
    products: PropTypes.any
}

Navigation.defaultProps = {
    activeCategory: '',
    categories: [],
    products: new Map()
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);