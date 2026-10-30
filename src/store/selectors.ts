import { createSelector } from '@reduxjs/toolkit';
import type { SortType } from '@/const';
import type { RootState } from '@/store';
import type { CityName } from '@/types/city';
import type { OfferPreview } from '@/types/offer';
import { sortOffers } from '@/utils';

export const getCity = (state: RootState): CityName => state.city;

export const getSortType = (state: RootState): SortType => state.sortType;

export const getOffers = (state: RootState): OfferPreview[] => state.offers;

export const getOffersByCity = createSelector([getCity, getOffers], (city, offers) =>
  offers.filter((offer) => offer.city.name === city)
);

export const getSortedOffers = createSelector([getOffersByCity, getSortType], (offers, sortType) =>
  sortOffers(offers, sortType)
);
