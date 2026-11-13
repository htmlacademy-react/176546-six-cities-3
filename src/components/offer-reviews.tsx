import { useMemo } from 'react';
import ReviewsList from '@/components/reviews-list/reviews-list';
import ReviewForm from '@/components/review-form/review-form';
import { useAppSelector } from '@/hooks';
import { selectAuthState } from '@/store/slices/auth';
import { getComments } from '@/store/slices/offer-page';

const MAX_REVIEWS = 10;

type OfferReviewsProps = {
  offerId: string;
};

function OfferReviews({ offerId }: OfferReviewsProps): JSX.Element {
  const reviews = useAppSelector(getComments);
  const { isAuthenticated } = useAppSelector(selectAuthState);

  const sortedReviews = useMemo(
    () => [...reviews].sort((a, b) => Date.parse(b.date) - Date.parse(a.date)),
    [reviews]
  );
  const visibleReviews = useMemo(() => sortedReviews.slice(0, MAX_REVIEWS), [sortedReviews]);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{sortedReviews.length}</span>
      </h2>
      <ReviewsList reviews={visibleReviews} />

      {isAuthenticated && <ReviewForm offerId={offerId} />}
    </section>
  );
}

export default OfferReviews;
