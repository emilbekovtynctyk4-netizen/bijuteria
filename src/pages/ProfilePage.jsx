import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ROUTES } from '../constants/routes';
import { adminService, catalogService } from '../api';
import AddProductForm from '../components/Products/AddProductForm';
import styles from './ProfilePage.module.css';

export default function ProfilePage() {
  const { user, isAdmin, logout, login } = useAuth();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // Загрузить категории
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await catalogService.getCategories();
        setCategories(cats || []);
      } catch (err) {
        console.error('Failed to load categories:', err);
      }
    };

    loadCategories();
  }, []);

  // Не авторизован
  if (!user) {
    const handleLogin = async (event) => {
      event.preventDefault();
      setLoading(true);
      setError('');

      try {
        await login(loginEmail, loginPassword);
        setLoginEmail('');
        setLoginPassword('');
      } catch (err) {
        setError(
          err?.message ||
          'Ошибка при входе. Проверьте почту и пароль.'
        );
      } finally {
        setLoading(false);
      }
    };

    return (
      <main className={styles.profile}>
        <div className={styles.card}>
          <h1>Войти как администратор</h1>
          <p>Только авторизованный аккаунт может добавлять новые товары в каталог.</p>

          <form className={styles.form} onSubmit={handleLogin}>
            <label>
              Email
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@example.com"
                disabled={loading}
              />
            </label>

            <label>
              Пароль
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
              />
            </label>

            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? 'Загрузка...' : 'Войти'}
            </button>
          </form>

          <Link to={ROUTES.CATALOG} className={styles.link}>
            Вернуться в каталог
          </Link>
        </div>
      </main>
    );
  }

  // Авторизован, но не админ
  if (!isAdmin) {
    return (
      <main className={styles.profile}>
        <div className={styles.card}>
          <h1>Доступ запрещён</h1>
          <p>У вас нет прав администратора для доступа к этой странице.</p>
          <button onClick={logout} className={styles.button}>
            Выйти
          </button>
          <Link to={ROUTES.CATALOG} className={styles.link}>
            Вернуться в каталог
          </Link>
        </div>
      </main>
    );
  }

  // Админ авторизован
  const handleAddProduct = async (newProduct) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await adminService.createProduct({
        name: newProduct.title,
        slug: newProduct.title
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]/g, ''),
        description: newProduct.description,
        shortDescription: newProduct.description?.slice(0, 100),
        price: newProduct.price,
        discountPercent: newProduct.badge === 'Sale' ? '20' : '0',
        isNew: newProduct.badge === 'New',
        isOnSale: newProduct.badge === 'Sale',
        stockQuantity: 10,
        brand: newProduct.material,
        weightGrams: newProduct.weight ? parseInt(newProduct.weight) : 0,
        categoryId: newProduct.category,
      });

      setSuccess('Товар успешно добавлен!');
      setLoginEmail('');
      setLoginPassword('');

      // Очистить форму через небольшую задержку
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err?.message || 'Ошибка при добавлении товара');
      console.error('Add product error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.profile}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div>
            <span className={styles.label}>Панель администратора</span>
            <h1>Добавление товара</h1>
            <p>
              Через эту страницу вы можете добавлять новые товары в каталог.
              Они станут доступны после сохранения на сервере.
            </p>
          </div>

          <button className={styles.logout} onClick={logout}>
            Выйти
          </button>
        </div>

        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}

        <AddProductForm
          onAdd={handleAddProduct}
          categories={categories.map((c) => c.slug)}
          loading={loading}
        />

        <div className={styles.stats}>
          <p>
            Вы авторизованы как администратор: <strong>{user.email}</strong>
          </p>
        </div>
      </div>
    </main>
  );
}

