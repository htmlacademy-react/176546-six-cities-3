import { Helmet } from 'react-helmet-async';
import Header from '@/components/header/header';
import Tabs from '@/components/tabs';
import Cities from '@/components/cities';
import Spinner from '@/components/spinner/spinner';
import { CITIES } from '@/const';
import { useAppSelector } from '@/hooks';
import {
  getCity,
  getIsOffersLoading,
  getSortedOffers,
  selectOffersStatus,
} from '@/store/selectors';

function MainPage(): JSX.Element {
  const selectedCity = useAppSelector(getCity);
  const sortedOffers = useAppSelector(getSortedOffers);
  const { isLoading, isSuccess, isError } = useAppSelector(selectOffersStatus);

  const activeCity = CITIES.find((city) => city.name === selectedCity) ?? CITIES[0];

  const rederContent = () => {
    if (isLoading) {
      return <Spinner />;
    }

    return <Cities offers={sortedOffers} city={activeCity.location} cityName={activeCity.name} />;
  };

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>

      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <Tabs activeCityName={activeCity.name} />

        {rederContent()}
      </main>
    </div>
  );
}

export default MainPage;
