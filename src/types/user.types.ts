import { IdEntity } from "./entity.types";

export type User = {
    firstName: string
    lastName: string
    email: string
    password: string
    isAdmin: boolean
} & IdEntity