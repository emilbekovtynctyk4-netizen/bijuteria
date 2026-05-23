import { useState } from 'react';

export function useCart() {
  const [items, setItems] = useState([]);

  const addItem = (product) => {
    setItems((prev) => [...prev, product]);
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, item) => sum + (item.discountedPrice || item.price || 0), 0);

  return {
    items,
    addItem,
    removeItem,
    clearCart,
    total,
  };
}
