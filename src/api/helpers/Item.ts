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

const createService = (idTeacher : string,currentYear : number) => {
    return {
        teacher :  idTeacher,
        itemsIds : [],
        year: currentYear
    }
}

const createItem = (amountHours : number, idLesson : string, idService : string) => {
    return {
        amountHours : amountHours,
        type : '',
        lesson : idLesson,
        service : idService
    }
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
    try {
        const teacher = item.service?.teacher as Teacher;
        const lesson = item.lesson as Lesson;
        const teacherResponse : ResponseData<Teacher> | null = await getOrCreateObject<Teacher>(
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
        const lessonResponse : ResponseData<Lesson> | null = await getOrCreateObject<Lesson>(
            lesson,
            Routes.LESSONS,
            (lesson) => ({
                givenId: lesson.givenId,
                name: lesson.name,
                id: '',
            })
        );

        const idTeacher = teacherResponse?.data.id || '';
        const idLesson = lessonResponse?.data.id || '';
        
        const url = `/teacher/${idTeacher}/year/${currentYear}`;
        const serviceIsExisting : ResponseData<Service> = await fetchData(Routes.SERVICES + url);
        if (serviceIsExisting.status == statusCode.NOT_FOUND){
            const newService = createService(idTeacher, currentYear);
            const postService : ResponseData<Service> = await postData(Routes.SERVICES, newService);
            const newItem = createItem(item.amountHours, idLesson, postService.data.id);
            await postData(Routes.ITEMS, newItem);
        } else {
            const newItem = createItem(item.amountHours, idLesson, serviceIsExisting.data.id);
            await postData(Routes.ITEMS, newItem);
        }
    } catch (error : any) {
        throw new Error(`Error in postItem: ${error.message}`);
    }
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