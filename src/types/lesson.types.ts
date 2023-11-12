import { IdEntity } from "./entity.types"
import { Item } from "./item.types"

export type Lesson = {
    givenId : string
    name : string
    items? : Item[]
} & IdEntity