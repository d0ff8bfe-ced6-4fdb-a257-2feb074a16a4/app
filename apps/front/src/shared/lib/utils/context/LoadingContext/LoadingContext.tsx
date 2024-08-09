import React, { createContext, useState, Dispatch, SetStateAction } from 'react';
import { LoadingProviderProps } from '@shared/lib';

interface LoadingContextProps {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
}

const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);


export const LoadingProvider = ({ children }: LoadingProviderProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const value = { loading, setLoading };
    return (
        <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
    );
};
