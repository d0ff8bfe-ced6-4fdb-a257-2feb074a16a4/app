import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import { logout, setToken } from '@features/auth';
import { RefreshResponse, RootState } from '@shared/lib';

const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}`,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const accessToken = (getState() as RootState).auth.accessToken;
        // const accessToken = localStoragee.getItem('accessToken');
        if (accessToken) {
            headers.set('Authorization', `Bearer ${accessToken}`);
        }
        return headers;
    },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401) {
        const refreshResult = await baseQuery('/auth/refresh-tokens', api, extraOptions);
        if (refreshResult.data) {
            const { accessToken } = refreshResult.data as RefreshResponse;
            const token = accessToken.split(' ')[1];
            localStorage.setItem('accessToken', token);
            api.dispatch(setToken(token));
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout());
            localStorage.removeItem('accessToken');
        }
    }
    return result;
};

const mainApi = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: (_builder) => ({}),
    tagTypes: ['User'],
});

export default mainApi;
