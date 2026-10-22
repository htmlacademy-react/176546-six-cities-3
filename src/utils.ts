import type { ReviewMock } from '@/mocks/reviews';
import { MAX_RATING } from '@/const';

export const getReviewsByOfferId = (offerId: string, reviews: ReviewMock[]): ReviewMock[] =>
  reviews.filter((review) => review.offerId === offerId);

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
