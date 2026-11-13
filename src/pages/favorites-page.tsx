import { useEffect } from 'react';
import clsx from 'clsx';
import { Helmet } from 'react-helmet-async';
import Logo from '@/components/logo/logo';
import Header from '@/components/header/header';
import PlaceCard from '@/components/place-card/place-card';
import Spinner from '@/components/spinner/spinner';
import ErrorMessage from '@/components/error-message/error-message';
import FavoritesEmpty from '@/components/favorites-empty/favorites-empty';
import { useAppDispatch, useAppSelector } from '@/hooks';
import {
  fetchFavoritesAction,
  getFavorites,
  getFavoritesByCity,
  selectFavoritesStatus,
} from '@/store/slices/favorites';

function FavoritesPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(getFavorites);
  const favoritesByCity = useAppSelector(getFavoritesByCity);
  const { isLoading, isError } = useAppSelector(selectFavoritesStatus);

  useEffect(() => {
    void dispatch(fetchFavoritesAction());
  }, [dispatch]);

  const isEmpty = !isLoading && !isError && favorites.length === 0;

  const renderContent = () => {
    if (isLoading) {
      return <Spinner />;
    }

    if (isError) {
      return (
        <ErrorMessage
          title="Could not load favorites"
          onRetry={() => void dispatch(fetchFavoritesAction())}
        />
      );
    }

    if (isEmpty) {
      return <FavoritesEmpty />;
    }

    return (
      <section className="favorites">
        <h1 className="favorites__title">Saved listing</h1>
        <ul className="favorites__list">
          {Object.entries(favoritesByCity).map(([city, cityOffers = []]) => (
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
    );
  };

  return (
    <div className={clsx('page', { 'page--favorites-empty': isEmpty })}>
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>

      <Header />

      <main
        className={clsx('page__main', 'page__main--favorites', {
          'page__main--favorites-empty': isEmpty,
        })}
      >
        <div className="page__favorites-container container">{renderContent()}</div>
      </main>
      <footer className="footer container">
        <Logo type="footer" />
      </footer>
    </div>
  );
}

export default FavoritesPage;
