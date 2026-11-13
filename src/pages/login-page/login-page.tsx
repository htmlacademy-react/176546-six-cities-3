import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/header/header';
import Login from '@/components/login/login';
import { AppRoute, CITIES } from '@/const';
import { useAppDispatch } from '@/hooks';
import { changeCity } from '@/store/slices/offers';

function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const [randomCity] = useState(() => CITIES[Math.floor(Math.random() * CITIES.length)]);

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 cities: authorization</title>
      </Helmet>
      <Header showNav={false} />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <Login />
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to={AppRoute.Root}
                onClick={() => dispatch(changeCity(randomCity.name))}
              >
                <span>{randomCity.name}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
