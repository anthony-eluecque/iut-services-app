import router from '@/router';
import { useUserStore } from '@/store';
import axios, { AxiosError, AxiosResponse, isAxiosError } from 'axios';
export { postItem } from './helpers';

const API_ORIGIN = import.meta.env.VITE_API_ORIGIN

export const Axios = axios.create({
  baseURL: API_ORIGIN,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials : true
});

Axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response){
      if (error.response.status === 401){
        router.push('/login')
      }
    }
    return Promise.reject(error);
  }
)

Axios.interceptors.request.use(request => {
  return request;
});

export default Axios

export enum Routes {
    ITEMS = "/items",
    LESSONS = "/lessons",
    TEACHERS = "/teachers",
    SERVICES = "/services",
    USERS = "/users"
}

export type ResponseData<T> = {
    data : T,
    status : number;
}

const processResponse = <T>(
  response: AxiosResponse<any> | undefined,
  error?: AxiosError | null
): ResponseData<T> => {
  if (error && error.response) {
    return {
      data: error.response.data as T,
      status: error.response.status,
    };
  }
  return {
    data: response?.data.data,
    status: response?.status as number,
  };
};

const performRequest = async<T>(
  method: 'get' | 'post' | 'delete' | 'put',
  route : Routes|string,
  data?: any,
  config = {}
) : Promise<ResponseData<T>> => {
  try {
    const response = await Axios[method](`${route}`, data, config);
    return processResponse<T>(response);
  } catch (error) {
    if (isAxiosError(error) && error.response){
      return processResponse<T>(error.response , error);
    }
    return processResponse<T>(undefined)
  }
}

export const fetchData = async <T>(
  route : Routes|string, 
  config = {}
) : Promise<ResponseData<T>> => {
  return await performRequest<T>('get', route, undefined, config);
}

export const postData = async <T>(
  route : Routes|string, 
  data: any, 
  config = {}
) : Promise<ResponseData<T>> => {
  return await performRequest<T>('post', route, data, config);
}

export const deleteItem = async (
  route : Routes|string, 
  id: string, 
  config = {}
) => {
  return await performRequest('delete',`${route}/${id}`,undefined,config);
}

export const deleteTeacher = async (
  route : Routes|string, 
  id: string, 
  config = {}
) => {
  return await performRequest('delete',`${route}/${id}`,undefined,config);
}

export const updateData = async <T>(
    route : Routes|string, 
    data: any, 
    config = {}
  ) : Promise<ResponseData<T>> => {
    return await performRequest<T>('put', route, data, config);
  }

export const extractData = <T>(
  responseData : ResponseData<T>
): T => 
    responseData.data;


export const getStatusCode = (response : AxiosResponse) => {
  return response.status
}



