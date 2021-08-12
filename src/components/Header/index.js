import React from 'react';
import { Navigation, Actions } from '../';
import './Header.scss';

class Header extends React.Component {

    render() {
        // const { categories, currencies } = this.props;
        // console.log('render Header', categories);
        return (
            <header className="header" >
                <Navigation />
                <div className="logo"><h2>Logo</h2></div>
                <Actions />
            </header>
        )
    }
}

export default Header;