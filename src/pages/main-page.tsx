import { Helmet } from 'react-helmet-async';
import Header from '@/components/header/header';
import Tabs from '@/components/tabs';
import Cities from '@/components/cities';
import type { OfferPreview } from '@/types/offer.ts';
import type { City } from '@/types/city.ts';
import { useState } from 'react';

type MainPageProps = {
  offers: OfferPreview[];
  cities: City[];
};

function MainPage({ offers, cities }: MainPageProps): JSX.Element {
  const [activeCity, setActiveCity] = useState<City>(cities[0]);

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>

      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <Tabs cities={cities} activeCity={activeCity} onCityChange={setActiveCity} />

        <Cities offers={offers} placesCount={offers.length} city={activeCity.location} />
      </main>
    </div>
  );
}

export default MainPage;
