import {User} from "./auth";

export type Warehouse = {
    id: number;
    name: string;
    memberId: number;
}
export type CreateLocationMakeReq = {
    name: string;
    description: string;
    image: File;
};
export type Location = {
    locationId: number;
    name: string;
    memberId: User["id"];
    imagePath: string;
    description: string;
    itemCount: number;
}
export type EditLocationReq = {
    name: Location["name"]
    description: Location["description"]
    image: File;
}