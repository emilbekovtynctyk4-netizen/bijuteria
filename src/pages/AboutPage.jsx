import { config } from '../config';
import styles from './AboutPage.module.css';

export default function AboutPage() {
  return (
    <main className={styles.about}>
      <div className="container">
        <span className={styles.label}>О нас</span>
        <h1 className={styles.title}>LUMÉRA JEWELRY — искусство украшений</h1>
        <p className={styles.lead}>{config.aboutText}</p>

        <section className={styles.section}>
          <h2>Наше кредо</h2>
          <p>{config.aboutMission}</p>
        </section>

        <section className={styles.section}>
          <h2>Почему выбирают нас</h2>
          <ul className={styles.list}>
            <li>Высокое качество материалов и внимательное ручное исполнение.</li>
            <li>Современный дизайн, который подчёркивает женственность и стиль.</li>
            <li>Удобная доставка по всему Кыргызстану и поддержка клиентов 7 дней в неделю.</li>
            <li>Гарантия на каждое изделие и честная политика возврата.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Наша миссия</h2>
          <p>
            Мы создаём украшения, которые становятся частью ваших ярких воспоминаний.
            Каждое изделие LUMÉRA — это история о красоте, доверии и внимании к деталям.
          </p>
        </section>
      </div>
    </main>
  );
}
