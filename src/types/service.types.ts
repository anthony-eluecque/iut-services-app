import { IdEntity } from "./entity.types";
import { Item } from "./item.types";
import { Teacher } from "./teacher.types";

export type Service = {
    year : number,
    teacher? : Teacher
    items? : Item[]
} & IdEntity