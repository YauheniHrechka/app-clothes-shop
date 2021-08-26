import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { changeCurrency } from '../../redux/actions/cart';

import './Currencies.scss';

class Currencies extends React.PureComponent {

    onSelectCurrency = e => {
        const currency = e.target.getAttribute('data-currency');
        if (currency) {
            this.props.changeCurrency(currency);
        }
    }

    render() {
        const { currencies, refCurrencies } = this.props;

        return (
            <nav className="currencies">
                <ul ref={refCurrencies} onClick={this.onSelectCurrency}>
                    {currencies.map(currency => (
                        <li
                            data-currency={currency}
                            key={currency}>
                            {currency}
                        </li>))}
                </ul>
            </nav>
        );
    }
}

const mapStateToProps = ({ currencies: { currencies } }) => ({
    currencies
})

const mapDispatchToProps = dispatch => ({
    changeCurrency: currency => dispatch(changeCurrency(currency))
})

Currencies.propTypes = {
    currencies: PropTypes.array,
    refCurrencies: PropTypes.any,
}

Currencies.defaultProps = {
    currencies: [],
    refCurrencies: React.createRef(),
}

export default connect(mapStateToProps, mapDispatchToProps)(Currencies);