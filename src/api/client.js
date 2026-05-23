const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.example.com';

export async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const error = new Error('API request failed');
    error.status = response.status;
    error.data = await response.json().catch(() => null);
    throw error;
  }

  return response.json().catch(() => null);
}
