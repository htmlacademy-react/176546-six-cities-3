import styles from './spinner.module.css';

type SpinnerProps = {
  label?: string;
};

function Spinner({ label = 'Loading offers' }: SpinnerProps): JSX.Element {
  return (
    <div className={styles.spinner} role="status">
      <div className={styles.circle} />
      <span className="visually-hidden">{label}</span>
    </div>
  );
}

export default Spinner;
