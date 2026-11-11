import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { RequestStatus } from '@/store/types';
import type { OfferPreview } from '@/types/offer';

const getFavoritesStatus = (state: RootState): RequestStatus => state.favorites.favoritesStatus;

export const getFavorites = (state: RootState): OfferPreview[] => state.favorites.favorites;

export const getFavoritesByCity = createSelector([getFavorites], (favorites) =>
  Object.groupBy(favorites, (offer) => offer.city.name)
);

export const selectFavoritesStatus = createSelector([getFavoritesStatus], (status) => ({
  isLoading: status === RequestStatus.Idle || status === RequestStatus.Loading,
  isError: status === RequestStatus.Failed,
}));
