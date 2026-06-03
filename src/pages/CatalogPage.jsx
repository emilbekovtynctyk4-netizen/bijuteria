import { useEffect, useMemo, useState } from 'react';
import { catalogService } from '../api';
import { products as fallbackProducts } from '../data/products';
import ProductGrid from '../components/Products/ProductGrid';
import styles from './CatalogPage.module.css';

export default function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузить товары с бекенда
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await catalogService.getProducts({
          search: search || undefined,
          category: category !== 'all' ? category : undefined,
        });
        
        // Backend может вернуть либо объект с items, либо массив
        const productList = response?.items || response || [];
        setProducts(Array.isArray(productList) ? productList : []);
      } catch (err) {
        console.warn('Failed to load products from backend, using fallback:', err);
        // Использовать локальные данные как fallback
        setProducts(fallbackProducts);
        setError('Ошибка при загрузке товаров. Показаны локальные данные.');
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(loadProducts, 300); // Дебаунс для быстрого поиска
    return () => clearTimeout(timer);
  }, [search, category]);

  const categories = useMemo(() => {
    // Получить уникальные категории из товаров
    const unique = new Set(
      products
        .filter((p) => p.category_id || p.category)
        .map((p) => p.category_id || p.category || 'Другие')
    );
    return ['all', ...Array.from(unique)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const title = (product.name || product.title || '').toLowerCase();
      const description = (product.description || product.short_description || '').toLowerCase();
      const queryLower = search.toLowerCase();

      const matchesSearch = !search || 
        title.includes(queryLower) ||
        description.includes(queryLower);

      const matchesCategory = category === 'all' || 
        product.category_id === category ||
        product.category === category;

      const price = parseFloat(product.price) || 0;
      const matchesMin = !priceMin || price >= Number(priceMin);
      const matchesMax = !priceMax || price <= Number(priceMax);

      return matchesSearch && matchesCategory && matchesMin && matchesMax;
    });
  }, [products, search, category, priceMin, priceMax]);

  return (
    <main className={styles.catalog}>
      <div className={styles.intro}>
        <div>
          <span className={styles.label}>Каталог</span>
          <h1 className={styles.title}>Все украшения</h1>
          <p className={styles.subtitle}>
            Фильтруйте и ищите украшения по цене, названию и материалу.
          </p>
        </div>

        <div className={styles.stats}>
          <span>{filteredProducts.length} товара(ов) найдено</span>
          <span>{products.length} всего</span>
        </div>
      </div>

      {error && (
        <div className={styles.errorMessage}>
          ⚠️ {error}
        </div>
      )}

      <section className={styles.panel}>
        <div className={styles.filterBlock}>
          <label className={styles.field}>
            Поиск
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Название, материал или описание"
              disabled={loading}
            />
          </label>

          <label className={styles.field}>
            Категория
            <select 
              value={category} 
              onChange={(event) => setCategory(event.target.value)}
              disabled={loading}
            >
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
                disabled={loading}
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
                disabled={loading}
              />
            </label>
          </div>
        </div>
      </section>

      {loading && (
        <div className={styles.loading}>
          Загрузка товаров...
        </div>
      )}

      <ProductGrid products={filteredProducts} />
    </main>
  );
}
