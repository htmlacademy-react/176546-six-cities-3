import type { Review } from './mocks/reviews';

export const getReviewsByOfferId = (offerId: number, reviews: Review[]): Review[] =>
  reviews.filter((review) => review.offerId === offerId);
