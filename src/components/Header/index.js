import React from 'react';
import { Navigation, Actions } from '../';
import './Header.scss';

class Header extends React.Component {

    render() {
        const { categories, currencies } = this.props;

        return (
            <header className="header" >
                <Navigation categories={categories} />
                <div className="logo"><h2>Logo</h2></div>
                <Actions currencies={currencies} />
            </header>
        )
    }
}

export default Header;