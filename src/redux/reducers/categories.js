const initialState = {
    categories: []
}

const categories = (state = initialState, { type, payload }) => {
    switch (type) {

        case 'SET_CATEGORIES':
            return {
                ...state,
                categories: payload
            }

        default: {
            return state
        }
    }
}

export default categories;