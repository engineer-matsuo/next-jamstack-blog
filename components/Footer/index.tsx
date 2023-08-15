import styles from './index.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.cr}>© 2023 {process.env.SITE_NAME}</p>
    </footer>
  );
}
