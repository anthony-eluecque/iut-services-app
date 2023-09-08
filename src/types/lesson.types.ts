import { IdEntity } from "./entity.types"

export type Lesson = {
    givenId : string
    label : string
    amountHours : number
} & IdEntity
  