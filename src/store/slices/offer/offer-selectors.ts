import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { RequestStatus } from '@/store/types';
import type { OfferDetails, OfferPreview } from '@/types/offer';
import type { Review } from '@/types/review';

export const getOffer = (state: RootState): OfferDetails | null => state.offer.offer;

export const getNearbyOffers = (state: RootState): OfferPreview[] => state.offer.nearby;

export const isOfferNotFound = (state: RootState): boolean => state.offer.isNotFound;

export const getComments = (state: RootState): Review[] => state.offer.comments;

export const getOfferStatus = (state: RootState): RequestStatus => state.offer.offerStatus;

export const getCommentStatus = (state: RootState): RequestStatus => state.offer.commentStatus;

export const getCommentError = (state: RootState): string => state.offer.commentError;

export const selectCommentStatus = createSelector([getCommentStatus], (status) => ({
  isSending: status === RequestStatus.Loading,
  isError: status === RequestStatus.Failed,
}));

export const selectOfferStatus = createSelector([getOfferStatus], (status) => ({
  isLoading: status === RequestStatus.Idle || status === RequestStatus.Loading,
  isSuccess: status === RequestStatus.Success,
  isError: status === RequestStatus.Failed,
}));
