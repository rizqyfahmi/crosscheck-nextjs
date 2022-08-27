import { LoginParam } from "../../../../../src/features/authentication/data/model/param/LoginParam";
import { AuthenticationEntity } from "../../../../../src/features/authentication/domain/entity/AuthenticationEntity";
import { AuthenticationRepository } from "../../../../../src/features/authentication/domain/repository/AuthenticationRepository";
import { LoginUsecase } from "../../../../../src/features/authentication/domain/usecase/LoginUsecase";
import { NullFailure, ServerFailure, UnexpectedFailure } from "../../../../../src/utils/exception/failure";

describe("Login parameter", () => {
    
    describe("When login usecase fails to check the parameters", () => {
        let loginParam: LoginParam;
        let mockAuthenticationRepository: AuthenticationRepository;
        let mockResult: NullFailure;

        beforeEach(() => {
            mockResult = new NullFailure("Insufficient parameter", null)
            loginParam = new LoginParam(
                "johndoe@email.com", ""
            )

            mockAuthenticationRepository = {
                login: jest.fn().mockImplementation(() => Promise.reject(mockResult))
            };
        })

        it("returns null failure", async () => {
            const expected = new NullFailure("Insufficient parameter", null)
            
            const usecase = new LoginUsecase(mockAuthenticationRepository)
            const login = usecase.call(loginParam)

            expect(login).rejects.toStrictEqual(expected)
            expect(mockAuthenticationRepository.login).not.toBeCalled()
            
        })
    })

    describe("When login usecase fails to execute authentication repository caught by error response", () => {
        let loginParam: LoginParam;
        let mockAuthenticationRepository: AuthenticationRepository;
        let mockResult: ServerFailure;

        beforeEach(() => {
            mockResult = new ServerFailure("Internal server error", null)
            loginParam = new LoginParam(
                "johndoe@email.com", "HelloPassword"
            )

            mockAuthenticationRepository = {
                login: jest.fn().mockImplementation(() => Promise.reject(mockResult))
            };
        })

        it("returns server failure", async () => {
            const expected = new ServerFailure("Internal server error", null)

            const usecase = new LoginUsecase(mockAuthenticationRepository)
            const login = usecase.call(loginParam)

            expect(login).rejects.toStrictEqual(expected)
            expect(mockAuthenticationRepository.login).toBeCalled()
            expect(mockAuthenticationRepository.login).toBeCalledTimes(1)

        })
    })

    describe("When login usecase fails to execute authentication repository caught by unexpected error", () => {
        let loginParam: LoginParam;
        let mockAuthenticationRepository: AuthenticationRepository;
        let mockResult: UnexpectedFailure;

        beforeEach(() => {
            mockResult = new UnexpectedFailure("NullPointer Exception", null)
            loginParam = new LoginParam(
                "johndoe@email.com", "HelloPassword"
            )

            mockAuthenticationRepository = {
                login: jest.fn().mockImplementation(() => Promise.reject(mockResult))
            };
        })

        it("returns unexpected failure", async () => {
            const expected = new UnexpectedFailure("NullPointer Exception", null)

            const usecase = new LoginUsecase(mockAuthenticationRepository)
            const login = usecase.call(loginParam)
            
            expect(login).rejects.toStrictEqual(expected)
            expect(mockAuthenticationRepository.login).toBeCalled()
            expect(mockAuthenticationRepository.login).toBeCalledTimes(1)

        })
    })

    describe("When login usecase successfully execute authentication repository", () => {
        let loginParam: LoginParam;
        let mockAuthenticationRepository: AuthenticationRepository;
        let mockResult: AuthenticationEntity;

        beforeEach(() => {
            mockResult = new AuthenticationEntity("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAifQ._aG0ukzancZqhL1wvBTJh8G8d3Det5n0WKcPo5C0DCY")
            loginParam = new LoginParam(
                "johndoe@email.com", "HelloPassword"
            )

            mockAuthenticationRepository = {
                login: jest.fn().mockImplementation(() => Promise.resolve(mockResult))
            };
        })

        it("returns authentication entity", async () => {
            const expected = new AuthenticationEntity("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAifQ._aG0ukzancZqhL1wvBTJh8G8d3Det5n0WKcPo5C0DCY")

            const usecase = new LoginUsecase(mockAuthenticationRepository)
            const login = usecase.call(loginParam)
            
            expect(login).resolves.toStrictEqual(expected)
            expect(mockAuthenticationRepository.login).toBeCalled()
            expect(mockAuthenticationRepository.login).toBeCalledTimes(1)

        })
    })
    
})
