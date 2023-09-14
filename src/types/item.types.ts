import { IdEntity } from "./entity.types";
import { Lesson } from "./lesson.types";
import { Teacher } from "./teacher.types";

export type Item = {
    amountHours : number
    type : string
    lesson? : Lesson
    teacher : Teacher // à modifier
} & IdEntity


