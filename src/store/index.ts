import { configureStore } from '@reduxjs/toolkit';
import type { AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { AuthorizationStatus } from '@/const';
import { createAPI } from '@/services/api';
import { dropToken } from '@/services/token';
import { authSlice, changeAuthorizationStatus } from '@/store/auth-slice';
import { offersSlice } from '@/store/offers-slice';
import { offerSlice } from '@/store/offer-slice';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    offers: offersSlice.reducer,
    offer: offerSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === StatusCodes.UNAUTHORIZED) {
      dropToken();
      store.dispatch(changeAuthorizationStatus(AuthorizationStatus.NoAuth));
    }

    return Promise.reject(error);
  }
);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
