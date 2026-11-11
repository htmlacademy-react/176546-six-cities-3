import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { RequestStatus } from '@/store/types';
import { isFailed, isPending } from '@/store/request-status';
import type { OfferPreview } from '@/types/offer';

const getFavoritesStatus = (state: RootState): RequestStatus => state.favorites.favoritesStatus;

export const getFavorites = (state: RootState): OfferPreview[] => state.favorites.favorites;

export const getFavoritesByCity = createSelector([getFavorites], (favorites) =>
  Object.groupBy(favorites, (offer) => offer.city.name)
);

export const selectFavoritesStatus = createSelector([getFavoritesStatus], (status) => ({
  isLoading: isPending(status),
  isError: isFailed(status),
}));
