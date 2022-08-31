import "reflect-metadata";
import { AuthenticationModel } from "../../../../../src/features/authentication/data/model/data/AuthenticationModel"
import { AuthenticationRepositoryImpl } from "../../../../../src/features/authentication/data/repository/AuthenticationRepositoryImpl"
import { AuthenticationRemote } from "../../../../../src/features/authentication/data/source/AuthenticationRemote"
import { AuthenticationEntity } from "../../../../../src/features/authentication/domain/entity/AuthenticationEntity"
import { ServerFailure } from "../../../../../src/utils/exception/failure"

describe("Login", () => {
    describe("Username and password as the parameter", () => {

        let mockAuthenticationRemote: jest.Mocked<AuthenticationRemote>
        beforeEach(() => {
            mockAuthenticationRemote = {
                login: jest.fn()
            }
        })

        describe("When authentication repository get error response from remote data source", () => {
            
            let username: string, password: string
            let mockResult: ServerFailure
            
            beforeEach(() => {
                username = "johndoe@email.com"
                password = "Hello Password"

                mockResult = new ServerFailure("Internal server error", null)
                mockAuthenticationRemote.login.mockImplementation(() => Promise.reject(mockResult))
            })

            it("returns server failure", async () => {
                const expected = new ServerFailure("Internal server error", null)

                const repo = new AuthenticationRepositoryImpl(mockAuthenticationRemote)
                const login = repo.login(username, password)
                
                expect(login).rejects.toStrictEqual(expected)
                expect(mockAuthenticationRemote.login).toBeCalled()
                expect(mockAuthenticationRemote.login).toBeCalledTimes(1)
            })
        })

        describe("When authentication repository get succcess response from remote data source", () => {
            
            let username: string, password: string
            let mockResult: AuthenticationEntity;
            
            beforeEach(() => {
                username = "johndoe@email.com"
                password = "Hello Password"

                mockResult = new AuthenticationModel("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAifQ._aG0ukzancZqhL1wvBTJh8G8d3Det5n0WKcPo5C0DCY")
                mockAuthenticationRemote.login.mockImplementation(() => new Promise((resolve) => {
                    return mockResult as AuthenticationEntity
                }))
            })

            it("returns authentication entity", async () => {
                const expected = new AuthenticationEntity("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAifQ._aG0ukzancZqhL1wvBTJh8G8d3Det5n0WKcPo5C0DCY")

                const repo = new AuthenticationRepositoryImpl(mockAuthenticationRemote)
                const login = repo.login(username, password)
                
                expect(login).resolves.toStrictEqual(expected)
                expect(mockAuthenticationRemote.login).toBeCalled()
                expect(mockAuthenticationRemote.login).toBeCalledTimes(1)
            })
        })
    })
})