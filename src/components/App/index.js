import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { Currencies, Header, MiniCart } from '../';
import { Category, Product, Cart } from '../../pages';
import { queryStart } from '../../redux/actions/categories';
import { queryCurrencies } from '../../redux/actions/currencies';

import './App.scss';


class App extends React.PureComponent {
  state = {
    visibleMiniCart: false,
    visibleCurrencies: false
  }

  refIconCurrencies = React.createRef();
  refCurrencies = React.createRef();
  refIconCart = React.createRef();
  refMiniCart = React.createRef();

  componentDidMount() {
    this.props.queryStart();              // get categories ...
    this.props.queryCurrencies();         // get currencies ...
    document.body.addEventListener('click', this.handleOutsideClick);
  }

  handleOutsideClick = e => {             // click outside of the 'MiniCart', 'Currencies' components with the conditions ...

    if ((e.target.parentElement === this.refIconCart.current && this.state.visibleMiniCart) ||
      (e.target.parentElement === this.refIconCurrencies.current && this.state.visibleCurrencies)) return

    if (this.state.visibleMiniCart &&     // the 'MiniCart' component ...
      (!e.composedPath().includes(this.refMiniCart.current) ||
        e.target.innerHTML === 'VIEW BAG' ||
        e.target.innerHTML === 'CHECK OUT')) {
      this.setState({ visibleMiniCart: false })

    } else {                              // the 'Currencies' component ...
      this.setState({ visibleCurrencies: false })
    }
  }

  onClickCart = () => {
    if (this.state.visibleMiniCart) return
    this.setState({
      visibleCurrencies: false,
      visibleMiniCart: true,
    });
  }

  onClickCurrencies = () => {
    if (this.state.visibleCurrencies) return
    this.setState({
      visibleCurrencies: true,
      visibleMiniCart: false
    });
  }

  render() {
    const { onClickCurrencies, onClickCart, refIconCurrencies, refCurrencies, refIconCart, refMiniCart, state: { visibleCurrencies, visibleMiniCart } } = this;
    const propsHeader = { onClickCurrencies, onClickCart, refIconCurrencies, refIconCart };

    return (
      <div className="app-wrapper">
        <Header {...propsHeader} />
        {visibleMiniCart && <div className="cover"></div>}
        {visibleCurrencies && <Currencies refCurrencies={refCurrencies} />}
        <main>
          <Switch>
            <Route path="/" exact component={Category} />
            <Route path="/products/:category/:id" component={Product} />
            <Route path="/cart" component={Cart} />
            <Redirect to="/" />
          </Switch>
          {visibleMiniCart && <MiniCart refMiniCart={refMiniCart} />}
        </main>
      </div>
    );
  }
}

const mapDispatchToProps = distpatch => ({
  queryStart: () => distpatch(queryStart()),
  queryCurrencies: () => distpatch(queryCurrencies())
})

export default connect(() => ({}), mapDispatchToProps)(App);