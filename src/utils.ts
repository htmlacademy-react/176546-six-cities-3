import type { AxiosError } from 'axios';
import type { OfferPreview } from '@/types/offer';
import { MAX_RATING, SORT_OPTIONS } from '@/const';
import type { SortType } from '@/const';

export const getRatingWidth = (rating: number): string => `${(rating / MAX_RATING) * 100}%`;

export const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

const reviewDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
});

export const formatReviewDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return Number.isNaN(date.getTime()) ? '' : reviewDateFormatter.format(date);
};

type ApiErrorBody = {
  message?: string;
  details?: { messages?: string[] }[];
};

export const getApiErrorMessage = (
  error: unknown,
  fallback = 'Something went wrong. Please try again.'
): string => {
  const { response } = error as AxiosError<ApiErrorBody>;
  const detailMessage = response?.data?.details?.flatMap((detail) => detail.messages ?? [])[0];

  return detailMessage ?? response?.data?.message ?? fallback;
};

export const sortOffers = (offers: OfferPreview[], sortType: SortType): OfferPreview[] => {
  switch (sortType) {
    case SORT_OPTIONS.Popular:
      return offers;
    case SORT_OPTIONS.PriceAsc:
      return [...offers].sort((first, second) => first.price - second.price);
    case SORT_OPTIONS.PriceDesc:
      return [...offers].sort((first, second) => second.price - first.price);
    case SORT_OPTIONS.TopRated:
      return [...offers].sort((first, second) => second.rating - first.rating);
    default: {
      const unhandled: never = sortType;
      throw new Error(`Unhandled sort type: ${String(unhandled)}`);
    }
  }
};
