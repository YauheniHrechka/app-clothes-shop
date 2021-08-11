import React from 'react';
import './Actions.scss';

class Actions extends React.Component {
    state = {
        visibleCurrenciesPopup: false,
        activeCurrency: 'USD'
    }

    onClickCurrenciesPopup = () => {
        this.setState({ visibleCurrenciesPopup: !this.state.visibleCurrenciesPopup });
    }

    onSelectCurrency = currency => {
        this.setState({
            activeCurrency: currency,
            visibleCurrenciesPopup: false
        });
    }

    render() {
        const { currencies } = this.props;
        const { activeCurrency, visibleCurrenciesPopup } = this.state;

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
                    <li className="cart">cart</li>
                </ul>
            </nav>
        )
    }
}

export default Actions;