import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { Header, MiniCart } from '../';
import { Category, Product, Cart } from '../../pages';
import { queryStart } from '../../redux/actions/categories';
import { queryCurrencies } from '../../redux/actions/currencies';

import './App.scss';


class App extends React.PureComponent {
  state = {
    visibleMiniCart: false
  }

  refIconCart = React.createRef();
  refMiniCart = React.createRef();

  componentDidMount() {
    this.props.queryStart();          // get categories ...
    this.props.queryCurrencies();     // get currencies ...
    document.body.addEventListener('click', this.handleOutsideClick);
  }

  handleOutsideClick = e => {         // click outside of the 'MiniCart' component with the conditions ...
    if (e.target.parentElement === this.refIconCart.current ||
      !this.state.visibleMiniCart) return

    if (!e.composedPath().includes(this.refMiniCart.current) ||
      e.target.innerHTML === 'VIEW BAG' ||
      e.target.innerHTML === 'CHECK OUT') {
      this.setState({ visibleMiniCart: false })
    }
  }

  onClickCart = () => {
    if (this.state.visibleMiniCart) return
    this.setState({ visibleMiniCart: true });
  }

  render() {
    const { onClickCart, refIconCart, refMiniCart, state: { visibleMiniCart } } = this;

    return (
      <div className="app-wrapper">
        <Header onClickCart={onClickCart} refIconCart={refIconCart} />
        {visibleMiniCart && <div style={{ background: 'rgba(57, 55, 72)', width: '100%', height: '100%', opacity: '0.22', position: 'absolute', zIndex: 98 }}></div>}
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