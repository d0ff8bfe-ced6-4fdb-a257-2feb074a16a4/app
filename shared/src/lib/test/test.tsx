import styles from './test.module.scss';

export function Test() {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Test!</h1>
    </div>
  );
}

export default Test;
