export type RatingVariant = 'place-card' | 'reviews' | 'offer';

export const RATING_CLASSES = {
  'place-card': {
    wrapper: 'place-card__rating',
    stars: 'place-card__stars',
  },
  reviews: {
    wrapper: 'reviews__rating',
    stars: 'reviews__stars',
  },
  offer: {
    wrapper: 'offer__rating',
    stars: 'offer__stars',
  },
} as const;
