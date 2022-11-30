import axios from 'axios';
import { headers } from './config';
import { resInterceptor } from './interceoptors';

export class NetworkService {
    constructor() {
        this.client = axios.create({ headers });
        this.client.interceptors.response.use(resInterceptor.onFulfill, resInterceptor.onReject);
    }

    setAccessToken(token) {
        this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    clearAccessToken() {
        delete this.client.defaults.headers.common['Authorization'];
    }

    request({ method, url, data, ...config }) {
        console.log("Token is: "+ this.client.defaults.headers.common['Authorization'])
        console.log("Method: "+ method);
        console.log("URL: "+ url);
        return this.client.request({ method, url, data, ...config });
    }
}

export const networkService = new NetworkService();
