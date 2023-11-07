import { User } from "./user.types";

export type ResponseUsersPage = {
    users: User[];
    count: number;
}