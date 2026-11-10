import { useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import Header from '@/components/header/header';
import PremiumBadge from '@/components/premium-badge';
import BookmarkButton from '@/components/bookmark-button';
import RatingStars from '@/components/rating-stars/rating-stars';
import ReviewsList from '@/components/reviews-list/reviews-list';
import ReviewForm from '@/components/review-form';
import OfferHost from '@/components/offer-host';
import OfferGallery from '@/components/offer-gallery';
import PlacesList from '@/components/places-list';
import NotFoundPage from '@/pages/not-found-page/not-found-page';
import { useAppDispatch, useAppSelector } from '@/hooks';
import {
  fetchCommentsAction,
  fetchNearbyAction,
  fetchOfferAction,
  getComments,
  getNearbyOffers,
  getOffer,
  selectOfferStatus,
} from '@/store/slices/offer';
import Map from '@/components/map/map.tsx';

const NEAR_OFFERS = 3;

function OfferPage(): JSX.Element {
  const { id } = useParams();
  const offerId = id ?? '';
  const dispatch = useAppDispatch();
  const offer = useAppSelector(getOffer);
  const nearOffers = useAppSelector(getNearbyOffers);
  const offerReviews = useAppSelector(getComments);
  const { isLoading: isOfferLoading } = useAppSelector(selectOfferStatus);

  useEffect(() => {
    if (!offerId) {
      return;
    }

    dispatch(fetchOfferAction(offerId));
    dispatch(fetchNearbyAction(offerId));
    dispatch(fetchCommentsAction(offerId));
  }, [dispatch, offerId]);

  const mapOffers = useMemo(
    () => (offer ? [offer, ...nearOffers.slice(0, NEAR_OFFERS)] : []),
    [offer, nearOffers]
  );

  if (isOfferLoading) {
    return <div className="page">Loading&hellip;</div>;
  }

  if (!offer || offer.id !== offerId) {
    return <NotFoundPage />;
  }

  return (
    <div className="page">
      <Helmet>
        <title>6 cities: {offer.title}</title>
      </Helmet>

      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferGallery images={offer.images} />

          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && <PremiumBadge text="Premium" variant="offer" />}

              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offer.title}</h1>
                <BookmarkButton isFavorite={offer.isFavorite} variant="offer" />
              </div>

              <RatingStars rating={offer.rating} variant="offer" />

              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{offer.type}</li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults} adults
                </li>
              </ul>

              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>

              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offer.goods.map((good) => (
                    <li className="offer__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>

              <OfferHost host={offer.host} description={offer.description} />

              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews &middot; <span className="reviews__amount">{offerReviews.length}</span>
                </h2>
                <ReviewsList reviews={offerReviews} />

                <ReviewForm />
              </section>
            </div>
          </div>

          <Map
            className="offer__map"
            city={offer.location}
            offers={mapOffers}
            selectedPointId={offer.id}
          />
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <PlacesList offers={nearOffers.slice(0, NEAR_OFFERS)} variant="near-places" />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
