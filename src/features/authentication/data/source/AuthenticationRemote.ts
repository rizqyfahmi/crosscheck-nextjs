import type { Axios } from "axios";
import { inject, injectable } from "inversify";
import { ServerFailure } from "../../../../utils/exception/failure";
import { ContainerType } from "../../../../utils/locator/ContainerType";
import { Response } from "../../../../utils/types/types";
import { AuthenticationModel } from "../model/data/AuthenticationModel";

export interface AuthenticationRemote {
    login(username: string, password: string): Promise<AuthenticationModel>
}

@injectable()
export class AuthenticationRemoteImpl implements AuthenticationRemote {
    client: Axios

    constructor(@inject(ContainerType.Axios) client: Axios) {
        this.client = client
    }

    login(username: string, password: string): Promise<AuthenticationModel> {
        return new Promise<AuthenticationModel>(async (resolve, reject) => {
            const url = `/authentication/login`
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