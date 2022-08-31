import "reflect-metadata";
import { LoginParam } from "../../../../../src/features/authentication/data/model/param/LoginParam";
import { AuthenticationEntity } from "../../../../../src/features/authentication/domain/entity/AuthenticationEntity";
import { AuthenticationRepository } from "../../../../../src/features/authentication/domain/repository/AuthenticationRepository";
import { LoginUsecase } from "../../../../../src/features/authentication/domain/usecase/LoginUsecase";
import { NullFailure, ServerFailure, UnexpectedFailure } from "../../../../../src/utils/exception/failure";

describe("Login parameter", () => {

    let mockAuthenticationRepository: jest.Mocked<AuthenticationRepository>;
    beforeEach(() => {
        mockAuthenticationRepository = {
            login: jest.fn()
        };
    })
    
    describe("When login usecase fails to check the parameters", () => {
        
        let loginParam: LoginParam;
        let mockResult: NullFailure;

        beforeEach(() => {
            loginParam = new LoginParam("johndoe@email.com", "")
                
            mockResult = new NullFailure("Insufficient parameter", null)
            mockAuthenticationRepository.login.mockImplementation(() => Promise.reject(mockResult))
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
        let mockResult: ServerFailure;

        beforeEach(() => {
            loginParam = new LoginParam("johndoe@email.com", "HelloPassword")
            
            mockResult = new ServerFailure("Internal server error", null)
            mockAuthenticationRepository.login.mockImplementation(() => Promise.reject(mockResult));
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
        let mockResult: UnexpectedFailure;

        beforeEach(() => {
            loginParam = new LoginParam("johndoe@email.com", "HelloPassword")
            
            mockResult = new UnexpectedFailure("NullPointer Exception", null)
            mockAuthenticationRepository.login.mockImplementation(() => Promise.reject(mockResult));
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
        let mockResult: AuthenticationEntity;

        beforeEach(() => {
            loginParam = new LoginParam("johndoe@email.com", "HelloPassword")
            
            mockResult = new AuthenticationEntity("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAifQ._aG0ukzancZqhL1wvBTJh8G8d3Det5n0WKcPo5C0DCY")
            mockAuthenticationRepository.login.mockImplementation(() => Promise.resolve(mockResult));
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
