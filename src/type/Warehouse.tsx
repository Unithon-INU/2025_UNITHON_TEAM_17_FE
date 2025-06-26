import {User} from "./auth";

export type Warehouse = {
    id: number;
    name: string;
    memberId: number;
}
export type CreateLocationMakeReq = {
    name: string
}
export type Location = {
    id: number;
    name: string;
    memberId: User["id"];
}