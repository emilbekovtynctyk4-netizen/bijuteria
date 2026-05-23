import { useMemo, useState } from 'react';
import styles from './AddProductForm.module.css';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1600180758895-e1c7b6978331?q=80&w=1200&auto=format&fit=crop';

export default function AddProductForm({ categories, onAdd }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [category, setCategory] = useState(categories[0] || 'other');
  const [material, setMaterial] = useState('');
  const [weight, setWeight] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [badge, setBadge] = useState('Новинка');

  const categoryOptions = useMemo(
    () => ['rings', 'necklaces', 'earrings', 'bracelets', 'other', ...categories.filter((item) => !['rings', 'necklaces', 'earrings', 'bracelets', 'other'].includes(item))],
    [categories]
  );

  const selectedImage = imagePreview || imageUrl || DEFAULT_IMAGE;

  const handleImageFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      setImagePreview('');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title || !price || !description) {
      return;
    }

    const newProduct = {
      id: Date.now(),
      title,
      price: Number(price),
      oldPrice: oldPrice ? Number(oldPrice) : undefined,
      badge: badge || 'Новинка',
      category,
      material,
      weight,
      description,
      image: selectedImage,
    };

    onAdd(newProduct);
    setTitle('');
    setPrice('');
    setOldPrice('');
    setMaterial('');
    setWeight('');
    setDescription('');
    setImageUrl('');
    setImagePreview('');
    setBadge('Новинка');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.heading}>Добавить новое украшение</h2>

      <div className={styles.preview}>
        <img src={selectedImage} alt="Превью товара" />
      </div>

      <div className={styles.controls}>
        <label className={styles.field}>
          Название
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Например, Солнечное колье" />
        </label>

        <label className={styles.field}>
          Цена
          <input type="number" min="0" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="1200" />
        </label>

        <label className={styles.field}>
          Старая цена
          <input type="number" min="0" value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} placeholder="1500" />
        </label>

        <label className={styles.field}>
          Категория
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {Array.from(new Set(categoryOptions)).map((option) => (
              <option key={option} value={option}>
                {option === 'other' ? 'Другое' : option}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          Бейдж
          <input value={badge} onChange={(e) => setBadge(e.target.value)} placeholder="Новинка, Хит, -10%" />
        </label>

        <label className={styles.field}>
          Материал
          <input value={material} onChange={(e) => setMaterial(e.target.value)} placeholder="Серебро, золото..." />
        </label>

        <label className={styles.field}>
          Вес
          <input value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="4.5 г" />
        </label>

        <label className={styles.field}>
          Описание
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Краткое описание товара" rows="4" />
        </label>

        <label className={styles.field}>
          URL картинки
          <input value={imageUrl} onChange={(e) => { setImageUrl(e.target.value); setImagePreview(''); }} placeholder="https://..." />
        </label>

        <label className={styles.field}>
          Или загрузите файл
          <input type="file" accept="image/*" onChange={handleImageFile} />
        </label>
      </div>

      <button type="submit" className={styles.button}>
        Добавить товар
      </button>
    </form>
  );
}
