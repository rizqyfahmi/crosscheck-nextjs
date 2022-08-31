export class AuthenticationEntity {
    protected token: string

    constructor(token: string) {
        this.token = token
    }

    getToken(): string {
        return this.token
    }
}