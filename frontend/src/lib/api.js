const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080'

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  const text = await res.text()
  const data = text ? safeJson(text) : null
  if (!res.ok) throw new Error((data && data.message) || text || `Error ${res.status}`)
  return data
}

function safeJson(t) { try { return JSON.parse(t) } catch { return t } }

export const api = {
  login: (data) => request('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  register: (data) => request('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  saveProfile: (userId, profile) =>
    request(`/provider/profile/${userId}`, { method: 'POST', body: JSON.stringify(profile) }),
  searchNearby: (lat, lng, radius = 5) =>
    request(`/providers/nearby?lat=${lat}&lng=${lng}&radius=${radius}`),
}
