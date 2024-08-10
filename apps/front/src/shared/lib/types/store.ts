import { store } from '@shared/lib/store';


export interface RefreshResponse {
    accessToken: string;
    refreshToken?: string;
}
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch