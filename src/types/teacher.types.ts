import { IdEntity } from "./entity.types"
import { Service } from "./service.types"

export type Teacher  = {
    givenId : string
    firstName : string
    lastName : string
    services? : Service[]
} & IdEntity
  