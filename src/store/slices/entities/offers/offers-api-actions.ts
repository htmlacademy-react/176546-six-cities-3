import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { ApiRoute } from '@/const';
import type { OfferDetails, OfferPreview } from '@/types/offer';
import type { Review, ReviewPost } from '@/types/review';
import type { ThunkOptions } from '@/types/thunk';
import { getApiErrorMessage } from '@/utils';

export const fetchOffersAction = createAsyncThunk<OfferPreview[], undefined, ThunkOptions>(
  'data/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<OfferPreview[]>(ApiRoute.Offers);

    return data;
  }
);

type ChangeFavoritePayload = {
  offerId: string;
  status: boolean;
};

type ChangeFavoriteResult = {
  offerId: string;
  isFavorite: boolean;
};

export const changeFavoriteAction = createAsyncThunk<
  ChangeFavoriteResult,
  ChangeFavoritePayload,
  ThunkOptions
>('data/changeFavorite', async ({ offerId, status }, { extra: api }) => {
  const url = `${ApiRoute.Favorite}/${offerId}/${Number(status)}`;
  const { data } = await api.post<Partial<OfferPreview>>(url);

  return { offerId, isFavorite: data?.isFavorite ?? status };
});

type OfferThunkConfig = ThunkOptions & { rejectValue: boolean };

export const fetchOfferAction = createAsyncThunk<OfferDetails, string, OfferThunkConfig>(
  'data/fetchOffer',
  async (offerId, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<OfferDetails>(`${ApiRoute.Offers}/${offerId}`, {
        silentError: true,
      });

      return data;
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === StatusCodes.NOT_FOUND) {
        return rejectWithValue(true);
      }

      throw error;
    }
  }
);

export const fetchNearbyAction = createAsyncThunk<OfferPreview[], string, ThunkOptions>(
  'data/fetchNearby',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<OfferPreview[]>(
      `${ApiRoute.Offers}/${offerId}${ApiRoute.Nearby}`
    );

    return data;
  }
);

type PostCommentPayload = ReviewPost & { offerId: string };

export const postCommentAction = createAsyncThunk<
  Review,
  PostCommentPayload,
  ThunkOptions & { rejectValue: string }
>('data/postComment', async ({ offerId, comment, rating }, { extra: api, rejectWithValue }) => {
  try {
    const { data } = await api.post<Review>(
      `${ApiRoute.Comments}/${offerId}`,
      { comment, rating },
      { silentError: true }
    );

    return data;
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error, 'Could not send the review. Please try again.'));
  }
});

export const fetchCommentsAction = createAsyncThunk<Review[], string, ThunkOptions>(
  'data/fetchComments',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Review[]>(`${ApiRoute.Comments}/${offerId}`);

    return data;
  }
);

export const fetchFavoritesAction = createAsyncThunk<OfferPreview[], undefined, ThunkOptions>(
  'data/fetchFavorites',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<OfferPreview[]>(ApiRoute.Favorite);

    return data;
  }
);
