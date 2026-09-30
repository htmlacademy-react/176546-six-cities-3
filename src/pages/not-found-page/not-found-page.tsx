import { Link, useRouteError } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './not-found-page.css';

function NotFoundPage(): JSX.Element {
  const error = useRouteError() as { status?: number; statusText?: string } | null;
  const status = error?.status ?? 404;
  const statusText = error?.statusText ?? 'Not Found';

  return (
    <>
      <Helmet>
        <title>404 — Страница не найдена</title>
      </Helmet>

      <div className="not-found">
        <div className="not-found__glitch" data-text={status}>
          {status}
        </div>
        <h1 className="not-found__title">{statusText}</h1>
        <p className="not-found__text">
          Кажется, вы забрели не туда. Такой страницы не существует или она была перемещена.
        </p>

        <div className="not-found__actions">
          <Link to="/" className="not-found__button not-found__button--primary">
            На главную
          </Link>
          <button type="button" className="not-found__button" onClick={() => window.history.back()}>
            Назад
          </button>
        </div>
      </div>
    </>
  );
}

export default NotFoundPage;
