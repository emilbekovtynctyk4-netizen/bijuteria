import React from "react";
import styles from "./ProductsSection.module.css";

import ProductGrid from "./ProductGrid";

const ProductsSection = () => {
  return (
    <section className={styles.products}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div>
            <span className={styles.label}>
              Украшения
            </span>

            <h2 className={styles.title}>
              Хиты продаж
            </h2>
          </div>

          <button className={styles.viewAll}>
            Смотреть все →
          </button>
        </div>

        <ProductGrid />
      </div>
    </section>
  );
};

export default ProductsSection;