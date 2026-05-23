import { request } from './client';

export async function login(credentials) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export async function logout() {
  return request('/auth/logout', {
    method: 'POST',
  });
}
