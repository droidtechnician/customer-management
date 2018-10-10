import { environment } from '../../environments/environment';

export const url = {
    login: environment.baseUri + 'login',
    signup: environment.baseUri + 'signup',
    getAllOrders: environment.baseUri + 'order',
    getAllCustomers: environment.baseUri + 'customer',
    geocode: environment.mapbox.baseUri + 'geocoding/v5/'
};
