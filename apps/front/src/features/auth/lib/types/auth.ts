export interface IAuthRequest {
    email: string,
    password: string
}

export interface IAuthResponse {
    accessToken: string;
}

export type ILoginRequest = IAuthRequest

export type IRegisterRequest = IAuthRequest