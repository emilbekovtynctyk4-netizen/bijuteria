import { config } from '../../config';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__brand}>
          <p>© 2026 LUMÉRA JEWELRY.</p>
          <p>Красота и стиль каждый день.</p>
        </div>

        <div className={styles.footer__contact}>
          <a href={`tel:${config.phone.replace(/\s+/g, '')}`} className={styles.footer__link}>
            {config.phone}
          </a>
          <a href={`mailto:${config.email}`} className={styles.footer__link}>
            {config.email}
          </a>
          <p>{config.address}</p>
        </div>
      </div>
    </footer>
  );
}
