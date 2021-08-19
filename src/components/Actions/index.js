import React from 'react';
import { Link } from 'react-router-dom';
import cart from '../../assets/img/cart.svg';
import arrowBottom from '../../assets/img/arrow-bottom.svg';
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

    // onMouseEnter = e => {
    //     console.log('onMouseEntry');
    // }

    render() {
        const { activeCurrency, currencies, onMouseEnterCart, totalCount } = this.props;
        const { visibleCurrenciesPopup } = this.state;

        return (
            <div className="actions">
                <div className="currency">
                    <div onClick={this.onClickCurrenciesPopup}>
                        <span className="active-currency">{activeCurrency}</span>
                        <img src={arrowBottom} alt="currency" />
                    </div>
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
                </div>

                <div className="cart" onMouseEnter={onMouseEnterCart}>
                    <Link to="/cart">
                        <img src={cart} alt="cart" />
                        {totalCount > 0 && <span>{totalCount}</span>}
                    </Link>
                </div>
            </div>
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