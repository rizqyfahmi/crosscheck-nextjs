import React, { createContext, useContext } from "react";
import { Container, interfaces } from "inversify";
import { LoginUsecase } from "../../features/authentication/domain/usecase/LoginUsecase";
import { AuthenticationRepository } from "../../features/authentication/domain/repository/AuthenticationRepository";
import { AuthenticationRemote, AuthenticationRemoteImpl } from "../../features/authentication/data/source/AuthenticationRemote";
import axios, { Axios } from "axios";
import { ContainerType } from "./ContainerType";

export const ContainerContext = createContext<Container | null>(null)

interface ContainerProviderProps {
    container: Container,
    children: React.ReactNode
}

export const ContainerProvider: React.FC<ContainerProviderProps> = ({ container, children }) => {
    return (
        <ContainerContext.Provider value={container}>
            {children}
        </ContainerContext.Provider>
    )
}

export function useService<T>(identifier: interfaces.ServiceIdentifier<T>): T {
    const container = useContext(ContainerContext);
    if (!container) {
        throw new Error('The container should not be null');
    }
    try {
        return container.get<T>(identifier);
    } catch (e) {
        return container.resolve<T>(identifier as interfaces.Newable<T>);
    }
}

const container = new Container()

export default container
