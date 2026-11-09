import { createSelector } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '@/const';
import type { RootState } from '@/store';
import type { AuthInfo } from '@/types/user';
import { RequestStatus } from '@/store/types';

export const getAuthorizationStatus = (state: RootState): AuthorizationStatus =>
  state.auth.authorizationStatus;

export const getUser = (state: RootState): AuthInfo | null => state.auth.user;

export const getLoginStatus = (state: RootState): RequestStatus => state.auth.loginStatus;

export const getLoginError = (state: RootState): string => state.auth.loginError;

export const selectAuthState = createSelector(
  [getAuthorizationStatus, getUser],
  (authorizationStatus, user) => ({
    isAuthenticated: authorizationStatus === AuthorizationStatus.Auth,
    user,
  })
);

export const selectLoginStatus = createSelector([getLoginStatus], (status) => ({
  isLoading: status === RequestStatus.Loading,
  isSuccess: status === RequestStatus.Success,
}));
