import type { Review as ReviewType } from '@/types/review.ts';
import { MONTHS } from '@/const.ts';

type ReviewProps = {
  review: ReviewType;
};

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

function Review({ review }: ReviewProps): JSX.Element {
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
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${(rating / 5) * 100}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={date}>
          {formatDate(date)}
        </time>
      </div>
    </li>
  );
}

export default Review;
