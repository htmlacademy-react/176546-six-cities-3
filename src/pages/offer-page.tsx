import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import Header from '@/components/header/header';
import Review from '@/components/review';
import PlacesList from '@/components/places-list';
import NotFoundPage from '@/pages/not-found-page/not-found-page';
import { getReviewsByOfferId } from '@/utils';
import type { OfferMaximum } from '@/types/offer.ts';
import type { ReviewMock } from '@/mocks/reviews.ts';

type OfferPageProps = {
  offers: OfferMaximum[];
  reviews: ReviewMock[];
};

function OfferPage({ offers, reviews }: OfferPageProps): JSX.Element {
  const { id } = useParams();
  const offerId = id ?? '';

  const offer = offers.find((item) => item.id === offerId);

  if (!offer) {
    return <NotFoundPage />;
  }

  const offerReviews = getReviewsByOfferId(offer.id, reviews);

  const nearOffers = offers
    .filter((item) => item.id !== offer.id && item.city.name === offer.city.name)
    .slice(0, 3);

  return (
    <div className="page">
      <Helmet>
        <title>6 cities: {offer.title}</title>
      </Helmet>

      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offer.images.map((image) => (
                <div className="offer__image-wrapper" key={image}>
                  <img className="offer__image" src={image} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>

          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}

              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offer.title}</h1>
                <button
                  className={`offer__bookmark-button button${
                    offer.isFavorite ? ' offer__bookmark-button--active' : ''
                  }`}
                  type="button"
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">
                    {offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
                  </span>
                </button>
              </div>

              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${(offer.rating / 5) * 100}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>

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

              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div
                    className={`offer__avatar-wrapper user__avatar-wrapper${
                      offer.host.isPro ? ' offer__avatar-wrapper--pro' : ''
                    }`}
                  >
                    <img
                      className="offer__avatar user__avatar"
                      src={offer.host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{offer.host.name}</span>
                  {offer.host.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{offer.description}</p>
                </div>
              </div>

              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews &middot; <span className="reviews__amount">{offerReviews.length}</span>
                </h2>
                <ul className="reviews__list">
                  {offerReviews.map((review) => (
                    <Review key={review.id} review={review} />
                  ))}
                </ul>

                <form className="reviews__form form" action="#" method="post"></form>
              </section>
            </div>
          </div>

          <section className="offer__map map"></section>
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <PlacesList offers={nearOffers} variant="near-places" />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
