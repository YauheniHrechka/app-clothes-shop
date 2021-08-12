import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation, Actions } from '../';
import './Header.scss';

class Header extends React.Component {

    render() {
        // const { categories, currencies } = this.props;
        // console.log('render Header', categories);
        return (
            <header className="header" >
                <Navigation />
                <div className="logo">
                    <Link to="/">Logo</Link>
                </div>
                <Actions />
            </header>
        )
    }
}

export default Header;