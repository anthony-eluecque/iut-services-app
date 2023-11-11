import router from '@/router';
import { useAppStore, useUserStore } from '@/store';
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
      if (error.response.status === 409){
        useAppStore().createAlert(
          'Item déjà existant !',
          "L'item que vous essayez de créer existe déjà en base de données !",
          'warning'
        )
      }
    }
    return Promise.reject(error);
  }
)

Axios.interceptors.request.use(request => {
  return request;
});

export default Axios

/**
 * Enumération des routes de l'application.
 * Utilisée pour organiser et centraliser les chemins d'accès aux ressources de l'API.
 */
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

/**
 * Traite la réponse Axios en extrayant les données et le statut.
 *
 * @template T - Le type des données de la réponse.
 * @param {AxiosResponse<any> | undefined} response - La réponse Axios réussie.
 * @param {AxiosError | null | undefined} error - L'erreur Axios, le cas échéant.
 * @returns {ResponseData<T>} - Les données et le statut de la réponse.
 */
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


/**
 * Effectue une requête Axios avec la méthode spécifiée, l'URL, les données et la configuration fournies.
 *
 * @template T - Le type des données de la réponse.
 * @param {'get' | 'post' | 'delete' | 'put'} method - La méthode HTTP de la requête.
 * @param {Routes | string} route - L'URL ou le chemin d'accès de la ressource.
 * @param {any} [data] - Les données à envoyer dans la requête.
 * @param {object} [config] - La configuration de la requête Axios.
 * @returns {Promise<ResponseData<T>>} - La promesse contenant les données et le statut de la réponse.
 */
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

/**
 * Effectue une requête Axios de type GET pour récupérer des données depuis l'API.
 *
 * @template T - Le type des données de la réponse.
 * @param {Routes | string} route - L'URL ou le chemin d'accès de la ressource.
 * @param {object} [config] - La configuration de la requête Axios.
 * @returns {Promise<ResponseData<T>>} - La promesse contenant les données et le statut de la réponse.
 */
export const fetchData = async <T>(
  route : Routes|string, 
  config = {}
) : Promise<ResponseData<T>> => {
  return await performRequest<T>('get', route, undefined, config);
}

/**
 * Effectue une requête Axios de type POST pour envoyer des données à l'API.
 *
 * @template T - Le type des données de la réponse.
 * @param {Routes | string} route - L'URL ou le chemin d'accès de la ressource.
 * @param {any} data - Les données à envoyer dans la requête.
 * @param {object} [config] - La configuration de la requête Axios.
 * @returns {Promise<ResponseData<T>>} - La promesse contenant les données et le statut de la réponse.
 */
export const postData = async <T>(
  route : Routes|string, 
  data: any, 
  config = {}
) : Promise<ResponseData<T>> => {
  return await performRequest<T>('post', route, data, config);
}

/**
 * Effectue une requête Axios de type DELETE pour supprimer une ressource depuis l'API.
 *
 * @param {Routes | string} route - L'URL ou le chemin d'accès de la ressource.
 * @param {string} id - L'identifiant de la ressource à supprimer.
 * @param {object} [config] - La configuration de la requête Axios.
 * @returns {Promise<void>} - La promesse vide indiquant la réussite de la suppression.
 */
export const deleteItem = async (
  route : Routes|string, 
  id: string, 
  config = {}
) => {
  return await performRequest('delete',`${route}/${id}`,undefined,config);
}

/**
 * Effectue une requête Axios de type DELETE pour supprimer un enseignant depuis l'API.
 *
 * @param {Routes | string} route - L'URL ou le chemin d'accès de la ressource.
 * @param {string} id - L'identifiant de l'enseignant à supprimer.
 * @param {object} [config] - La configuration de la requête Axios.
 * @returns {Promise<void>} - La promesse vide indiquant la réussite de la suppression.
 */
export const deleteTeacher = async (
  route : Routes|string, 
  id: string, 
  config = {}
) => {
  return await performRequest('delete',`${route}/${id}`,undefined,config);
}

/**
 * Effectue une requête Axios de type DELETE pour supprimer un utilisateur depuis l'API.
 *
 * @param {Routes | string} route - L'URL ou le chemin d'accès de la ressource.
 * @param {string} id - L'identifiant de l'utilisateur à supprimer.
 * @param {object} [config] - La configuration de la requête Axios.
 * @returns {Promise<void>} - La promesse vide indiquant la réussite de la suppression.
 */
export const deleteUser = async(
  route : Routes|string, 
  id: string, 
  config = {}
) => {
  return await performRequest('delete',`${route}/${id}`,undefined,config);
}

/**
 * Effectue une requête Axios de type PUT pour mettre à jour des données sur l'API.
 *
 * @template T - Le type des données de la réponse.
 * @param {Routes | string} route - L'URL ou le chemin d'accès de la ressource.
 * @param {any} data - Les données à envoyer dans la requête.
 * @param {object} [config] - La configuration de la requête Axios.
 * @returns {Promise<ResponseData<T>>} - La promesse contenant les données et le statut de la réponse.
 */
export const updateData = async <T>(
    route : Routes|string, 
    data: any, 
    config = {}
  ) : Promise<ResponseData<T>> => {
    return await performRequest<T>('put', route, data, config);
  }

  /**
 * Extrait les données d'une réponse de l'API. (Reponse.data.data => Formattage spécifique du back)
 *
 * @template T - Le type des données de la réponse.
 * @param {ResponseData<T>} responseData - La réponse de l'API.
 * @returns {T} - Les données extraites de la réponse.
 */
export const extractData = <T>(
  responseData : ResponseData<T>
): T => 
    responseData.data;

    
/**
 * Récupère le code de statut d'une réponse Axios.
 *
 * @param {AxiosResponse} response - La réponse Axios.
 * @returns {number} - Le code de statut de la réponse.
 */
export const getStatusCode = (response : AxiosResponse) => {
  return response.status
}



