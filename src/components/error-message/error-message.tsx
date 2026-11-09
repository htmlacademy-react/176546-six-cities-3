import { useAppDispatch } from '@/hooks';
import { fetchOffersAction } from '@/store/slices/offers';
import styles from './error-message.module.css';

function ErrorMessage(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleRetry = () => {
    dispatch(fetchOffersAction());
  };

  return (
    <div className={styles.error} role="alert">
      <p className={styles.title}>Could not load offers</p>
      <p className={styles.text}>Check your connection and try again.</p>
      <button className={styles.button} type="button" onClick={handleRetry}>
        Try again
      </button>
    </div>
  );
}

export default ErrorMessage;
