import { Lesson, Teacher, Item } from "@/types"
import { ResponseData, Routes, fetchData, postData } from "..";

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

        if (responseTeacher){
            teacherData.data.id = responseTeacher.data.id;
        };        

        if (responseLesson){
            lessonData.data.id = responseLesson.data.id;
        };
        console.log(item)
        console.log(teacherData);
        
        const newItem = createItem(item.amountHours,lessonData.data.id);
        const postItem :  ResponseData<Item> = await postData(Routes.ITEMS,newItem);       
        const newService = createService(teacherData.data.id,[postItem.data.id],currentYear);
        console.log(newService);
        await postData(Routes.SERVICES,newService);

    } catch (error) {
        throw error;
    }
}

const createService = (idTeacher : string, itemsIds : string[],currentYear : number) => {
    return {
        teacher :  idTeacher,
        itemsIds : itemsIds,
        year: currentYear
    }
}

const createItem = (amountHours : number, idLesson : string) => {
    return {
        amountHours : amountHours,
        type : '',
        lesson : idLesson
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
