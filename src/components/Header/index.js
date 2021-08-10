import React from 'react';
import './Header.scss';

class Header extends React.Component {

    render() {
        const { categories } = this.props;

        return (
            <header className="header" >
                <ul>
                    {categories.map(category => <li key={category.name}>{category.name}</li>)}
                </ul>
            </header>
        )
    }
}

export default Header;