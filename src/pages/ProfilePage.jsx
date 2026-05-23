import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import AddProductForm from '../components/Products/AddProductForm';
import styles from './ProfilePage.module.css';

const USER_KEY = 'jelevery_user';
const PRODUCT_STORAGE_KEY = 'catalog_products';
const ADMIN_CREDENTIALS = { login: 'admin', password: 'admin123' };

function loadProducts() {
  try {
    const saved = localStorage.getItem(PRODUCT_STORAGE_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(USER_KEY);
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem(USER_KEY);
      }
    }

    const loaded = loadProducts();
    if (loaded.length > 0) {
      setProducts(loaded);
    }
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    if (login === ADMIN_CREDENTIALS.login && password === ADMIN_CREDENTIALS.password) {
      const admin = { name: 'Admin', role: 'admin' };
      localStorage.setItem(USER_KEY, JSON.stringify(admin));
      setUser(admin);
      setError('');
      setLogin('');
      setPassword('');
      return;
    }

    setError('Проверьте логин и пароль. Доступ разрешён только администратору.');
  };

  const handleLogout = () => {
    localStorage.removeItem(USER_KEY);
    setUser(null);
    setSuccess('');
  };

  const handleAddProduct = (newProduct) => {
    const updated = [newProduct, ...products];
    setProducts(updated);
    localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(updated));
    setSuccess('Товар успешно добавлен и сохранён.');
  };

  if (!user) {
    return (
      <main className={styles.profile}>
        <div className={styles.card}>
          <h1>Войти как администратор</h1>
          <p>Только авторизованный аккаунт может добавлять новые товары в каталог.</p>

          <form className={styles.form} onSubmit={handleLogin}>
            <label>
              Логин
              <input value={login} onChange={(event) => setLogin(event.target.value)} placeholder="admin" />
            </label>

            <label>
              Пароль
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••" />
            </label>

            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.button}>Войти</button>
          </form>

          <div className={styles.infoBox}>
            <p>Тестовый админ-аккаунт:</p>
            <p><strong>Логин:</strong> admin</p>
            <p><strong>Пароль:</strong> admin123</p>
          </div>

          <Link to={ROUTES.CATALOG} className={styles.link}>Вернуться в каталог</Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.profile}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div>
            <span className={styles.label}>Панель администратора</span>
            <h1>Добавление товара</h1>
            <p>Через эту страницу вы можете добавлять новые товары, а они будут доступны в каталоге после сохранения.</p>
          </div>

          <button className={styles.logout} onClick={handleLogout}>Выйти</button>
        </div>

        {success && <p className={styles.success}>{success}</p>}

        <AddProductForm onAdd={handleAddProduct} categories={Array.from(new Set(products.map((item) => item.category).filter(Boolean)))} />

        <div className={styles.stats}>
          <p>В каталоге сейчас: <strong>{products.length}</strong> товар(а).</p>
          <p>Каждый добавленный товар автоматически сохраняется в браузере.</p>
        </div>
      </div>
    </main>
  );
}
