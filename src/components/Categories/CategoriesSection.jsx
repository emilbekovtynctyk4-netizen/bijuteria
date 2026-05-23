import React from "react";
import styles from "./CategoriesSection.module.css";
import CategoryCard from "./CategoryCard";

const categories = [
  {
    id: 1,
    title: "Кольца",
    count: 120,
    image:
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Колье",
    count: 90,
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Серьги",
    count: 150,
    image:
      "https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Браслеты",
    count: 75,
    image:
      "https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Наборы",
    count: 40,
    image:
      "https://images.unsplash.com/photo-1620656798579-1984d7c8d1b1?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Подвески",
    count: 60,
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop",
  },
];

const CategoriesSection = () => {
  return (
    <section className={styles.categories}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div>
            <span className={styles.label}>
              Категории
            </span>

            <h2 className={styles.title}>
              Популярные категории
            </h2>
          </div>

          <button className={styles.viewAll}>
            Смотреть все →
          </button>
        </div>

        <div className={styles.grid}>
          {categories.map((item) => (
            <CategoryCard
              key={item.id}
              title={item.title}
              image={item.image}
              count={item.count}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;