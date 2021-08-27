const initialState = {
    categories: [],
    products: new Map(),
    visitedProducts: new Map(),
    filters: {
        category: 'all'
    }
}

const setCategories = categories => categories.map(category => category.name);

const setProducts = ({ categories, products }) => {
    return categories.reduce((result, category, index) => {
        return result.set(category.name, index === 0 ? products : [])
    }, new Map());
}

const categories = (state = initialState, { type, payload }) => {
    switch (type) {

        case 'SET_ALL_CATEGORIES_AND_PRODUCTS':
            return {
                ...state,
                categories: setCategories(payload.categories),
                products: setProducts(payload),
                filters: {
                    ...state.filters
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

        case 'SET_VISITED_PRODUCT':
            return {
                ...state,
                visitedProducts: state.visitedProducts.set(payload.id, payload),
                filters: {
                    ...state.filters
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