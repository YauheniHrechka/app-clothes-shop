import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import cart from '../../assets/img/cart.svg';
import arrowBottom from '../../assets/img/arrow-bottom.svg';

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
    activeCurrency: cart.currency,
    currencies,
    totalCount: cart.totalCount
})

const mapDispatchToProps = dispatch => ({
    changeCurrency: currency => dispatch(changeCurrency(currency))
})

Actions.propTypes = {
    activeCurrency: PropTypes.string,
    currencies: PropTypes.array,
    onMouseEnterCart: PropTypes.func,
    totalCount: PropTypes.number
}

Actions.defaultProps = {
    activeCurrency: '',
    currencies: [],
    onMouseEnterCart: () => { },
    totalCount: 0
}

export default connect(mapStateToProps, mapDispatchToProps)(Actions);