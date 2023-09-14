import { IdEntity } from "./entity.types";
import { Lesson } from "./lesson.types";
import { Service } from "./service.types";
import { Teacher } from "./teacher.types";

export type Item = {
    amountHours : number
    type : string
    lesson? : Lesson
    service? : Service
} & IdEntity


