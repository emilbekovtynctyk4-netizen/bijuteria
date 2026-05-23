import { request } from './client';

export async function fetchCatalog() {
  return request('/catalog');
}

export async function fetchProduct(id) {
  return request(`/products/${id}`);
}
