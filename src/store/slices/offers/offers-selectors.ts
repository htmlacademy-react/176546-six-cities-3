import { createSelector } from '@reduxjs/toolkit';
import type { SortType } from '@/const';
import { isFailed, isPending } from '@/store/request-status';
import { getOffersById } from '@/store/slices/entities/offers';
import { RequestStatus } from '@/store/types';
import type { RootState } from '@/store';
import type { CityName } from '@/types/city';
import type { OfferPreview } from '@/types/offer';
import { sortOffers } from '@/utils';

export const getCity = (state: RootState): CityName => state.offers.city;

export const getSortType = (state: RootState): SortType => state.offers.sortType;

const getIds = (state: RootState): string[] => state.offers.ids;

const getOffersStatus = (state: RootState): RequestStatus => state.offers.offersStatus;

const getOffers = createSelector([getIds, getOffersById], (ids, byId) =>
  ids
    .map((id) => byId[id])
    .filter((offer): offer is OfferPreview => Boolean(offer))
);

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
