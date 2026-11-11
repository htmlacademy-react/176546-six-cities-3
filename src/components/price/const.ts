const NBSP = '\u00a0';

export const PRICE_VARIANTS = {
  'place-card': {
    wrapper: 'place-card__price',
    value: 'place-card__price-value',
    text: 'place-card__price-text',
    suffix: `/${NBSP}night`,
  },
  offer: {
    wrapper: 'offer__price',
    value: 'offer__price-value',
    text: 'offer__price-text',
    suffix: `${NBSP}night`,
  },
} as const;

export type PriceVariant = keyof typeof PRICE_VARIANTS;
