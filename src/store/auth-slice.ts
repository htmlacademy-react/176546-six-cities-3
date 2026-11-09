import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '@/const';
import { checkAuthAction, loginAction, logoutAction } from '@/store/api-actions';
import { RequestStatus } from '@/store/types';
import type { AuthState } from '@/store/types';

const initialState: AuthState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  loginStatus: RequestStatus.Idle,
  loginError: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeAuthorizationStatus(state, action: PayloadAction<AuthorizationStatus>) {
      state.authorizationStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.user = null;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.pending, (state) => {
        state.loginStatus = RequestStatus.Loading;
        state.loginError = '';
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.loginStatus = RequestStatus.Success;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.loginStatus = RequestStatus.Failed;
        state.loginError = action.payload ?? 'Sign in failed. Please try again.';
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.user = null;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.loginStatus = RequestStatus.Idle;
        state.loginError = '';
      });
  },
});

export const { changeAuthorizationStatus } = authSlice.actions;
