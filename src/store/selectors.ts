import { createSelector } from '@reduxjs/toolkit';
import type { AuthorizationStatus, SortType } from '@/const';
import type { RootState } from '@/store';
import type { CityName } from '@/types/city';
import type { OfferDetails, OfferPreview } from '@/types/offer';
import type { Review } from '@/types/review';
import { sortOffers } from '@/utils';
import { RequestStatus } from '@/store/reducer';

export const getAuthorizationStatus = (state: RootState): AuthorizationStatus =>
  state.authorizationStatus;

export const getCity = (state: RootState): CityName => state.city;

export const getSortType = (state: RootState): SortType => state.sortType;

export const getOffers = (state: RootState): OfferPreview[] => state.offers;

export const getOffer = (state: RootState): OfferDetails | null => state.offer;

export const getComments = (state: RootState): Review[] => state.comments;

export const getOffersStatus = (state: RootState): RequestStatus => state.offersStatus;

export const getOfferStatus = (state: RootState): RequestStatus => state.offerStatus;

export const getOffersByCity = createSelector([getCity, getOffers], (city, offers) =>
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

export const selectOfferStatus = createSelector([getOfferStatus], (status) => ({
  isLoading: status === RequestStatus.Idle || status === RequestStatus.Loading,
  isSuccess: status === RequestStatus.Success,
  isError: status === RequestStatus.Failed,
}));
