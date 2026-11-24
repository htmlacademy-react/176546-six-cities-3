import { useCallback, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate, useParams } from 'react-router-dom';
import { AppRoute } from '@/const';
import Header from '@/components/header/header';
import PremiumBadge from '@/components/premium-badge';
import BookmarkButton from '@/components/bookmark-button';
import RatingStars from '@/components/rating-stars/rating-stars';
import OfferInfo from '@/components/offer-info/offer-info';
import OfferHost from '@/components/offer-host';
import OfferGallery from '@/components/offer-gallery';
import OfferReviews from '@/components/offer-reviews';
import NearPlaces from '@/components/near-places';
import Spinner from '@/components/spinner/spinner';
import ErrorMessage from '@/components/error-message/error-message';
import { useAppDispatch, useAppSelector } from '@/hooks';
import {
  fetchCommentsAction,
  fetchNearbyAction,
  fetchOfferAction,
  getNearbyOffers,
  getOffer,
  isOfferNotFound,
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
  const { isLoading: isOfferLoading, isError: isOfferError } = useAppSelector(selectOfferStatus);
  const offerNotFound = useAppSelector(isOfferNotFound);

  const loadOffer = useCallback(() => {
    if (!offerId) {
      return;
    }

    void dispatch(fetchOfferAction(offerId));
    void dispatch(fetchNearbyAction(offerId));
    void dispatch(fetchCommentsAction(offerId));
  }, [dispatch, offerId]);

  useEffect(() => {
    loadOffer();
  }, [loadOffer]);

  const visibleNearOffers = useMemo(() => nearOffers.slice(0, NEAR_OFFERS), [nearOffers]);

  const mapOffers = useMemo(
    () => (offer ? [offer, ...visibleNearOffers] : []),
    [offer, visibleNearOffers]
  );

  if (isOfferLoading || (isOfferError && !offerNotFound)) {
    return (
      <div className="page">
        <Header />
        <main className="page__main page__main--offer">
          {isOfferLoading ? (
            <Spinner label="Loading the offer" />
          ) : (
            <ErrorMessage title="Could not load the offer" onRetry={loadOffer} />
          )}
        </main>
      </div>
    );
  }

  if (offerNotFound || !offer || offer.id !== offerId) {
    return <Navigate to={AppRoute.NotFound} replace />;
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
                <BookmarkButton offerId={offer.id} variant="offer" />
              </div>

              <RatingStars rating={offer.rating} variant="offer" />

              <OfferInfo offer={offer} />

              <OfferHost host={offer.host} description={offer.description} />

              <OfferReviews offerId={offerId} />
            </div>
          </div>

          <Map
            className="offer__map"
            city={offer.location}
            offers={mapOffers}
            selectedPointId={offer.id}
          />
        </section>

        <NearPlaces offers={visibleNearOffers} />
      </main>
    </div>
  );
}

export default OfferPage;
