import { Link, useRouteError } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styles from './not-found-page.module.css';

function NotFoundPage(): JSX.Element {
  const error = useRouteError() as { status?: number; statusText?: string } | null;
  const status = error?.status ?? 404;
  const statusText = error?.statusText ?? 'Not Found';

  return (
    <>
      <Helmet>
        <title>404 — Page not found</title>
      </Helmet>

      <div className={styles.root}>
        <div className={styles.glitch} data-text={status}>
          {status}
        </div>
        <h1 className={styles.title}>{statusText}</h1>
        <p className={styles.text}>
          Looks like you&apos;ve wandered off. This page doesn&apos;t exist or has been moved.
        </p>

        <div className={styles.actions}>
          <Link to="/" className={`${styles.button} ${styles.buttonPrimary}`}>
            Go home
          </Link>
          <button type="button" className={styles.button} onClick={() => window.history.back()}>
            Back
          </button>
        </div>
      </div>
    </>
  );
}

export default NotFoundPage;
