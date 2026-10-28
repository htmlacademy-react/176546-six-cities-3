import { Helmet } from 'react-helmet-async';
import Header from '@/components/header/header';
import Tabs from '@/components/tabs';
import Cities from '@/components/cities';
import Sorting from '@/components/sorting';
import { CITIES } from '@/const';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { changeCity } from '@/store/action';
import { getCity, getOffersByCity } from '@/store/selectors';
import type { City } from '@/types/city';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector(getCity);
  const cityOffers = useAppSelector(getOffersByCity);

  const activeCity: City = CITIES.find((city) => city.name === selectedCity) ?? CITIES[0];

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
          offers={cityOffers}
          placesCount={cityOffers.length}
          city={activeCity.location}
          cityName={activeCity.name}
          sorting={<Sorting />}
        />
      </main>
    </div>
  );
}

export default MainPage;
