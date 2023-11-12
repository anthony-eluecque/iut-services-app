import { Teacher, Item } from "@/types"
import { ResponseData, Routes, fetchData, postData } from "..";

interface Identifiable {
    id: string;
}

enum statusCode {
    NOT_FOUND = 404
}

interface ObjectWithGivenId {
    givenId : string
    id : string
}

/**
 * Envoie une requête Axios de type POST pour créer un enseignant sur l'API.
 *
 * @param {Teacher} teacher - L'enseignant à créer.
 * @returns {Promise<ResponseData<Teacher> | null>} - La promesse contenant la réponse de l'API ou null en cas d'erreur.
 * @throws {Error} - Une erreur avec le message approprié en cas d'échec.
 */
export const postTeacher = async (teacher: Teacher) => {
  try {
    const teacherResponse: ResponseData<Teacher> | null = await getOrCreateObject<Teacher>(
      teacher,
      Routes.TEACHERS,
      (teacher) => ({
        roleName: "admin",
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        givenId: teacher.givenId,
        id: '',
      })
    );
    return teacherResponse;
  } catch (error: any) {
    throw new Error(`Error in postTeacher: ${error.message}`);
  }
}

/**
 * Envoie une requête Axios de type POST pour créer un item sur l'API.
 *
 * @param {Item} item - L'item à créer.
 * @param {number} currentYear - L'année en cours.
 * @throws {Error} - Une erreur avec le message approprié en cas d'échec.
 */
export const postItem = async (item : Item) => {
  await postData(Routes.ITEMS, item);
}

/**
 * Gère la réponse de l'API en fonction du statut de la réponse et crée un nouvel objet si nécessaire.
 *
 * @template T - Le type de l'objet.
 * @param {ResponseData<T>} response - La réponse de l'API.
 * @param {T} data - L'objet d'origine.
 * @param {Routes | string} route - L'URL ou le chemin d'accès de la ressource.
 * @param {(data: T) => T} newObject - La fonction de création d'un nouvel objet.
 * @returns {Promise<ResponseData<T>|null>} - La promesse contenant la réponse de l'API ou null en cas d'erreur.
 * @throws {Error} - Une erreur avec le message approprié en cas d'échec.
 */
const handleResponse = async <T extends Identifiable>(
  response : ResponseData<T>,
  data : T,
  route : Routes|string,
  newObject: (data : T) => T
) : Promise<ResponseData<T>|null> => {
  let postDataResponse : ResponseData<T> | null = null
  if (response.status == statusCode.NOT_FOUND ){
    const obj = newObject(data);
    const { id, ...newObjWithoutId } = obj;
    postDataResponse = await postData(route, newObjWithoutId);
  }
  return postDataResponse
}


/**
 * Récupère un objet existant sur l'API en fonction de l'identifiant donné ou crée un nouvel objet si inexistant.
 *
 * @template T - Le type de l'objet.
 * @param {T} object - L'objet à récupérer ou créer.
 * @param {Routes | string} route - L'URL ou le chemin d'accès de la ressource.
 * @param {(object: T) => T} createObject - La fonction de création d'un nouvel objet.
 * @returns {Promise<ResponseData<T>>} - La promesse contenant la réponse de l'API.
 * @throws {Error} - Une erreur avec le message approprié en cas d'échec.
 */
const getOrCreateObject = async <T extends ObjectWithGivenId>(
  object: T,
  route: Routes|string,
  createObject: (object: T) => T
): Promise<ResponseData<T>> => {
  try {
    const objectData: ResponseData<T> = await fetchData(route + "/givenid/" + object.givenId);
    const responseObject: ResponseData<T> | null = await handleResponse(objectData, object, route, createObject);
    if (responseObject){
      return responseObject
    }
    return objectData;
  } catch (error : any) {
    throw new Error(`Error in getOrCreateObject: ${error.message}`);
  }
};