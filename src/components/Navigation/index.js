import React from 'react';
import './Navigation.scss';

class Navigation extends React.Component {

    render() {
        const { categories } = this.props;

        return (
            <nav className="navigation">
                <ul>
                    {categories.map(category =>
                        <li key={category.name}>
                            <a href="#">{category.name}</a>
                        </li>)}
                </ul>
            </nav>
        )
    }
}

export default Navigation;