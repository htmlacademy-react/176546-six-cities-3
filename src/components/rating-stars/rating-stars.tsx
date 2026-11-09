import clsx from 'clsx';
import { getRatingWidth } from '@/utils';
import { RATING_CLASSES } from '@/components/rating-stars/const';
import type { RatingVariant } from '@/components/rating-stars/const';

type RatingStarsProps = {
  rating: number;
  variant: RatingVariant;
};

function RatingStars({ rating, variant }: RatingStarsProps): JSX.Element {
  const classes = RATING_CLASSES[variant];

  return (
    <div className={clsx(classes.wrapper, 'rating')}>
      <div className={clsx(classes.stars, 'rating__stars')}>
        <span style={{ width: getRatingWidth(rating) }}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      {variant === 'offer' && <span className="offer__rating-value rating__value">{rating}</span>}
    </div>
  );
}

export default RatingStars;
