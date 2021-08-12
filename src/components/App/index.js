import React from 'react';
import { connect } from 'react-redux';

import { queryStart } from '../../redux/actions/categories';
import { queryCurrencies } from '../../redux/actions/currencies';
import { Header } from '../';
import { Home } from '../../pages';

import './App.scss';


class App extends React.Component {

  componentDidMount() {
    this.props.queryStart();
    this.props.queryCurrencies();
  }

  render() {

    return (
      <div className="app-wrapper">
        <Header />
        <Home />
      </div>
    );
  }
}

const mapDispatchToProps = distpatch => ({
  queryStart: () => distpatch(queryStart()),
  queryCurrencies: () => distpatch(queryCurrencies())
})

export default connect(() => ({}), mapDispatchToProps)(App);