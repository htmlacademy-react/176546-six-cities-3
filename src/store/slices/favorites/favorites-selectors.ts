import { createSelector } from '@reduxjs/toolkit';
import { isFailed, isPending } from '@/store/request-status';
import { RequestStatus } from '@/store/types';
import type { RootState } from '@/store';
import type { OfferPreview } from '@/types/offer';

const getFavoritesStatus = (state: RootState): RequestStatus => state.favorites.favoritesStatus;

export const getFavorites = (state: RootState): OfferPreview[] => state.favorites.favorites;

export const getFavoritesIds = (state: RootState): string[] => state.favorites.favoriteIds;

const getPendingIds = (state: RootState): string[] => state.favorites.pendingIds;

export const getFavoritesByCity = createSelector([getFavorites], (favorites) =>
  Object.groupBy(favorites, (offer) => offer.city.name)
);

export const selectFavoritesStatus = createSelector([getFavoritesStatus], (status) => ({
  isLoading: isPending(status),
  isError: isFailed(status),
}));

export const selectFavoritesIds = createSelector([getFavoritesIds], (ids) => new Set(ids));

export const selectFavoritesCount = createSelector([getFavoritesIds], (ids) => ids.length);

export const selectPendingIds = createSelector([getPendingIds], (ids) => new Set(ids));
