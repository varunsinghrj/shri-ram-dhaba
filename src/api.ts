const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config: RequestInit = {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include' as RequestCredentials,
    ...options,
  };

  const res = await fetch(url, config);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Something went wrong');
  }

  return data;
}

// Auth
export const api = {
  register: (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  logout: () => request('/auth/logout', { method: 'POST' }),
  getMe: () => request('/auth/me'),
  updateProfile: (body) => request('/auth/profile', { method: 'PUT', body: JSON.stringify(body) }),
  migrateUsers: (users) => request('/auth/migrate', { method: 'POST', body: JSON.stringify({ users }) }),

  // Orders
  placeOrder: (body) => request('/orders', { method: 'POST', body: JSON.stringify(body) }),
  getMyOrders: () => request('/orders/my'),
  getOrder: (id) => request(`/orders/${id}`),
  cancelOrder: (id) => request(`/orders/${id}/cancel`, { method: 'PUT' }),
  deleteOrder: (id) => request(`/orders/${id}`, { method: 'DELETE' }),

  // Admin
  adminLogin: (body) => request('/admin/login', { method: 'POST', body: JSON.stringify(body) }),
  adminLogout: () => request('/admin/logout', { method: 'POST' }),
  adminMe: () => request('/admin/me'),
  adminGetOrders: (status) => request(`/admin/orders${status && status !== 'all' ? `?status=${status}` : ''}`),
  adminUpdateOrderStatus: (id, status) => request(`/admin/orders/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
  adminDeleteOrder: (id) => request(`/admin/orders/${id}`, { method: 'DELETE' }),
  adminGetUsers: () => request('/admin/users'),
  adminDeleteUser: (id) => request(`/admin/users/${id}`, { method: 'DELETE' }),
  adminGetStats: () => request('/admin/stats'),
};
