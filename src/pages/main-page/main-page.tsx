import { Helmet } from 'react-helmet-async';
import clsx from 'clsx';
import Header from '@/components/header/header';
import Tabs from '@/components/tabs';
import Cities from '@/components/cities';
import MainEmpty from '@/components/main-empty/main-empty';
import Spinner from '@/components/spinner/spinner';
import ErrorMessage from '@/components/error-message/error-message';
import { CITIES } from '@/const';
import { useAppSelector } from '@/hooks';
import { getCity, getSortedOffers, selectOffersStatus } from '@/store/slices/offers';

function MainPage(): JSX.Element {
  const selectedCity = useAppSelector(getCity);
  const sortedOffers = useAppSelector(getSortedOffers);
  const { isLoading, isError } = useAppSelector(selectOffersStatus);

  const activeCity = CITIES.find((city) => city.name === selectedCity) ?? CITIES[0];
  const isEmpty = !isLoading && !isError && sortedOffers.length === 0;

  const renderContent = () => {
    if (isLoading) {
      return <Spinner />;
    }

    if (isError) {
      return <ErrorMessage />;
    }

    if (isEmpty) {
      return <MainEmpty cityName={activeCity.name} />;
    }

    return <Cities offers={sortedOffers} city={activeCity.location} cityName={activeCity.name} />;
  };

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>

      <Header />

      <main
        className={clsx('page__main', 'page__main--index', {
          'page__main--index-empty': isEmpty,
        })}
      >
        <h1 className="visually-hidden">Cities</h1>

        <Tabs activeCityName={activeCity.name} />

        {renderContent()}
      </main>
    </div>
  );
}

export default MainPage;
