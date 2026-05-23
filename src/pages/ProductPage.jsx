import { Link, useParams } from 'react-router-dom';
import { findProductById } from '../data/products';
import styles from './ProductPage.module.css';

export default function ProductPage() {
  const { id } = useParams();
  const product = findProductById(id);

  if (!product) {
    return (
      <section className={styles.productPage}>
        <div className="container">
          <h1>Товар не найден</h1>
          <p>Похоже, этот товар больше недоступен.</p>
          <Link to="/" className={styles.productPage__backLink}>
            Вернуться на главную
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.productPage}>
      <div className={styles.productPage__card}>
        <img
          src={product.image}
          alt={product.title}
          className={styles.productPage__image}
        />

        <div className={styles.productPage__info}>
          {product.badge && (
            <span className={styles.productPage__badge}>
              {product.badge}
            </span>
          )}

          <div>
            <h1 className={styles.productPage__title}>{product.title}</h1>

            <div className={styles.productPage__price}>
              <span className={styles.productPage__priceCurrent}>
                {product.price} сом
              </span>
              {product.oldPrice && (
                <span className={styles.productPage__priceOld}>
                  {product.oldPrice} сом
                </span>
              )}
            </div>

            <p className={styles.productPage__description}>
              {product.description}
            </p>
          </div>

          <div className={styles.productPage__details}>
            <div>
              <div className={styles.productPage__detailLabel}>Материал</div>
              <div className={styles.productPage__detailValue}>
                {product.material}
              </div>
            </div>
            <div>
              <div className={styles.productPage__detailLabel}>Вес</div>
              <div className={styles.productPage__detailValue}>
                {product.weight}
              </div>
            </div>
          </div>

          <div className={styles.productPage__actions}>
            <button className={styles.productPage__button}>
              Добавить в корзину
            </button>
            <Link to="/" className={styles.productPage__backLink}>
              Вернуться
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
