import { Lesson, Teacher, Item } from "@/types"
import { ResponseData, Routes, fetchData, postData, updateData } from "..";
import { Service } from "@/types/service.types";

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

export const postItem = async (item : Item,currentYear : number) => {
    await postData(Routes.ITEMS, item);
}

const handleResponse = async <T extends Identifiable>(
    response : ResponseData<T>,
    data : T,
    route : Routes|string,
    newObject: (data : T) => T
) : Promise<ResponseData<T>|null> => {
    try {
        let postDataResponse : ResponseData<T> | null = null
        if (response.status == statusCode.NOT_FOUND ){
            const obj = newObject(data);
            const { id, ...newObjWithoutId } = obj;
            postDataResponse = await postData(route, newObjWithoutId);
        }
        return postDataResponse
    } catch (error) {
        throw error;
    }
}

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