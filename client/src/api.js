const DEFAULT_API = `http://${window.location.hostname}:4000/api`;
export const API = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE) || DEFAULT_API;

export const getToken  = () => localStorage.getItem('token');
export const setToken  = (t) => localStorage.setItem('token', t);
export const clearToken = () => localStorage.removeItem('token');

async function req(path, { method = 'GET', body, auth = false, headers: extra = {}, signal } = {}) {
  const headers = { Accept: 'application/json', 'Content-Type': 'application/json', ...extra };
  if (auth) {
    const tok = getToken();
    if (tok) headers.Authorization = `Bearer ${tok}`;
  }

  let res;
  try {
    res = await fetch(`${API}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (e) {
    const err = new Error('Network error: could not reach the API');
    err.cause = e;
    throw err;
  }

  const ct = res.headers.get('content-type') || '';
  const isJson = ct.includes('application/json');
  const data = isJson ? await res.json().catch(() => ({})) : await res.text();

  if (!res.ok) {
    if (res.status === 401) clearToken();
    const msg = (isJson && data?.error) || data || `${res.status} ${res.statusText}`;
    const err = new Error(msg);
    err.status = res.status;
    err.body = data;
    throw err;
  }

  return data;
}

export const api = {
  health:        () => req('/health'),
  executives:    (scope = 'current')  => req(`/executives?scope=${scope}`),
  activities:    (scope = 'upcoming') => req(`/activities?scope=${scope}`),
  registerInterest: (data) => req('/interests', { method: 'POST', body: data }),
  listInterests:    () => req('/interests'),
  register: (data) => req('/auth/register', { method: 'POST', body: data }),
  login:    (data) => req('/auth/login',    { method: 'POST', body: data }),
  getProfile: ()      => req('/profile',             { auth: true }),
  saveProfile: (data) => req('/profile', { method: 'PUT', body: data, auth: true }),
};
