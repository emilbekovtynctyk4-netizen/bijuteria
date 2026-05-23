import React from 'react';
import styles from './ProductGrid.module.css';

import ProductCard from './ProductCard';
import { products as defaultProducts } from '../../data/products';

const ProductGrid = ({ products = defaultProducts }) => {
  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          title={product.title}
          image={product.image}
          price={product.price}
          oldPrice={product.oldPrice}
          badge={product.badge}
        />
      ))}
    </div>
  );
};

export default ProductGrid;