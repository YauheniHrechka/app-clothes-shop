import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { queryStart } from '../../redux/actions/categories';
import { queryCurrencies } from '../../redux/actions/currencies';
import { Header, PreviewCart } from '../';
import { Home, Product, Cart } from '../../pages';

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
    if (!e.composedPath().includes(this.refPreviewCart.current)) {
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
        <main style={{ background: visiblePreviewCart ? 'rgba(57, 55, 72, 0.22)' : '#ffffff' }}>
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