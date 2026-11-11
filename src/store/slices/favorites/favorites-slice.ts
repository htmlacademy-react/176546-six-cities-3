import { createSlice } from '@reduxjs/toolkit';
import { changeFavoriteAction } from '@/store/slices/offers/offers-api-actions';
import { fetchFavoritesAction } from '@/store/slices/favorites/favorites-api-actions';
import { RequestStatus } from '@/store/types';
import type { FavoritesState } from '@/store/types';

const initialState: FavoritesState = {
  favorites: [],
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
        state.favoritesStatus = RequestStatus.Success;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.favorites = [];
        state.favoritesStatus = RequestStatus.Failed;
      })
      .addCase(changeFavoriteAction.fulfilled, (state, action) => {
        if (!action.payload.isFavorite) {
          state.favorites = state.favorites.filter(
            (offer) => offer.id !== action.payload.offerId
          );
        }
      });
  },
});
