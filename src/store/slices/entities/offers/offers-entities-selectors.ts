import type { RootState } from '@/store';
import type { OfferDetails, OfferPreview } from '@/types/offer';

export const getOffersById = (state: RootState): Record<string, OfferPreview> =>
  state.entities.byId;

export const getOffersDetails = (state: RootState): Record<string, OfferDetails> =>
  state.entities.details;
