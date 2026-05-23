import { useState, useEffect } from 'react';
import { fetchCatalog } from '../api/catalog';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    fetchCatalog()
      .then((data) => {
        if (mounted) {
          setProducts(data?.products || []);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err);
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { products, loading, error };
}
