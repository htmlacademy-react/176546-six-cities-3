import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRoute } from '@/const';
import { dropToken, saveToken } from '@/services/token';
import { getApiErrorMessage } from '@/utils';
import type { OfferDetails, OfferPreview } from '@/types/offer';
import type { Review } from '@/types/review';
import type { ThunkOptions } from '@/types/thunk';
import type { AuthInfo, AuthInfoWithToken, User } from '@/types/user';

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
