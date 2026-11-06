import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRoute, AuthorizationStatus } from '@/const';
import { dropToken, saveToken } from '@/services/token';
import { getApiErrorMessage } from '@/utils';
import { changeAuthorizationStatus, changeUser } from '@/store/action';
import type { OfferDetails, OfferPreview } from '@/types/offer';
import type { Review } from '@/types/review';
import type { ThunkOptions } from '@/types/thunk';
import type { AuthInfo, AuthInfoWithToken, User } from '@/types/user';

export const checkAuthAction = createAsyncThunk<void, undefined, ThunkOptions>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<AuthInfo>(ApiRoute.Login);
      dispatch(changeUser(data));
      dispatch(changeAuthorizationStatus(AuthorizationStatus.Auth));
    } catch {
      dispatch(changeUser(null));
      dispatch(changeAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  }
);

export const logoutAction = createAsyncThunk<void, undefined, ThunkOptions>(
  'user/logout',
  (_arg, { dispatch }) => {
    dropToken();
    dispatch(changeUser(null));
    dispatch(changeAuthorizationStatus(AuthorizationStatus.NoAuth));
  }
);

type LoginThunkConfig = ThunkOptions & { rejectValue: string };

export const loginAction = createAsyncThunk<void, User, LoginThunkConfig>(
  'user/login',
  async ({ email, password }, { dispatch, rejectWithValue, extra: api }) => {
    try {
      const { data } = await api.post<AuthInfoWithToken>(ApiRoute.Login, { email, password });

      saveToken(data.token);
      dispatch(changeUser(data));
      dispatch(changeAuthorizationStatus(AuthorizationStatus.Auth));
    } catch (error) {
      return rejectWithValue(getApiErrorMessage(error));
    }
  }
);

export const fetchOffersAction = createAsyncThunk<OfferPreview[], undefined, ThunkOptions>(
  'data/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<OfferPreview[]>(ApiRoute.Offers);

    return data;
  }
);

export const fetchOfferAction = createAsyncThunk<OfferDetails, string, ThunkOptions>(
  'data/fetchOffer',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<OfferDetails>(`${ApiRoute.Offers}/${offerId}`);

    return data;
  }
);

export const fetchCommentsAction = createAsyncThunk<Review[], string, ThunkOptions>(
  'data/fetchComments',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Review[]>(`${ApiRoute.Comments}/${offerId}`);

    return data;
  }
);
