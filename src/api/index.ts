import { useUserStore } from '@/store';
import axios, { AxiosResponse } from 'axios';

const API_ORIGIN = "http://localhost:8080";

export const Axios = axios.create({
    baseURL: API_ORIGIN
});

Axios.interceptors.request.use(request => {
    const userStore = useUserStore();
    const token = userStore.getToken;

    if (token) {
        request.headers.Authorization = `Baerer ${token}`;
    }

    return request;
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
    