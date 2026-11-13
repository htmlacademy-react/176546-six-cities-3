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
