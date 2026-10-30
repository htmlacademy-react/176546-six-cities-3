import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/header/header';
import Tabs from '@/components/tabs';
import Cities from '@/components/cities';
import { CITIES } from '@/const';
import { useAppSelector } from '@/hooks';
import { getCity, getOffersByCity, getSortType } from '@/store/selectors';
import { sortOffers } from '@/utils';

function MainPage(): JSX.Element {
  const selectedCity = useAppSelector(getCity);
  const cityOffers = useAppSelector(getOffersByCity);
  const sortType = useAppSelector(getSortType);

  const activeCity = CITIES.find((city) => city.name === selectedCity) ?? CITIES[0];
  const sortedOffers = useMemo(() => sortOffers(cityOffers, sortType), [cityOffers, sortType]);

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>

      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <Tabs activeCityName={activeCity.name} />

        <Cities
          offers={sortedOffers}
          city={activeCity.location}
          cityName={activeCity.name}
        />
      </main>
    </div>
  );
}

export default MainPage;
