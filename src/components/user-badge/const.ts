export type UserBadgeVariant = 'offer' | 'reviews';

export const USER_BADGE_CLASSES = {
  offer: {
    container: 'offer__host-user user',
    wrapper: 'offer__avatar-wrapper user__avatar-wrapper',
    wrapperPro: 'offer__avatar-wrapper--pro',
    image: 'offer__avatar user__avatar',
    name: 'offer__user-name',
    status: 'offer__user-status',
    size: 74,
  },
  reviews: {
    container: 'reviews__user user',
    wrapper: 'reviews__avatar-wrapper user__avatar-wrapper',
    wrapperPro: 'reviews__avatar-wrapper--pro',
    image: 'reviews__avatar user__avatar',
    name: 'reviews__user-name',
    status: 'reviews__user-status',
    size: 54,
  },
} as const;
