import styles from './spinner.module.css';

function Spinner(): JSX.Element {
  return (
    <div className={styles.spinner} role="status">
      <div className={styles.circle} />
      <span className="visually-hidden">Загрузка предложений</span>
    </div>
  );
}

export default Spinner;
