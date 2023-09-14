import { IdEntity } from "./entity.types"

export type Teacher  = {
    givenId : string
    firstName : string
    lastName : string
} & IdEntity
  