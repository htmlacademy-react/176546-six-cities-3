import { Fragment, useState } from 'react';
import type { ChangeEvent } from 'react';

const RATING_OPTIONS = [
  { value: 5, id: '5-stars', title: 'perfect' },
  { value: 4, id: '4-stars', title: 'good' },
  { value: 3, id: '3-stars', title: 'not bad' },
  { value: 2, id: '2-stars', title: 'badly' },
  { value: 1, id: '1-star', title: 'terribly' },
];

type ReviewFormData = {
  rating: number;
  comment: string;
};

function ReviewForm(): JSX.Element {
  const [reviewData, setReviewData] = useState<ReviewFormData>({ rating: 0, comment: '' });

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    setReviewData({ ...reviewData, rating: Number(evt.target.value) });
  };

  const handleCommentChange = (evt: ChangeEvent<HTMLTextAreaElement>): void => {
    setReviewData({ ...reviewData, comment: evt.target.value });
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {RATING_OPTIONS.map(({ value, id, title }) => (
          <Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={id}
              type="radio"
              checked={reviewData.rating === value}
              onChange={handleRatingChange}
            />
            <label htmlFor={id} className="reviews__rating-label form__rating-label" title={title}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={reviewData.comment}
        onChange={handleCommentChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled>
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
