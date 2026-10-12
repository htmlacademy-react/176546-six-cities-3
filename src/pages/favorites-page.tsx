import Logo from '@/components/logo/logo.tsx';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/header/header.tsx';
import PlaceCard from '@/components/place-card/place-card';
import type { OfferPreview } from '@/types/offer.ts';

type FavoritesPageProps = {
  offers: OfferPreview[];
};

function FavoritesPage({ offers }: FavoritesPageProps): JSX.Element {
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);
  const offersByCity = Object.groupBy(favoriteOffers, (offer) => offer.city.name);

  return (
    <div className="page">
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>

      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.entries(offersByCity).map(([city, cityOffers = []]) => (
                <li className="favorites__locations-items" key={city}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{city}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {cityOffers.map((offer) => (
                      <PlaceCard key={offer.id} offer={offer} variant="favorites" />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Logo type="footer" />
      </footer>
    </div>
  );
}

export default FavoritesPage;
