import { ServerFailure } from "../../../../utils/exception/failure";
import { AuthenticationEntity } from "../../domain/entity/AuthenticationEntity";
import { AuthenticationRepository } from "../../domain/repository/AuthenticationRepository";
import { AuthenticationModel } from "../model/data/AuthenticationModel";
import { AuthenticationRemote } from "../source/AuthenticationRemote";

export class AuthenticationRepositoryImpl implements AuthenticationRepository {

    remote: AuthenticationRemote

    constructor(remote: AuthenticationRemote) {
        this.remote = remote
    }
    
    public login(username: string, password: string): Promise<AuthenticationEntity> {
        return new Promise(async (resolve, reject) => {
            try {
                const model: AuthenticationModel = await this.remote.login(username, password)
                resolve(model)
            } catch (error) {
                const serverFailure = error as ServerFailure
                reject(serverFailure)
            }
        })
    }
}