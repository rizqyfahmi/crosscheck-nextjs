
export type ResponseStatus = "error" | "success"

export type Response = {
    status: ResponseStatus
    message: string,
    data: any
}

export type LoginData = {
    token: string
}