import React from "react";
import styles from "./HeroSection.module.css";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.subtitle}>Новая коллекция 2026</span>

          <h1 className={styles.title}>
            Подчеркни свою красоту с{" "}
            <span className={styles.brand}>Luméra</span>
          </h1>

          <p className={styles.description}>
            Стильная бижутерия высокого качества по доступным
            ценам в Бишкеке.
          </p>

          <div className={styles.actions}>
            <button className={styles.primaryBtn}>
              Перейти в каталог
              <ArrowRight size={18} />
            </button>

            <button className={styles.secondaryBtn}>
              Новинки
            </button>
          </div>
        </div>

        <div className={styles.imageWrapper}>
          <img
            src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop"
            alt="Jewelry"
            className={styles.image}
          />

          <div className={styles.badge}>
            <span>NEW</span>
            <span>COLLECTION</span>
          </div>
        </div>
      </div>

      <div className={styles.dots}>
        <span className={`${styles.dot} ${styles.active}`}></span>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
      </div>
    </section>
  );
};

export default HeroSection;