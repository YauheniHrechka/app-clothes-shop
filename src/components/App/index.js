import React from 'react';
import { client } from '@tilework/opus';
import { connect } from 'react-redux';

import { setCategories } from '../../redux/actions/categories';
import { setCurrencies } from '../../redux/actions/currencies';
import { Header } from '../';
import { GET_CATEGORIES } from '../../redux/queries/categories';
import { GET_CURRENCIES } from '../../redux/queries/currencies';
import { config } from '../../config/config';

import './App.scss';


class App extends React.Component {

  componentDidMount() {
    client.setEndpoint(config.uri);

    client.post(GET_CATEGORIES)
      .then(data => this.props.setCategories(data.categories))
      .catch(err => console.log('err => ', err))

    client.post(GET_CURRENCIES)
      .then(data => this.props.setCurrencies(data.currencies))
      .catch(err => console.log('err => ', err))
  }

  render() {
    const { categories, currencies } = this.props;
    // console.log('categories => ', categories);
    // console.log('currencies => ', currencies);

    return (
      <div className="app-wrapper">
        <Header categories={categories} currencies={currencies} />
        <h2 className="title">Category name</h2>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories.categories,
  currencies: state.currencies.currencies
})

const mapDispatchToProps = distpatch => ({
  setCategories: categories => distpatch(setCategories(categories)),
  setCurrencies: currencies => distpatch(setCurrencies(currencies))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);