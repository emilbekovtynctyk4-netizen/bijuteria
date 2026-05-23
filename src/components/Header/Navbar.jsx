import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import styles from './Header.module.css';

export default function Navbar() {
  return (
    <nav className={styles.header__nav}> 
      <Link to={ROUTES.HOME}>Главная</Link>
      <Link to={ROUTES.CATALOG}>Каталог</Link>
      <Link to={ROUTES.CART}>Корзина</Link>
      <Link to={ROUTES.CHECKOUT}>Оформление</Link>
    </nav>
  );
}
