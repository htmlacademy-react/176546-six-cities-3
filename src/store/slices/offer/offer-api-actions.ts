import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { ApiRoute } from '@/const';
import type { OfferDetails, OfferPreview } from '@/types/offer';
import type { Review, ReviewPost } from '@/types/review';
import type { ThunkOptions } from '@/types/thunk';
import { getApiErrorMessage } from '@/utils';

type OfferThunkConfig = ThunkOptions & { rejectValue: boolean };

export const fetchOfferAction = createAsyncThunk<OfferDetails, string, OfferThunkConfig>(
  'data/fetchOffer',
  async (offerId, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<OfferDetails>(`${ApiRoute.Offers}/${offerId}`);

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
    const { data } = await api.post<Review>(`${ApiRoute.Comments}/${offerId}`, { comment, rating });

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
