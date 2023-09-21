import { Lesson, Teacher, Item } from "@/types"
import { ResponseData, Routes, fetchData, postData, updateData } from "..";
import { Service } from "@/types/service.types";

export const postItem = async (item : Item,currentYear : number) => {
    try {
        const teacher = item.service?.teacher as Teacher;
        const lesson = item.lesson as Lesson;
        const teacherData : ResponseData<Teacher> = await fetchData(Routes.TEACHERS+"/givenid/"+teacher.givenId);
        const lessonData : ResponseData<Lesson> = await fetchData(Routes.LESSONS+"/givenid/"+lesson.givenId);

        const responseTeacher =  await handleResponse(
            teacherData,
            teacher,
            Routes.TEACHERS,
            (teacher) => ({
            roleName: "admin",
            firstName: teacher.firstName,
            lastName: teacher.lastName,
            givenId: teacher.givenId,
            id : ''
          }));

        const responseLesson =  await handleResponse(
            lessonData,
            lesson,
            Routes.LESSONS, 
            (lesson) => ({
            givenId: lesson.givenId,
            name: lesson.name,
            id : ''
        }));

        let idTeacher = teacherData.data.id
        if (responseTeacher){   
            idTeacher = responseTeacher.data.id
        } 

        let idLesson = lessonData.data.id
        if (responseLesson){ 
            idLesson = responseLesson.data.id;
        };

        if (teacherData.data.id){
            const url = `/teacher/${teacherData.data.id}/year/${currentYear}`
            const serviceIsExisting : ResponseData<Service> = await fetchData(Routes.SERVICES+url)
            const newItem = createItem(item.amountHours,idLesson,serviceIsExisting.data.id);
            await postData(Routes.ITEMS,newItem);  

        } else {
            const newService = createService(idTeacher,currentYear);
            const postService : ResponseData<Service> = await postData(Routes.SERVICES,newService);
            const newItem = createItem(item.amountHours,idLesson,postService.data.id);
            await postData(Routes.ITEMS,newItem);       
        }
      

    } catch (error) {
        throw error;
    }
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

const handleResponse = async <T extends Identifiable>(
    response : ResponseData<T>,
    data : T,
    route : Routes,
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


interface Identifiable {
    id: string;
  }

enum statusCode {
    NOT_FOUND = 404
}
