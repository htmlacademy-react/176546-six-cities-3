import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRoute } from '@/const';
import type { OfferPreview } from '@/types/offer';
import type { ThunkOptions } from '@/types/thunk';

export const fetchOffersAction = createAsyncThunk<OfferPreview[], undefined, ThunkOptions>(
  'data/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<OfferPreview[]>(ApiRoute.Offers);

    return data;
  }
);
