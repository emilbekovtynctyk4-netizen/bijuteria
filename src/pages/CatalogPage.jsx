import { useEffect, useMemo, useState } from 'react';
import { products as initialProducts } from '../data/products';
import ProductGrid from '../components/Products/ProductGrid';
import AddProductForm from '../components/Products/AddProductForm';
import styles from './CatalogPage.module.css';

const STORAGE_KEY = 'catalog_products';

export default function CatalogPage() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts(parsed);
        }
      } catch (error) {
        console.warn('Не удалось загрузить сохранённые товары', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const categories = useMemo(() => {
    const unique = new Set(products.map((product) => product.category || 'Другие'));
    return ['all', ...Array.from(unique)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const normalizedTitle = product.title.toLowerCase();
      const normalizedSearch = search.toLowerCase();
      const matchesSearch = normalizedTitle.includes(normalizedSearch) ||
        product.description.toLowerCase().includes(normalizedSearch) ||
        product.material.toLowerCase().includes(normalizedSearch);

      const matchesCategory = category === 'all' || product.category === category;
      const matchesMin = priceMin === '' || product.price >= Number(priceMin);
      const matchesMax = priceMax === '' || product.price <= Number(priceMax);

      return matchesSearch && matchesCategory && matchesMin && matchesMax;
    });
  }, [products, search, category, priceMin, priceMax]);

  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  return (
    <main className={styles.catalog}>
      <div className={styles.intro}>
        <div>
          <span className={styles.label}>Каталог</span>
          <h1 className={styles.title}>Все украшения</h1>
          <p className={styles.subtitle}>
            Фильтруйте, ищите и добавляйте новые украшения прямо на сайт.
          </p>
        </div>

        <div className={styles.stats}>
          <span>{filteredProducts.length} товара(ов) найдено</span>
          <span>{products.length} всего</span>
        </div>
      </div>

      <section className={styles.panel}>
        <div className={styles.filterBlock}>
          <label className={styles.field}>
            Поиск
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Название, материал или описание"
            />
          </label>

          <label className={styles.field}>
            Категория
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              {categories.map((option) => (
                <option key={option} value={option}>
                  {option === 'all' ? 'Все категории' : option}
                </option>
              ))}
            </select>
          </label>

          <div className={styles.priceRow}>
            <label className={styles.field}>
              Мин. цена
              <input
                type="number"
                min="0"
                value={priceMin}
                onChange={(event) => setPriceMin(event.target.value)}
                placeholder="0"
              />
            </label>

            <label className={styles.field}>
              Макс. цена
              <input
                type="number"
                min="0"
                value={priceMax}
                onChange={(event) => setPriceMax(event.target.value)}
                placeholder="9999"
              />
            </label>
          </div>
        </div>

        <div className={styles.formBlock}>
          <AddProductForm categories={categories.filter((item) => item !== 'all')} onAdd={handleAddProduct} />
        </div>
      </section>

      <ProductGrid products={filteredProducts} />
    </main>
  );
}
