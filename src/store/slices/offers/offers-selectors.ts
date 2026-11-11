import { createSelector } from '@reduxjs/toolkit';
import type { SortType } from '@/const';
import type { RootState } from '@/store';
import { RequestStatus } from '@/store/types';
import type { CityName } from '@/types/city';
import type { OfferPreview } from '@/types/offer';
import { sortOffers } from '@/utils';

export const getCity = (state: RootState): CityName => state.offers.city;

export const getSortType = (state: RootState): SortType => state.offers.sortType;

const getOffers = (state: RootState): OfferPreview[] => state.offers.offers;

const getOffersStatus = (state: RootState): RequestStatus => state.offers.offersStatus;

export const getFavoriteCount = createSelector([getOffers], (offers) =>
  offers.filter((offer) => offer.isFavorite).length
);

const getOffersByCity = createSelector([getCity, getOffers], (city, offers) =>
  offers.filter((offer) => offer.city.name === city)
);

export const getSortedOffers = createSelector([getOffersByCity, getSortType], (offers, sortType) =>
  sortOffers(offers, sortType)
);

export const selectOffersStatus = createSelector([getOffersStatus], (status) => ({
  isLoading: status === RequestStatus.Idle || status === RequestStatus.Loading,
  isSuccess: status === RequestStatus.Success,
  isError: status === RequestStatus.Failed,
}));
