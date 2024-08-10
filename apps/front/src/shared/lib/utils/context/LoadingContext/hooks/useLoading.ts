import { Context, useContext } from 'react';
import { LoadingProviderProps } from '@shared/lib';

export const useLoading = (LoadingContext: Context<LoadingProviderProps>) => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within LoadingProvider');
    }
    return context;
};
