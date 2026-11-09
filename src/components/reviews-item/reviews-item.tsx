import type { Review as ReviewType } from '@/types/review';
import RatingStars from '@/components/rating-stars/rating-stars';
import { formatReviewDate } from '@/utils';

type ReviewProps = {
  review: ReviewType;
};

function ReviewsItem({ review }: ReviewProps): JSX.Element {
  const { user, rating, comment, date } = review;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div
          className={`reviews__avatar-wrapper user__avatar-wrapper${
            user.isPro ? ' reviews__avatar-wrapper--pro' : ''
          }`}
        >
          <img
            className="reviews__avatar user__avatar"
            src={user.avatarUrl}
            width="54"
            height="54"
            alt={`${user.name} avatar`}
          />
        </div>
        <span className="reviews__user-name">{user.name}</span>
        {user.isPro && <span className="reviews__user-status">Pro</span>}
      </div>
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
