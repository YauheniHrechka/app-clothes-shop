import { client } from '@tilework/opus';
import { GET_ALL_CATEGORIES, GET_PRODUCTS_BY_CATEGORY, GET_PRODUCT_BY_ID } from '../queries/categories';
import { config } from '../../config/config';

export const queryStart = () => async dispatch => {
    // get all categories and products of the first category ... 
    client.setEndpoint(config.uri);

    try {
        // get all categories ...
        const queryResultAllCategories = await client.post(GET_ALL_CATEGORIES);

        // get products of the first category ...
        const { categories } = queryResultAllCategories;
        const queryResultProductsByCategory = await client.post(GET_PRODUCTS_BY_CATEGORY(categories[0].name));

        // products of the first category ...
        const { category: { products: productsFirstCategory } } = queryResultProductsByCategory;

        dispatch(start(categories, productsFirstCategory));
    } catch (e) { }
}

export const queryProductsByCategory = category => async dispatch => {
    client.setEndpoint(config.uri);

    const queryResult = await client.post(GET_PRODUCTS_BY_CATEGORY(category));
    dispatch(setProductsAndFilterByCategory(category, queryResult));
}

export const queryProductById = productId => async dispatch => {
    client.setEndpoint(config.uri);

    const queryResult = await client.post(GET_PRODUCT_BY_ID(productId));
    dispatch(setVisitedProduct(queryResult));
}

export const setFilterByCategory = category => ({
    type: 'SET_FILTER_BY_CATEGORY',
    payload: category
})

const setVisitedProduct = ({ product }) => ({
    type: 'SET_VISITED_PRODUCT',
    payload: product
})

const setProductsAndFilterByCategory = (category, { category: { products } }) => ({
    type: 'SET_PRODUCTS_AND_FILTER_BY_CATEGORY',
    payload: { category, products }
})

const start = (categories, productsFirstCategory) => ({
    type: 'SET_ALL_CATEGORIES_AND_PRODUCTS_OF_THE_FIRST_CATEGORY',
    payload: { categories, productsFirstCategory }
})