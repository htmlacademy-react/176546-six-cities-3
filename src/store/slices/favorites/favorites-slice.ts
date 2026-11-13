import { createSlice } from '@reduxjs/toolkit';
import { logoutAction } from '@/store/slices/auth';
import { fetchFavoritesAction } from '@/store/slices/favorites/favorites-api-actions';
import { changeFavoriteAction } from '@/store/slices/offers/offers-api-actions';
import { RequestStatus } from '@/store/types';
import type { FavoritesState } from '@/store/types';

const initialState: FavoritesState = {
  favorites: [],
  favoriteIds: [],
  pendingIds: [],
  favoritesStatus: RequestStatus.Idle,
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.favoritesStatus = RequestStatus.Loading;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.favoriteIds = action.payload.map((offer) => offer.id);
        state.favoritesStatus = RequestStatus.Success;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.favorites = [];
        state.favoriteIds = [];
        state.favoritesStatus = RequestStatus.Failed;
      })
      .addCase(changeFavoriteAction.pending, (state, action) => {
        state.pendingIds.push(action.meta.arg.offerId);
      })
      .addCase(changeFavoriteAction.fulfilled, (state, action) => {
        const { offerId, isFavorite } = action.payload;

        state.pendingIds = state.pendingIds.filter((id) => id !== offerId);

        if (isFavorite) {
          if (!state.favoriteIds.includes(offerId)) {
            state.favoriteIds.push(offerId);
          }

          return;
        }

        state.favoriteIds = state.favoriteIds.filter((id) => id !== offerId);
        state.favorites = state.favorites.filter((offer) => offer.id !== offerId);
      })
      .addCase(changeFavoriteAction.rejected, (state, action) => {
        state.pendingIds = state.pendingIds.filter((id) => id !== action.meta.arg.offerId);
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.favorites = [];
        state.favoriteIds = [];
        state.pendingIds = [];
        state.favoritesStatus = RequestStatus.Idle;
      });
  },
});
