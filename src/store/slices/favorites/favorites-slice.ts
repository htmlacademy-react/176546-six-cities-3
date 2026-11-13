import { createSlice } from '@reduxjs/toolkit';
import { logoutAction } from '@/store/slices/auth';
import { changeFavoriteAction, fetchFavoritesAction } from '@/store/slices/entities/offers';
import { RequestStatus } from '@/store/types';

export type FavoritesState = {
  favoriteIds: string[];
  pendingIds: string[];
  favoritesStatus: RequestStatus;
};

const initialState: FavoritesState = {
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
        state.favoriteIds = action.payload.map((offer) => offer.id);
        state.favoritesStatus = RequestStatus.Success;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.favoriteIds = [];
        state.favoritesStatus = RequestStatus.Failed;
      })
      .addCase(changeFavoriteAction.pending, (state, action) => {
        state.pendingIds.push(action.meta.arg.offerId);
      })
      .addCase(changeFavoriteAction.fulfilled, (state, action) => {
        const { offerId, isFavorite } = action.payload;

        state.pendingIds = state.pendingIds.filter((id) => id !== offerId);

        if (!isFavorite) {
          state.favoriteIds = state.favoriteIds.filter((id) => id !== offerId);

          return;
        }

        if (!state.favoriteIds.includes(offerId)) {
          state.favoriteIds.push(offerId);
        }
      })
      .addCase(changeFavoriteAction.rejected, (state, action) => {
        state.pendingIds = state.pendingIds.filter((id) => id !== action.meta.arg.offerId);
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.favoriteIds = [];
        state.pendingIds = [];
        state.favoritesStatus = RequestStatus.Idle;
      });
  },
});
