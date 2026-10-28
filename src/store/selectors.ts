import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import type { CityName } from '@/types/city';
import type { OfferPreview } from '@/types/offer';

export const getCity = (state: RootState): CityName => state.city;

export const getOffers = (state: RootState): OfferPreview[] => state.offers;

export const getOffersByCity = createSelector([getCity, getOffers], (city, offers) =>
  offers.filter((offer) => offer.city.name === city)
);
