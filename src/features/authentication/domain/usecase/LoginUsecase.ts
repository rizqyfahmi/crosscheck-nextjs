import { inject, injectable } from "inversify";
import { NullFailure, ServerFailure, UnexpectedFailure } from "../../../../utils/exception/failure";
import { ContainerType } from "../../../../utils/locator/ContainerType";
import { LoginParam } from "../../data/model/param/LoginParam";
import { AuthenticationEntity } from "../entity/AuthenticationEntity";
import type { AuthenticationRepository } from "../repository/AuthenticationRepository";

@injectable()
export class LoginUsecase {
    private repo: AuthenticationRepository

    constructor(@inject(ContainerType.AuthenticationRepository) repo: AuthenticationRepository) {
        this.repo = repo
    }

    async call(param: LoginParam): Promise<AuthenticationEntity> {
        return new Promise<AuthenticationEntity>(async (resolve, reject) => {
            // resolve(new AuthenticationEntity("hello token"))
            if (!param.username || !param.password) {
                return reject(
                    new NullFailure("Insufficient parameter", null)
                )
            }

            try {
                const result: AuthenticationEntity = await this.repo.login(param.username, param.password)
                resolve(result)
            } catch (error) {
                if (error instanceof ServerFailure) {
                    reject(error)
                }

                const unexpectedFailure = error as UnexpectedFailure
                reject(unexpectedFailure)
            }
        }) 
    }
}