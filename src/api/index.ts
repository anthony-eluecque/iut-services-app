import axios, { AxiosResponse } from 'axios';

const API_ORIGIN = "http://localhost:4000";


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
        const response : AxiosResponse<ResponseData<T>> = await axios.get(`${API_ORIGIN}${route}`,config);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const postData = async (route : Routes, data: any, config = {}) => {
    try {
        const response = await axios.post(`${API_ORIGIN}${route}`, data, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const extractData = <T>(
    responseData : ResponseData<T>
    ): T => 
    responseData.data as T
    