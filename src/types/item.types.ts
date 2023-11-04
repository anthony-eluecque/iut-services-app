import { IdEntity } from "./entity.types";
import { Lesson } from "./lesson.types";
import { Service } from "./service.types";

export type Item = {
    type : string
    lesson? : Lesson
    service? : Service
    lessonTypes : lessonTypes[]    
} & IdEntity


type lessonTypes = {
    amountHours : number,
    lessonType : lessonType
} & IdEntity

type lessonType = {
    name : string
} & IdEntity