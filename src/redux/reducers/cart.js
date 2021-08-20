const initialState = {
    products: new Map(),
    currency: 'USD',
    totalCount: 0,
    totalAmount: 0
}

const cart = (state = initialState, { type, payload }) => {
    let amount, product;

    switch (type) {

        case 'ADD_PRODUCT':
            amount = payload.product.prices.find(price => price.currency === state.currency).amount;

            return {
                ...state,
                products: state.products.set(`${payload.product.id}-${[...payload.attributes].flat().join('-')}`, {
                    product: payload.product,
                    attributes: payload.attributes,
                    count: 1,
                    amount
                }),
                totalCount: ++state.totalCount,
                totalAmount: +(state.totalAmount + amount).toFixed(2)
            }

        case 'DELETE_PRODUCT':
            amount = payload.product.prices.find(price => price.currency === state.currency).amount;
            state.products.delete(payload.productId);

            return {
                ...state,
                products: state.products,
                totalCount: --state.totalCount,
                totalAmount: +(state.totalAmount - amount).toFixed(2)
            }

        case 'PLUS_ITEM':
            product = state.products.get(payload.productId);
            amount = payload.product.prices.find(price => price.currency === state.currency).amount;

            return {
                ...state,
                products: state.products.set(payload.productId, {
                    ...product,
                    count: ++product.count,
                    amount: +(product.amount + amount).toFixed(2)
                }),
                totalCount: ++state.totalCount,
                totalAmount: +(state.totalAmount + amount).toFixed(2)
            }

        case 'MINUS_ITEM':
            product = state.products.get(payload.productId);
            amount = payload.product.prices.find(price => price.currency === state.currency).amount;

            return {
                ...state,
                products: state.products.set(payload.productId, {
                    ...product,
                    count: --product.count,
                    amount: +(product.amount - amount).toFixed(2)
                }),
                totalCount: --state.totalCount,
                totalAmount: +(state.totalAmount - amount).toFixed(2)
            }

        case 'CHANGE_CURRENCY':

            let totalAmount = 0;
            state.products.forEach(item => {
                item.amount = item.count * item.product.prices.find(price => price.currency === payload).amount;
                totalAmount += item.amount;
            })

            return {
                ...state,
                currency: payload,
                totalAmount: +(totalAmount).toFixed(2)
            }

        default: {
            return state
        }
    }
}

export default cart;