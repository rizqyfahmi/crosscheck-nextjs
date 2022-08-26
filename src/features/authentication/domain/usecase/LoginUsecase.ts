import { Failure, NullFailure, ServerFailure, UnexpectedFailure } from "../../../../utils/exception/failure";
import { LoginParam } from "../../data/model/param/LoginParam";
import { AuthenticationEntity } from "../entity/AuthenticationEntity";
import { AuthenticationRepository } from "../repository/AuthenticationRepository";

export class LoginUsecase {
    repo: AuthenticationRepository

    constructor(repo: AuthenticationRepository) {
        this.repo = repo
    }

    async call(param: LoginParam): Promise<AuthenticationEntity> {
        return new Promise<AuthenticationEntity>(async (resolve, reject) => {
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