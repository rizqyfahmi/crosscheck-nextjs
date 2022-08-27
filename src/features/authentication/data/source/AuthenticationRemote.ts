import axios, { AxiosStatic } from "axios";
import { ServerFailure } from "../../../../utils/exception/failure";
import { Response } from "../../../../utils/types/types";
import { AuthenticationModel } from "../model/data/AuthenticationModel";

export interface AuthenticationRemote {
    login(username: string, password: string): Promise<AuthenticationModel>
}

export class AuthenticationRemoteImple implements AuthenticationRemote {
    client: AxiosStatic

    constructor(client: AxiosStatic) {
        this.client = client
    }

    login(username: string, password: string): Promise<AuthenticationModel> {
        throw new Error("Method not implemented.");
    }

}