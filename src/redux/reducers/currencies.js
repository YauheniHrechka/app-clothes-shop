const initialState = {
    currencies: []
}

const currencies = (state = initialState, { type, payload }) => {
    switch (type) {

        case 'SET_CURRENCIES':
            return {
                ...state,
                currencies: payload
            }

        default: {
            return state
        }
    }
}

export default currencies;