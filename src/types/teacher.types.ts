import { IdEntity } from "./entity.types"

export type Teacher  = {
    givenId : string
    firstname : string
    lastname : string
} & IdEntity
  