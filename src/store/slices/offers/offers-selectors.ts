import { createSelector } from '@reduxjs/toolkit';
import type { SortType } from '@/const';
import type { RootState } from '@/store';
import { RequestStatus } from '@/store/types';
import { isFailed, isPending } from '@/store/request-status';
import type { CityName } from '@/types/city';
import type { OfferPreview } from '@/types/offer';
import { sortOffers } from '@/utils';

export const getCity = (state: RootState): CityName => state.offers.city;

export const getSortType = (state: RootState): SortType => state.offers.sortType;

const getOffers = (state: RootState): OfferPreview[] => state.offers.offers;

const getOffersStatus = (state: RootState): RequestStatus => state.offers.offersStatus;

const getOffersByCity = createSelector([getCity, getOffers], (city, offers) =>
  offers.filter((offer) => offer.city.name === city)
);

export const getSortedOffers = createSelector([getOffersByCity, getSortType], (offers, sortType) =>
  sortOffers(offers, sortType)
);

export const selectOffersStatus = createSelector([getOffersStatus], (status) => ({
  isLoading: isPending(status),
  isError: isFailed(status),
}));
