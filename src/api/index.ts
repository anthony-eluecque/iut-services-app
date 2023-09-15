import { useUserStore } from '@/store';
import axios, { AxiosResponse } from 'axios';

const API_ORIGIN = "http://localhost:5555";

export const Axios = axios.create({
    baseURL: API_ORIGIN
});

// Intercepteur pour ajout du token dans l'entete des requetes
Axios.interceptors.request.use(request => {
    const userStore = useUserStore();
    const token = userStore.getToken;

    if (token) {
        request.headers.Authorization = `Baerer ${token}`;
    }

    return request;
});

// Intercepteur pour gérer les erreurs des 401 (non autorisé)
Axios.interceptors.response.use(response => {
    return response
}, error => {
    if (error.response.status == 401) {
        useUserStore().logout();
    }

    return Promise.reject(error);
});

export default Axios

export enum Routes {
    ITEMS = "/items",
    LESSONS = "/lessons",
    TEACHERS = "/teachers",
    SERVICES = "/services"
};

export type ResponseData<T> = {
    data : T|T[]
}

export const fetchData = async <T>(route : Routes|string, config = {}) : Promise<ResponseData<T>> => {
    try {
        const response : AxiosResponse<ResponseData<T>> = await Axios.get(`${route}`,config);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const postData = async (route : Routes, data: any, config = {}) => {
    try {
        const response = await axios.post(`${route}`, data, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const extractData = <T>(
    responseData : ResponseData<T>
    ): T => 
    responseData.data as T
    