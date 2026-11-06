import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRoute, AuthorizationStatus } from '@/const';
import { dropToken } from '@/services/token';
import { changeAuthorizationStatus, changeUser } from '@/store/action';
import type { OfferDetails, OfferPreview } from '@/types/offer';
import type { Review } from '@/types/review';
import type { ThunkOptions } from '@/types/thunk';
import type { AuthInfo } from '@/types/user';

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
