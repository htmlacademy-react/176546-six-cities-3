import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import RatingInput from '@/components/review-form/rating-input';
import {
  EMPTY_REVIEW,
  MAX_COMMENT_LENGTH,
  MIN_COMMENT_LENGTH,
} from '@/components/review-form/const';
import type { ReviewFormData } from '@/components/review-form/const';
import { useAppDispatch, useAppSelector } from '@/hooks';
import {
  fetchCommentsAction,
  getCommentError,
  postCommentAction,
  selectCommentStatus,
} from '@/store/slices/offer-page';

type ReviewFormProps = {
  offerId: string;
};

function ReviewForm({ offerId }: ReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { isSending, isError } = useAppSelector(selectCommentStatus);
  const commentError = useAppSelector(getCommentError);
  const [reviewData, setReviewData] = useState<ReviewFormData>(EMPTY_REVIEW);

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
      .then(() => {
        setReviewData(EMPTY_REVIEW);
        void dispatch(fetchCommentsAction(offerId));
      })
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
      <RatingInput rating={reviewData.rating} onChange={handleChange} disabled={isSending} />
      <textarea
        className="reviews__textarea form__textarea"
        id="comment"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={reviewData.comment}
        onChange={handleChange}
        maxLength={MAX_COMMENT_LENGTH}
        disabled={isSending}
      />
      {isError && (
        <p className="reviews__help" role="alert" style={{ color: '#d14343' }}>
          {commentError}
        </p>
      )}
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay with at least{' '}
          <b className="reviews__text-amount">{MIN_COMMENT_LENGTH} characters</b>.
        </p>
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
