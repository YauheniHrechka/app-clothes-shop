import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { changeCurrency } from '../../redux/actions/cart';

import './Actions.scss';

class Actions extends React.Component {
    state = {
        visibleCurrenciesPopup: false
    }

    onClickCurrenciesPopup = () => {
        this.setState({ visibleCurrenciesPopup: !this.state.visibleCurrenciesPopup });
    }

    onSelectCurrency = currency => {
        this.setState({ visibleCurrenciesPopup: false });
        this.props.changeCurrency(currency);
    }

    onChangeCurrency = e => console.log('e => ', e.target.getAttribute('data-currency'))

    render() {
        const { activeCurrency, currencies, totalCount } = this.props;
        const { visibleCurrenciesPopup } = this.state;

        return (
            <nav className="actions">
                <ul>
                    <li>
                        <span onClick={this.onClickCurrenciesPopup}>{activeCurrency}</span>
                        {visibleCurrenciesPopup &&
                            <nav className="currencies">
                                <ul>
                                    {currencies.map(currency => (
                                        <li
                                            onClick={() => this.onSelectCurrency(currency)}
                                            key={currency}>
                                            {currency}
                                        </li>))}
                                </ul>
                            </nav>
                        }
                    </li>
                    <li className="cart">
                        <Link to="/cart">
                            <span>cart</span>
                            <span style={{ position: 'absolute', color: 'red' }}>{totalCount}</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

const mapStateToProps = ({ currencies: { currencies }, cart }) => ({
    totalCount: cart.totalCount ? cart.totalCount : '',
    activeCurrency: cart.currency,
    currencies
})

const mapDispatchToProps = dispatch => ({
    changeCurrency: currency => dispatch(changeCurrency(currency))
})

export default connect(mapStateToProps, mapDispatchToProps)(Actions);