const initialState = {
    categories: [],
    products: new Map(),
    filters: {
        category: ''
    }
}

const setCategories = categories => categories.map(category => category.name);

const setProducts = ({ categories, productsFirstCategory }) => {
    return categories.reduce((result, category, index) => {
        return result.set(category.name, index === 0 ? productsFirstCategory : [])
    }, new Map());
}

const categories = (state = initialState, { type, payload }) => {
    // console.log('type', type);
    // console.log('payload', payload);
    switch (type) {

        case 'SET_ALL_CATEGORIES_AND_PRODUCTS_OF_THE_FIRST_CATEGORY':
            return {
                ...state,
                categories: setCategories(payload.categories),
                products: setProducts(payload),
                filters: {
                    ...state.filters,
                    category: payload.categories[0].name || ''
                }
            }

        case 'SET_PRODUCTS_AND_FILTER_BY_CATEGORY':
            return {
                ...state,
                products: state.products.set(payload.category, payload.products),
                filters: {
                    ...state.filters,
                    category: payload.category
                }
            }

        case 'SET_FILTER_BY_CATEGORY':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    category: payload
                }
            }

        default: {
            return state
        }
    }
}

export default categories;