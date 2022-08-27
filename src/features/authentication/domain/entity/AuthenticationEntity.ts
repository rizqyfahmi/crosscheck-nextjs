export class AuthenticationEntity {
    protected token: string

    constructor(token: string) {
        this.token = token
    }
}