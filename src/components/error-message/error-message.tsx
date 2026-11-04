import { useAppDispatch } from '@/hooks';
import { fetchOffersAction } from '@/store/api-actions';
import styles from './error-message.module.css';

function ErrorMessage(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleRetry = () => {
    dispatch(fetchOffersAction());
  };

  return (
    <div className={styles.error} role="alert">
      <p className={styles.title}>Не удалось загрузить предложения</p>
      <p className={styles.text}>Проверьте соединение и попробуйте ещё раз.</p>
      <button className={styles.button} type="button" onClick={handleRetry}>
        Попробовать снова
      </button>
    </div>
  );
}

export default ErrorMessage;
