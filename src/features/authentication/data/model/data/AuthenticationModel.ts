import { LoginData, Response } from "../../../../../utils/types/types";
import { AuthenticationEntity } from "../../../domain/entity/AuthenticationEntity";

export class AuthenticationModel extends AuthenticationEntity {
    constructor(token: string) {
        super(token)
    }

    static fromJSON(data: LoginData) {
        return new AuthenticationModel(data.token)
    }

    toJSON() {
        return { "token": this.token }
    }
}