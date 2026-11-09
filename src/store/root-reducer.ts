import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from '@/store/slices/auth';
import { offerSlice } from '@/store/slices/offer';
import { offersSlice } from '@/store/slices/offers';

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  offers: offersSlice.reducer,
  offer: offerSlice.reducer,
});
