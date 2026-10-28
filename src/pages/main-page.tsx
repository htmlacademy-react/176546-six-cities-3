import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/header/header';
import Tabs from '@/components/tabs';
import Cities from '@/components/cities';
import Sorting from '@/components/sorting';
import { CITIES } from '@/const';
import type { SortType } from '@/const';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { changeCity } from '@/store/action';
import { getCity, getOffersByCity } from '@/store/selectors';
import type { City } from '@/types/city';
import { sortOffers } from '@/utils';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector(getCity);
  const cityOffers = useAppSelector(getOffersByCity);
  const [sortType, setSortType] = useState<SortType>('Popular');

  const activeCity: City = CITIES.find((city) => city.name === selectedCity) ?? CITIES[0];
  const sortedOffers = useMemo(() => sortOffers(cityOffers, sortType), [cityOffers, sortType]);

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>

      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <Tabs
          cities={CITIES}
          activeCity={activeCity}
          onCityChange={(cityName) => dispatch(changeCity(cityName))}
        />

        <Cities
          offers={sortedOffers}
          placesCount={sortedOffers.length}
          city={activeCity.location}
          cityName={activeCity.name}
          sorting={<Sorting sortType={sortType} onSortChange={setSortType} />}
        />
      </main>
    </div>
  );
}

export default MainPage;
