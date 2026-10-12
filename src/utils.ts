import type { ReviewMock } from '@/mocks/reviews.ts';
import { MAX_RATING } from '@/const.ts';

export const getReviewsByOfferId = (offerId: string, reviews: ReviewMock[]): ReviewMock[] =>
  reviews.filter((review) => review.offerId === offerId);

export const getRatingWidth = (rating: number): string => `${(rating / MAX_RATING) * 100}%`;

export const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);
