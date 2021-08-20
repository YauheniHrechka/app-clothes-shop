import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { queryProductsByCategory, setFilterByCategory } from '../../redux/actions/categories';

import './Navigation.scss';

class Navigation extends React.Component {

    onClickCategory = category => {
        if (!this.props.products.get(category).length) {
            this.props.queryProductsByCategory(category);
        } else {
            this.props.setFilterByCategory(category);
        }
    }

    render() {
        const { activeCategory, categories } = this.props;
        // console.log('render Navigation ', activeCategory);
        // console.log('render Navigation ');
        return (
            <nav className="navigation">
                <ul>
                    {categories.map(category =>
                        <li
                            onClick={() => this.onClickCategory(category)}
                            key={category}>
                            <Link to="/" className={activeCategory === category ? `active` : ``}>{category.toUpperCase()}</Link>
                        </li>)}
                </ul>
            </nav>
        )
    }
}

const mapStateToProps = ({ categories: { categories, products, filters } }) => ({
    activeCategory: filters.category,
    categories,
    products
})

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