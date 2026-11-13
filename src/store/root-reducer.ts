import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from '@/store/slices/auth';
import { offersEntitiesSlice } from '@/store/slices/entities/offers';
import { favoritesSlice } from '@/store/slices/favorites';
import { notificationsSlice } from '@/store/slices/notifications';
import { offerPageSlice } from '@/store/slices/offer-page';
import { offersSlice } from '@/store/slices/offers';

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  entities: offersEntitiesSlice.reducer,
  offers: offersSlice.reducer,
  offerPage: offerPageSlice.reducer,
  favorites: favoritesSlice.reducer,
  notifications: notificationsSlice.reducer,
});
