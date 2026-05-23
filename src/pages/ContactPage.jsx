import { config } from '../config';
import styles from './ContactPage.module.css';

export default function ContactPage() {
  return (
    <main className={styles.contact}>
      <div className="container">
        <span className={styles.label}>Контакты</span>
        <h1 className={styles.title}>Свяжитесь с нами</h1>

        <div className={styles.grid}>
          <section className={styles.card}>
            <h2>Телефон</h2>
            <p>
              <a href={`tel:${config.phone.replace(/\s+/g, '')}`} className={styles.link}>
                {config.phone}
              </a>
            </p>
            <p>Горячая линия для заказов и консультаций.</p>
          </section>

          <section className={styles.card}>
            <h2>Email</h2>
            <p>
              <a href={`mailto:${config.email}`} className={styles.link}>
                {config.email}
              </a>
            </p>
            <p>Пишите нам для сотрудничества и вопросов по доставке.</p>
          </section>

          <section className={styles.card}>
            <h2>Адрес</h2>
            <p>{config.address}</p>
            <p>Пн–Вс: {config.workingHours}</p>
          </section>
        </div>

        <section className={styles.section}>
          <h2>Мы всегда рады помочь</h2>
          <p>
            Напишите или позвоните нам — мы быстро ответим и поможем подобрать украшение
            для любого случая. В LUMÉRA JEWELRY мы делаем покупки комфортными и простыми.
          </p>
        </section>
      </div>
    </main>
  );
}
