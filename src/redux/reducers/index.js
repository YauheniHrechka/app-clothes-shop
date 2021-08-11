import { combineReducers } from 'redux';

import categories from './categories';
import currencies from './currencies';

export default combineReducers({
    categories,
    currencies
})