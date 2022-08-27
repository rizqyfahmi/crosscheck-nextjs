import axios from 'axios';
import { AuthenticationModel } from '../../../../../src/features/authentication/data/model/data/AuthenticationModel';
import { AuthenticationRemoteImple } from '../../../../../src/features/authentication/data/source/AuthenticationRemote';
import { ServerFailure } from '../../../../../src/utils/exception/failure';
jest.mock('axios');



describe("Login", () => {
    
    let username: string, password: string
    let mockAxios: jest.Mocked<typeof axios>;
    beforeEach(() => {
        username = "johndoe@email.com"
        password = "Hello Password"
        mockAxios = axios as jest.Mocked<typeof axios>
    })

    describe("Username and password as the parameter", () => {
        describe("When API call for login get error response", () => {
            it("Should returns error server", () => {
                const expected = new ServerFailure("Something went wrong", {
                    status: "error",
                    message: "Something went wrong",
                    data: null
                })

                mockAxios.post.mockResolvedValueOnce({
                    data: {
                        status: "error",
                        message: "Something went wrong",
                        data: null
                    },
                    status: 500,
                    statusText: 'Internal server error',
                    headers: {},
                    config: {},
                })

                const source = new AuthenticationRemoteImple(mockAxios)
                const login = source.login(username, password)

                expect(login).rejects.toStrictEqual(expected)
                expect(mockAxios.post).toBeCalled()
            })
        })

        describe("When API call for login get success response", () => {
            it("Should returns authentication model", () => {
                const expected = new AuthenticationModel("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAifQ._aG0ukzancZqhL1wvBTJh8G8d3Det5n0WKcPo5C0DCY")

                mockAxios.post.mockResolvedValueOnce({
                    data: {
                        status: "success",
                        message: "Login success",
                        data: {
                            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAifQ._aG0ukzancZqhL1wvBTJh8G8d3Det5n0WKcPo5C0DCY"
                        }
                    },
                    status: 200,
                    statusText: 'Ok',
                    headers: {},
                    config: {},
                })

                const source = new AuthenticationRemoteImple(mockAxios)
                const login = source.login(username, password)

                expect(login).resolves.toStrictEqual(expected)
                expect(mockAxios.post).toBeCalled()
            })
        })
    })
})
