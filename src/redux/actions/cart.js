
export const addProduct = product => ({
    type: 'ADD_PRODUCT',
    payload: product
})

export const plusItem = product => ({
    type: 'PLUS_ITEM',
    payload: product
})

export const minusItem = product => ({
    type: 'MINUS_ITEM',
    payload: product
})

export const changeCurrency = currency => ({
    type: 'CHANGE_CURRENCY',
    payload: currency
})