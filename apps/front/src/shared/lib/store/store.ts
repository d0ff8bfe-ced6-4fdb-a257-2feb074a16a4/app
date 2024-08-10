import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authSlice } from '@features/auth';
import { userSlice } from '@entities/user';
import { eventsSlice } from '@features/events';
import mainApi from '@shared/lib/store/api/mainApi.ts';
import { projectSlice } from '@entities/project';

const rootReducer = combineReducers({
  [mainApi.reducerPath]: mainApi.reducer,
  auth: authSlice.reducer,
  user: userSlice.reducer,
  project: projectSlice.reducer,
  events: eventsSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainApi.middleware),
  devTools: true,
});

