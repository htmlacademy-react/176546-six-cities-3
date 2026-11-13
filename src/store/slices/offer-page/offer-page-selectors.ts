import { createSelector } from '@reduxjs/toolkit';
import { isFailed, isInFlight, isPending } from '@/store/request-status';
import { getOffersById, getOffersDetails } from '@/store/slices/entities/offers';
import { RequestStatus } from '@/store/types';
import type { RootState } from '@/store';
import type { OfferDetails, OfferPreview } from '@/types/offer';
import type { Review } from '@/types/review';

const getCurrentId = (state: RootState): string | null => state.offerPage.currentId;

const getNearbyIds = (state: RootState): string[] => state.offerPage.nearbyIds;

const getOfferStatus = (state: RootState): RequestStatus => state.offerPage.offerStatus;

const getCommentStatus = (state: RootState): RequestStatus => state.offerPage.commentStatus;

export const getOffer = createSelector(
  [getCurrentId, getOffersDetails],
  (currentId, details): OfferDetails | null => (currentId ? details[currentId] ?? null : null)
);

export const getNearbyOffers = createSelector([getNearbyIds, getOffersById], (ids, byId) =>
  ids
    .map((id) => byId[id])
    .filter((offer): offer is OfferPreview => Boolean(offer))
);

export const getComments = (state: RootState): Review[] => state.offerPage.comments;

export const isOfferNotFound = (state: RootState): boolean => state.offerPage.isNotFound;

export const getCommentError = (state: RootState): string => state.offerPage.commentError;

export const selectCommentStatus = createSelector([getCommentStatus], (status) => ({
  isSending: isInFlight(status),
  isError: isFailed(status),
}));

export const selectOfferStatus = createSelector([getOfferStatus], (status) => ({
  isLoading: isPending(status),
  isError: isFailed(status),
}));
