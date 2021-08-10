import React from 'react';
import { client } from '@tilework/opus';
import { connect } from 'react-redux';

import { setCategories } from '../../redux/actions/categories'
import { Header } from '../';
import { GET_CATEGORIES } from '../../redux/queries/categories';
import { config } from '../../config/config';

import './App.scss';


class App extends React.Component {

  componentDidMount() {
    client.setEndpoint(config.uri);

    client.post(GET_CATEGORIES)
      .then(data => this.props.setCategories(data.categories))
      .catch(err => console.log('err => ', err))
  }

  render() {
    const { categories } = this.props;

    return (
      <div className="app-wrapper">
        <Header categories={categories} />
      </div>
    );
  }
}

const mapStateToProps = state => ({ categories: state.categories.categories })

const mapDispatchToProps = distpatch => ({
  setCategories: categories => distpatch(setCategories(categories))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);