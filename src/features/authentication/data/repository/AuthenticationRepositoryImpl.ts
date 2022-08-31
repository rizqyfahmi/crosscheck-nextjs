import { inject, injectable } from "inversify";
import { ServerFailure } from "../../../../utils/exception/failure";
import { ContainerType } from "../../../../utils/locator/ContainerType";
import { AuthenticationEntity } from "../../domain/entity/AuthenticationEntity";
import { AuthenticationRepository } from "../../domain/repository/AuthenticationRepository";
import { AuthenticationModel } from "../model/data/AuthenticationModel";
import type { AuthenticationRemote } from "../source/AuthenticationRemote";

@injectable()
export class AuthenticationRepositoryImpl implements AuthenticationRepository {

    remote: AuthenticationRemote

    constructor(@inject(ContainerType.AuthenticationRemote) remote: AuthenticationRemote) {
        this.remote = remote
    }
    
    public login(username: string, password: string): Promise<AuthenticationEntity> {
        return new Promise(async (resolve, reject) => {
            try {
                const model: AuthenticationModel = await this.remote.login(username, password)
                resolve(model as AuthenticationEntity)
            } catch (error) {
                const serverFailure = error as ServerFailure
                reject(serverFailure)
            }
        })
    }
}