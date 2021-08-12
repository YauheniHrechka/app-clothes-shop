import { combineReducers } from 'redux';

import categories from './categories';
import currencies from './currencies';
import cart from './cart';

export default combineReducers({
    categories,
    currencies,
    cart
})