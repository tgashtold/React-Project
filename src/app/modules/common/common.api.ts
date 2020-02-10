import axios from 'axios';
import {ServerError} from '../../services';

export const api: any = axios.create({
    baseURL: 'http://localhost:5000/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
});

api.interceptors.response.use(function (response: any) {
    if (response.data.statusCode) {
        throw new ServerError(response.data.statusCode, `Error! ${response.data.message}`);
    }
    return response;
});