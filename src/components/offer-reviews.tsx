import ReviewsList from '@/components/reviews-list/reviews-list';
import ReviewForm from '@/components/review-form/review-form';
import { useAppSelector } from '@/hooks';
import { selectAuthState } from '@/store/slices/auth';
import { getComments } from '@/store/slices/offer';

type OfferReviewsProps = {
  offerId: string;
};

function OfferReviews({ offerId }: OfferReviewsProps): JSX.Element {
  const reviews = useAppSelector(getComments);
  const { isAuthenticated } = useAppSelector(selectAuthState);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ReviewsList reviews={reviews} />

      {isAuthenticated && <ReviewForm offerId={offerId} />}
    </section>
  );
}

export default OfferReviews;
