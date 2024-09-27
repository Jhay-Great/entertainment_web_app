export interface IAuth {
    username: string;
    password: string;
    confirmPassword?: string;
}

export interface IServerResponse {
    username:string;
    password:string;
}