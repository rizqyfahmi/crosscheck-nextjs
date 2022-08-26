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
        return new Promise<AuthenticationEntity>((resolve, reject) => {}) 
    }
}