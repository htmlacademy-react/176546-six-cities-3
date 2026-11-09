import type { Review as ReviewType } from '@/types/review';
import RatingStars from '@/components/rating-stars/rating-stars';
import UserBadge from '@/components/user-badge/user-badge';
import { formatReviewDate } from '@/utils';

type ReviewProps = {
  review: ReviewType;
};

function ReviewsItem({ review }: ReviewProps): JSX.Element {
  const { user, rating, comment, date } = review;

  return (
    <li className="reviews__item">
      <UserBadge user={user} variant="reviews" />
      <div className="reviews__info">
        <RatingStars rating={rating} variant="reviews" />
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={date}>
          {formatReviewDate(date)}
        </time>
      </div>
    </li>
  );
}

export default ReviewsItem;
