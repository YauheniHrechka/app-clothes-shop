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
    visiblePreviewCart: false
  }

  refIconCart = React.createRef();
  refPreviewCart = React.createRef();

  componentDidMount() {
    this.props.queryStart();
    this.props.queryCurrencies();
    document.body.addEventListener('click', this.handleOutsideClick);
  }

  handleOutsideClick = e => {
    if (e.target.parentElement === this.refIconCart.current ||
      !this.state.visiblePreviewCart) return

    if (!e.composedPath().includes(this.refPreviewCart.current) ||
      e.target.innerHTML === 'VIEW BAG' ||
      e.target.innerHTML === 'CHECK OUT') {
      this.setState({ visiblePreviewCart: false })
    }
  }

  onClickCart = () => {
    if (this.state.visiblePreviewCart) return
    this.setState({ visiblePreviewCart: true });
  }

  render() {
    const { onClickCart, refIconCart, refPreviewCart, state: { visiblePreviewCart } } = this;

    return (
      <div className="app-wrapper">
        <Header onClickCart={onClickCart} refIconCart={refIconCart} />
        {visiblePreviewCart && <div style={{ background: 'rgba(57, 55, 72)', width: '100%', height: '100%', opacity: '0.22', position: 'absolute', zIndex: 98 }}></div>}
        <main>
          <Switch>
            <Route path="/" exact component={Category} />
            <Route path="/products/:category/:id" component={Product} />
            <Route path="/cart" component={Cart} />
            <Redirect to="/" />
          </Switch>
          {visiblePreviewCart && <MiniCart refPreviewCart={refPreviewCart} />}
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