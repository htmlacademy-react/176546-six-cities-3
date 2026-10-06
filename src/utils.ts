import type { ReviewMock } from '@/mocks/reviews.ts';

export const getReviewsByOfferId = (offerId: string, reviews: ReviewMock[]): ReviewMock[] =>
  reviews.filter((review) => review.offerId === offerId);
