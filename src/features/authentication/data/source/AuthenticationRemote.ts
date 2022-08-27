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
        return new Promise<AuthenticationModel>(async (resolve, reject) => {
            const url = `${process.env.API_HOST}/authentication/login`
            const response = await this.client.post(url,
                {
                    username: username,
                    password: password
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )

            const result: Response = response.data

            if (response.status != 200) {
                const error = new ServerFailure(result.message, result)
                return reject(error)
            }

            resolve(AuthenticationModel.fromJSON(result.data)) 
        })
    }

}