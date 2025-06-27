import {User} from "./auth";
import {Location} from "./Warehouse";

export type CreateItemReq = {
    memberId: User["id"];
    locationId: Location["id"];
    name: string;
    imageUrl: string;
    registerDate: string;
    expireDate: string;
    alarmEnabled: boolean;
}
export type BarcodeRes = {
    productName: string;
    imageUrl: string;
    sessionId: string;
}
export type ExpireDateRes = {
    productName: string;
    imageUrl: string;
    expireDate: string;
    capturedDate: string;
}
export type Item = {
    id: number;
    name: string;
    imageUrl: string;
    registerDate: string;
    expireDate: string;
    locationName: string;
    locationId: number;
}
export type UpdateItemReq = {
    name: string;
    expireDate: string;
    locationId: number;
    alarmEnabled: boolean;
}