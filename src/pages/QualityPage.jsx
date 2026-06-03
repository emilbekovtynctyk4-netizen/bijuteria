import styles from './QualityPage.module.css';

export default function QualityPage() {
  return (
    <main className={styles.quality}>
      <div className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.label}>Наше качество</span>
          <h1 className={styles.title}>Украшения, которым можно доверять</h1>
          <p className={styles.subtitle}>
            Мы используем только гипоаллергенные материалы и применяем
            строгий контроль качества на каждом этапе производства.
          </p>
        </div>
      </div>

      <section className={styles.benefits}>
        <div className={styles.container}>
          <h2>Почему выбирают LUMÉRA</h2>
          <div className={styles.grid}>
            <article className={styles.card}>
              <div className={styles.icon}>✨</div>
              <h3>Не темнеет</h3>
              <p>
                Используем стерлинговое серебро и позолоту высочайшего качества,
                которые не окисляются и не темнеют со временем.
              </p>
            </article>

            <article className={styles.card}>
              <div className={styles.icon}>🛡️</div>
              <h3>Гипоаллергенно</h3>
              <p>
                Все украшения подходят для чувствительной кожи. Материалы
                протестированы дерматологически и безопасны для ежедневного ношения.
              </p>
            </article>

            <article className={styles.card}>
              <div className={styles.icon}>💎</div>
              <h3>Долговечность</h3>
              <p>
                Каждое украшение изготовлено с максимальной тщательностью.
                Прослужит вам годы, сохраняя красоту и блеск.
              </p>
            </article>

            <article className={styles.card}>
              <div className={styles.icon}>🔍</div>
              <h3>Контроль качества</h3>
              <p>
                Трёхэтапная проверка каждого изделия перед отправкой.
                Мы гарантируем идеальное состояние при получении.
              </p>
            </article>

            <article className={styles.card}>
              <div className={styles.icon}>📦</div>
              <h3>Упаковка премиум</h3>
              <p>
                Приходит в красивой упаковке с сертификатом качества.
                Отличный подарок, который точно порадует получателя.
              </p>
            </article>

            <article className={styles.card}>
              <div className={styles.icon}>🌍</div>
              <h3>Этичное производство</h3>
              <p>
                Партнёры с честными условиями работы и экологичным подходом.
                Каждое украшение — результат ответственного производства.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.about}>
        <div className={styles.container}>
          <div className={styles.content}>
            <h2>О LUMÉRA</h2>
            <p>
              Более <strong>16 лет опыта</strong> в создании украшений, которые
              становятся любимыми. Каждое изделие — это результат мастерства,
              внимания к деталям и любви к красоте.
            </p>
            <p>
              Мы верим, что украшения должны быть не только красивыми, но и
              безопасными для здоровья. Поэтому каждый материал, каждый
              компонент — результат тщательного отбора.
            </p>
            <p>
              Наша миссия: дарить радость через украшения, которые можно
              носить каждый день без опасений и со спокойствием.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
