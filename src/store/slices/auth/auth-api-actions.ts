import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRoute } from '@/const';
import { dropToken, saveToken } from '@/services/token';
import type { ThunkOptions } from '@/types/thunk';
import type { AuthInfo, AuthInfoWithToken, User } from '@/types/user';
import { getApiErrorMessage } from '@/utils';

const toAuthInfo = ({ email, name, avatarUrl, isPro }: AuthInfoWithToken): AuthInfo => ({
  email,
  name,
  avatarUrl,
  isPro,
});

export const checkAuthAction = createAsyncThunk<AuthInfo, undefined, ThunkOptions>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<AuthInfoWithToken>(ApiRoute.Login);

    return toAuthInfo(data);
  }
);

export const logoutAction = createAsyncThunk<void, undefined, ThunkOptions>(
  'user/logout',
  () => {
    dropToken();
  }
);

type LoginThunkConfig = ThunkOptions & { rejectValue: string };

export const loginAction = createAsyncThunk<AuthInfo, User, LoginThunkConfig>(
  'user/login',
  async ({ email, password }, { rejectWithValue, extra: api }) => {
    try {
      const { data } = await api.post<AuthInfoWithToken>(ApiRoute.Login, { email, password });

      saveToken(data.token);

      return toAuthInfo(data);
    } catch (error) {
      return rejectWithValue(getApiErrorMessage(error));
    }
  }
);
