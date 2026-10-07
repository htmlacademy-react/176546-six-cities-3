export type PlaceCardVariant = 'cities' | 'near-places' | 'favorites';

export const CARD_CLASSES = {
  cities: {
    card: 'cities__card',
    imageWrapper: 'cities__image-wrapper',
    info: 'place-card__info',
  },
  'near-places': {
    card: 'near-places__card',
    imageWrapper: 'near-places__image-wrapper',
    info: 'place-card__info',
  },
  favorites: {
    card: 'favorites__card',
    imageWrapper: 'favorites__image-wrapper',
    info: 'favorites__card-info place-card__info',
  },
} as const;

export const CARD_IMAGE_SIZES = {
  cities: { width: 260, height: 200 },
  'near-places': { width: 260, height: 200 },
  favorites: { width: 150, height: 110 },
} as const;
