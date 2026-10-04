import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PlacesList from '@/components/places-list';
import Header from '@/components/header/header';
import type { Offer } from '@/mocks/offers';
import type { City } from '@/mocks/cities';

type MainPageProps = {
  cardCount: number;
  offers: Offer[];
  cities: City[];
};

function MainPage({ cardCount, offers, cities }: MainPageProps): JSX.Element {
  const [activeCity, setActiveCity] = useState('Amsterdam');
  const [activeOfferId, setActiveOfferId] = useState<number | null>(null);

  const cityOffers = offers.filter((offer) => offer.city === activeCity).slice(0, cardCount);

  const handleCardMouseEnter = (id: number) => {
    setActiveOfferId(id);
  };

  const handleCardMouseLeave = () => {
    setActiveOfferId(null);
  };

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>

      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {cities.map((city) => (
                <li className="locations__item" key={city.name}>
                  <a
                    className={`locations__item-link tabs__item${
                      city.name === activeCity ? ' tabs__item--active' : ''
                    }`}
                    href="#"
                    onClick={(evt) => {
                      evt.preventDefault();
                      setActiveCity(city.name);
                      setActiveOfferId(null);
                    }}
                  >
                    <span>{city.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {cityOffers.length} places to stay in {activeCity}
              </b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>
                    Popular
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: low to high
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: high to low
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Top rated first
                  </li>
                </ul>
              </form>

              <PlacesList
                offers={cityOffers}
                activeOfferId={activeOfferId}
                onCardMouseEnter={handleCardMouseEnter}
                onCardMouseLeave={handleCardMouseLeave}
              />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map"></section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
