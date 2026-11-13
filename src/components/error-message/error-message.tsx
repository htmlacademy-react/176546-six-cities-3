import { useAppDispatch } from '@/hooks';
import { fetchOffersAction } from '@/store/slices/entities/offers';
import styles from './error-message.module.css';

type ErrorMessageProps = {
  title?: string;
  onRetry?: () => void;
};

function ErrorMessage({ title = 'Could not load offers', onRetry }: ErrorMessageProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
      return;
    }

    dispatch(fetchOffersAction());
  };

  return (
    <div className={styles.error} role="alert">
      <p className={styles.title}>{title}</p>
      <p className={styles.text}>Check your connection and try again.</p>
      <button className={styles.button} type="button" onClick={handleRetry}>
        Try again
      </button>
    </div>
  );
}

export default ErrorMessage;
