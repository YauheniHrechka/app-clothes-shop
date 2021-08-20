import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { Header, PreviewCart } from '../';
import { Home, Product, Cart } from '../../pages';
import { queryStart } from '../../redux/actions/categories';
import { queryCurrencies } from '../../redux/actions/currencies';

import './App.scss';


class App extends React.Component {
  state = {
    visiblePreviewCart: false
  }

  refPreviewCart = React.createRef();

  componentDidMount() {
    this.props.queryStart();
    this.props.queryCurrencies();
    document.body.addEventListener('click', this.handleOutsideClick);
  }

  handleOutsideClick = e => {
    if (!e.composedPath().includes(this.refPreviewCart.current) ||
      e.target.innerHTML === 'VIEW BAG' ||
      e.target.innerHTML === 'CHECK OUT') {
      this.setState({ visiblePreviewCart: false })
    }
  }

  onMouseEnterCart = () => {
    if (this.state.visiblePreviewCart) return
    this.setState({ visiblePreviewCart: true });
  }

  render() {
    const { visiblePreviewCart } = this.state;

    return (
      <div className="app-wrapper">
        <Header onMouseEnterCart={this.onMouseEnterCart} />
        {visiblePreviewCart && <div style={{ background: 'rgba(57, 55, 72)', width: '100%', height: '100%', opacity: '0.22', position: 'absolute', zIndex: 98 }}></div>}
        <main>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/products/:category/:id" component={Product} />
            <Route path="/cart" component={Cart} />
            <Redirect to="/" />
          </Switch>
          {visiblePreviewCart && <PreviewCart refPreviewCart={this.refPreviewCart} />}
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