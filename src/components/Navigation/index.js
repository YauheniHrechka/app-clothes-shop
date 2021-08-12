import React from 'react';
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
        console.log('render Navigation ');
        return (
            <nav className="navigation">
                <ul>
                    {categories.map(category =>
                        <li
                            onClick={() => this.onClickCategory(category)}
                            key={category}>
                            <a className={activeCategory === category ? `active` : ``} href="#">{category.toUpperCase()}</a>
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

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);