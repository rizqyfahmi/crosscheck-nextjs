import { AuthenticationEntity } from "../entity/AuthenticationEntity";

export interface AuthenticationRepository {
    login(username: string, password: string) : Promise<AuthenticationEntity>
}