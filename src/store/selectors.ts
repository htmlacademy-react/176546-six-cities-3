import { createSelector } from '@reduxjs/toolkit';
import type { SortType } from '@/const';
import type { RootState } from '@/store';
import type { CityName } from '@/types/city';
import type { OfferDetails, OfferPreview } from '@/types/offer';
import type { Review } from '@/types/review';
import { sortOffers } from '@/utils';
import { RequestStatus } from '@/store/reducer.ts';

export const getCity = (state: RootState): CityName => state.city;

export const getSortType = (state: RootState): SortType => state.sortType;

export const getOffers = (state: RootState): OfferPreview[] => state.offers;

export const getOffer = (state: RootState): OfferDetails | null => state.offer;

export const getComments = (state: RootState): Review[] => state.comments;

export const getIsOfferLoading = (state: RootState): boolean => state.isOfferLoading;

export const getIsOffersLoading = (state: RootState): boolean => state.isOffersLoading;

export const getOffersStatus = (state: RootState): RequestStatus => state.offersStatus;

export const getOffersByCity = createSelector([getCity, getOffers], (city, offers) =>
  offers.filter((offer) => offer.city.name === city)
);

export const getSortedOffers = createSelector([getOffersByCity, getSortType], (offers, sortType) =>
  sortOffers(offers, sortType)
);

export const selectOffersStatus = createSelector([getOffersStatus], (status) => ({
  isLoading: status === RequestStatus.Idle || status === RequestStatus.Loading,
  isSuccess: status === RequestStatus.Success || RequestStatus.Failed,
}));
