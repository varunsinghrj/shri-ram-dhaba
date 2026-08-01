const API_BASE = import.meta.env.VITE_API_URL || '/api';

function getToken(): string | null {
  return localStorage.getItem('srd_token');
}

function setToken(token: string) {
  localStorage.setItem('srd_token', token);
}

function clearToken() {
  localStorage.removeItem('srd_token');
}

function getAdminToken(): string | null {
  return localStorage.getItem('srd_admin_token');
}

function setAdminToken(token: string) {
  localStorage.setItem('srd_admin_token', token);
}

function clearAdminToken() {
  localStorage.removeItem('srd_admin_token');
}

async function request(endpoint: string, options: any = {}, useToken = false, adminToken = false) {
  const url = `${API_BASE}${endpoint}`;
  const token = adminToken ? getAdminToken() : getToken();
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (useToken && token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    headers: { ...headers, ...(options.headers || {}) },
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
  register: async (body: any) => {
    const data = await request('/auth/register', { method: 'POST', body: JSON.stringify(body) });
    if (data.token) setToken(data.token);
    return data;
  },
  login: async (body: any) => {
    const data = await request('/auth/login', { method: 'POST', body: JSON.stringify(body) });
    if (data.token) setToken(data.token);
    return data;
  },
  logout: () => { clearToken(); return request('/auth/logout', { method: 'POST' }); },
  getMe: () => request('/auth/me', {}, true),
  updateProfile: (body: any) => request('/auth/profile', { method: 'PUT', body: JSON.stringify(body) }, true),
  migrateUsers: (users: any) => request('/auth/migrate', { method: 'POST', body: JSON.stringify({ users }) }),

  // Orders
  placeOrder: (body: any) => request('/orders', { method: 'POST', body: JSON.stringify(body) }, true),
  getMyOrders: () => request('/orders/my', {}, true),
  getOrder: (id: string) => request(`/orders/${id}`, {}, true),
  cancelOrder: (id: string) => request(`/orders/${id}/cancel`, { method: 'PUT' }, true),
  deleteOrder: (id: string) => request(`/orders/${id}`, { method: 'DELETE' }, true),

  // Admin
  adminLogin: async (body: any) => {
    const data = await request('/admin/login', { method: 'POST', body: JSON.stringify(body) });
    if (data.token) setAdminToken(data.token);
    return data;
  },
  adminLogout: () => { clearAdminToken(); return request('/admin/logout', { method: 'POST' }, false, true); },
  adminMe: () => request('/admin/me', {}, true, true),
  adminGetOrders: (status?: string) => request(`/admin/orders${status && status !== 'all' ? `?status=${status}` : ''}`, {}, true, true),
  adminUpdateOrderStatus: (id: string, status: string) => request(`/admin/orders/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }, true, true),
  adminDeleteOrder: (id: string) => request(`/admin/orders/${id}`, { method: 'DELETE' }, true, true),
  adminGetUsers: () => request('/admin/users', {}, true, true),
  adminDeleteUser: (id: string) => request(`/admin/users/${id}`, { method: 'DELETE' }, true, true),
  adminGetStats: () => request('/admin/stats', {}, true, true),
};
