import { AuthenticationEntity } from "../../../domain/entity/AuthenticationEntity";

export class AuthenticationModel extends AuthenticationEntity {
    constructor(token: string) {
        super(token)
    }

    fromJSON(response: { data: { token: string } }) {
        return new AuthenticationModel(response.data.token)
    }

    toJSON() {
        return { "token": this.token }
    }
}