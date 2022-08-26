import { LoginParam } from "../../../../src/features/authentication/data/model/param/LoginParam";
import { AuthenticationEntity } from "../../../../src/features/authentication/domain/entity/AuthenticationEntity";
import { AuthenticationRepository } from "../../../../src/features/authentication/domain/repository/AuthenticationRepository";
import { LoginUsecase } from "../../../../src/features/authentication/domain/usecase/LoginUsecase";
import { NullFailure, ServerFailure, UnexpectedFailure } from "../../../../src/utils/exception/failure";

describe("Login parameter", () => {
    
    describe("When login usecase fails to check the parameters", () => {
        let loginParam: LoginParam | null;
        let mockAuthenticationRepository: AuthenticationRepository;
        let failure: NullFailure;

        beforeEach(() => {
            failure = new NullFailure("Insufficient parameter", null)
            loginParam = new LoginParam(
                "johndoe@email.com", ""
            )
        })

        it("returns null failure", async () => {
            
            const usecase = new LoginUsecase(mockAuthenticationRepository)
            expect(usecase.call(loginParam!)).rejects.toStrictEqual(failure)
            
        })
    })

    describe("When login usecase fails to execute authentication repository caught by error response", () => {
        let loginParam: LoginParam;
        let mockAuthenticationRepository: AuthenticationRepository;
        let failure: NullFailure;

        beforeEach(() => {
            failure = new ServerFailure("Internal server error", null)
            loginParam = new LoginParam(
                "johndoe@email.com", "HelloPassword"
            )

            mockAuthenticationRepository = {
                login: jest.fn().mockImplementation(() => Promise.reject(failure))
            };
        })

        it("returns server failure", async () => {

            const usecase = new LoginUsecase(mockAuthenticationRepository)
            expect(usecase.call(loginParam)).rejects.toStrictEqual(failure)

        })
    })

    describe("When login usecase fails to execute authentication repository caught by unexpected error", () => {
        let loginParam: LoginParam;
        let mockAuthenticationRepository: AuthenticationRepository;
        let failure: NullFailure;

        beforeEach(() => {
            failure = new UnexpectedFailure("NullPointer Exception", null)
            loginParam = new LoginParam(
                "johndoe@email.com", "HelloPassword"
            )

            mockAuthenticationRepository = {
                login: jest.fn().mockImplementation(() => Promise.reject(failure))
            };
        })

        it("returns unexpected failure", async () => {

            const usecase = new LoginUsecase(mockAuthenticationRepository)
            expect(usecase.call(loginParam)).rejects.toStrictEqual(failure)

        })
    })

    describe("When login usecase successfully execute authentication repository", () => {
        let loginParam: LoginParam;
        let mockAuthenticationRepository: AuthenticationRepository;
        let result: AuthenticationEntity;

        beforeEach(() => {
            result = new AuthenticationEntity("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAifQ._aG0ukzancZqhL1wvBTJh8G8d3Det5n0WKcPo5C0DCY")
            loginParam = new LoginParam(
                "johndoe@email.com", "HelloPassword"
            )

            mockAuthenticationRepository = {
                login: jest.fn().mockImplementation(() => Promise.resolve(result))
            };
        })

        it("returns authentication entity", async () => {

            const usecase = new LoginUsecase(mockAuthenticationRepository)
            expect(usecase.call(loginParam)).resolves.toStrictEqual(result)

        })
    })
    
})
