import { Fragment } from 'react';
import type { ChangeEvent } from 'react';
import { RATING_OPTIONS } from '@/components/review-form/const';

type RatingInputProps = {
  rating: number;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
};

function RatingInput({ rating, onChange }: RatingInputProps): JSX.Element {
  return (
    <div className="reviews__rating-form form__rating">
      {RATING_OPTIONS.map(({ value, id, title }) => (
        <Fragment key={value}>
          <input
            className="form__rating-input visually-hidden"
            name="rating"
            value={value}
            id={id}
            type="radio"
            checked={rating === value}
            onChange={onChange}
          />
          <label htmlFor={id} className="reviews__rating-label form__rating-label" title={title}>
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>
        </Fragment>
      ))}
    </div>
  );
}

export default RatingInput;
