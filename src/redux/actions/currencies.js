import { client } from '@tilework/opus';
import { GET_ALL_CURRENCIES } from '../queries/currencies';
import { config } from '../../config/config';

export const queryCurrencies = () => dispatch => {
    client.setEndpoint(config.uri);

    client.post(GET_ALL_CURRENCIES)
        .then(data => dispatch(setCurrencies(data.currencies)))
        .catch(err => console.log('err => ', err))
}

const setCurrencies = currencies => ({
    type: 'SET_CURRENCIES',
    payload: currencies
})