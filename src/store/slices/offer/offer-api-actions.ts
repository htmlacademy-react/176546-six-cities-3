import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRoute } from '@/const';
import type { OfferDetails, OfferPreview } from '@/types/offer';
import type { Review } from '@/types/review';
import type { ThunkOptions } from '@/types/thunk';

export const fetchOfferAction = createAsyncThunk<OfferDetails, string, ThunkOptions>(
  'data/fetchOffer',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<OfferDetails>(`${ApiRoute.Offers}/${offerId}`);

    return data;
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

export const fetchCommentsAction = createAsyncThunk<Review[], string, ThunkOptions>(
  'data/fetchComments',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Review[]>(`${ApiRoute.Comments}/${offerId}`);

    return data;
  }
);
