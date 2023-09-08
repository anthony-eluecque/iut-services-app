import { IdEntity } from "./entity.types";
import { Lesson } from "./lesson.types";
import { Teacher } from "./teacher.types";

export type Item = {
    teacher : Teacher
    lesson : Lesson
    amountHours : number
} & IdEntity


