import { AuthenticationModel } from "../model/data/AuthenticationModel";

export interface AuthenticationRemote {
    login(username: string, password: string): Promise<AuthenticationModel>
}