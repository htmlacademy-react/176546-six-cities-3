import { Fragment, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getCommentError, postCommentAction, selectCommentStatus } from '@/store/slices/offer';

const RATING_OPTIONS = [
  { value: 5, id: '5-stars', title: 'perfect' },
  { value: 4, id: '4-stars', title: 'good' },
  { value: 3, id: '3-stars', title: 'not bad' },
  { value: 2, id: '2-stars', title: 'badly' },
  { value: 1, id: '1-star', title: 'terribly' },
];

const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 300;

type ReviewFormData = {
  rating: number;
  comment: string;
};

type ReviewFormProps = {
  offerId: string;
};

function ReviewForm({ offerId }: ReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { isSending, isError } = useAppSelector(selectCommentStatus);
  const commentError = useAppSelector(getCommentError);
  const [reviewData, setReviewData] = useState<ReviewFormData>({ rating: 0, comment: '' });

  const handleChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = evt.target;

    if (name === 'rating') {
      setReviewData((prev) => ({ ...prev, rating: Number(value) }));
      return;
    }

    setReviewData((prev) => ({ ...prev, comment: value }));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    void dispatch(
      postCommentAction({ offerId, rating: reviewData.rating, comment: reviewData.comment })
    )
      .unwrap()
      .then(() => setReviewData({ rating: 0, comment: '' }))
      .catch(() => undefined);
  };

  const isSubmitDisabled =
    isSending ||
    reviewData.rating === 0 ||
    reviewData.comment.trim().length < MIN_COMMENT_LENGTH ||
    reviewData.comment.length > MAX_COMMENT_LENGTH;

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
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
              onChange={handleChange}
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
        id="comment"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={reviewData.comment}
        onChange={handleChange}
        maxLength={MAX_COMMENT_LENGTH}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span>
          and describe your stay with at least
          <b className="reviews__text-amount">{MIN_COMMENT_LENGTH} characters</b>.
        </p>
        {isError && <p className="reviews__help">{commentError}</p>}
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitDisabled}
        >
          {isSending ? 'Sending…' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
