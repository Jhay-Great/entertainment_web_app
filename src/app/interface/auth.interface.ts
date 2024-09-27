export interface IAuth {
    email: string;
    password: string;
    confirmPassword?: string;
}

export interface ISuccess {
    message:string;
}

export interface IError {
    error:{ message: string };
    headers?:{};
    message: string;
    name: string;
    ok: string;
    status:string;
    statusText:string;
    url:string;
}




