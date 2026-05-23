import React from "react";
import styles from "./CategoryCard.module.css";
import { ArrowRight } from "lucide-react";

const CategoryCard = ({
  title,
  image,
  count,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={image}
          alt={title}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <div>
          <h3 className={styles.title}>
            {title}
          </h3>

          <p className={styles.count}>
            {count}+ товаров
          </p>
        </div>

        <button className={styles.button}>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;