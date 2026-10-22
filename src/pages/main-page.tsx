import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/header/header';
import Tabs from '@/components/tabs';
import Cities from '@/components/cities';
import { CITIES } from '@/const';
import type { OfferPreview } from '@/types/offer';
import type { City } from '@/types/city';

type MainPageProps = {
  offers: OfferPreview[];
};

function MainPage({ offers }: MainPageProps): JSX.Element {
  const [activeCity, setActiveCity] = useState<City>(CITIES[0]);

  const cityOffers = useMemo(
    () => offers.filter((offer) => offer.city.name === activeCity.name),
    [offers, activeCity]
  );

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>

      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <Tabs activeCity={activeCity} onCityChange={setActiveCity} />

        <Cities
          offers={cityOffers}
          placesCount={cityOffers.length}
          city={activeCity.location}
          cityName={activeCity.name}
        />
      </main>
    </div>
  );
}

export default MainPage;
