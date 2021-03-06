import React from 'react';
import { Link } from 'react-router-dom';

import { Navigation, Actions } from '../';
import logo from '../../assets/img/logo.svg';

import './Header.scss';

class Header extends React.PureComponent {

    render() {

        return (
            <header className="header" >
                <Navigation />
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
                <Actions {...this.props} />
            </header>
        )
    }
}

export default Header;