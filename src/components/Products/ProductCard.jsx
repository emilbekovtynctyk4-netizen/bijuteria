import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';
import { ROUTES } from '../../constants/routes';

import {
  Heart,
  ShoppingBag,
  Star,
} from 'lucide-react';

const ProductCard = ({
  id,
  image,
  title,
  price,
  oldPrice,
  badge,
}) => {
  const productUrl = ROUTES.PRODUCT.replace(':id', id);

  return (
    <div className={styles.card}>
      {badge && (
        <span className={styles.badge}>
          {badge}
        </span>
      )}

      <button className={styles.favorite}>
        <Heart size={18} />
      </button>

      <Link to={productUrl} className={styles.cardLink}>
        <div className={styles.imageWrapper}>
          <img
            src={image}
            alt={title}
            className={styles.image}
          />
        </div>

        <div className={styles.content}>
          <div className={styles.rating}>
            <Star size={15} fill="#C39B6A" />
            <span>4.9</span>
          </div>

        <h3 className={styles.title}>
          {title}
        </h3>

        <div className={styles.prices}>
          <span className={styles.price}>
            {price} сом
          </span>

          {oldPrice && (
            <span className={styles.oldPrice}>
              {oldPrice} сом
            </span>
          )}
        </div>

        <div className={styles.cardHint}>
          Нажмите, чтобы прочитать описание
        </div>
      </div>
      </Link>

      <button className={styles.cartBtn}>
        <ShoppingBag size={18} />
        В корзину
      </button>
    </div>
  );
};

export default ProductCard;