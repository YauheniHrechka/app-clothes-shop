import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import cart from '../../assets/img/cart.svg';
import arrowBottom from '../../assets/img/arrow-bottom.svg';

import './Actions.scss';

class Actions extends React.PureComponent {

    render() {
        const { activeCurrency, onClickCurrencies, onClickCart, refIconCurrencies, refIconCart, totalCount } = this.props;

        return (
            <div className="actions">
                <div ref={refIconCurrencies} className="currency" onClick={onClickCurrencies}>
                    <span className="active-currency">{activeCurrency}</span>
                    <img src={arrowBottom} alt="currency" />
                </div>

                <div ref={refIconCart} className="cart" onClick={onClickCart}>
                    <img src={cart} alt="cart" />
                    {totalCount > 0 && <span>{totalCount}</span>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ cart: { currency, totalCount } }) => ({
    activeCurrency: currency,
    totalCount
})

Actions.propTypes = {
    activeCurrency: PropTypes.string,
    onClickCurrencies: PropTypes.func,
    onClickCart: PropTypes.func,
    refIconCurrencies: PropTypes.any,
    refIconCart: PropTypes.any,
    totalCount: PropTypes.number,
}

Actions.defaultProps = {
    activeCurrency: '',
    onClickCurrencies: () => { },
    onClickCart: () => { },
    refIconCurrencies: React.createRef(),
    refIconCart: React.createRef(),
    totalCount: 0,
}

export default connect(mapStateToProps)(Actions);