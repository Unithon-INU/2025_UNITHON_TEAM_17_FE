export type User = {
    email: string;
    name: string;
    id: number;
}
export type SignUpReq = {
    email: string;
    password: string;
    name: string;
}
export type SignUpRes = User & { message: string; }
export type LoginReq = {
    email: string;
    password: string;
}
export type LoginRes = SignUpRes