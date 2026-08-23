import { dbRequest, isSupabaseConfigured } from './supabase-admin'

function publicUser(row) {
  if (!row) return null
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    role: row.role,
    active: row.active,
    createdAt: row.created_at,
    lastLoginAt: row.last_login_at,
  }
}

export async function countUsers() {
  if (!isSupabaseConfigured()) return 0
  const rows = await dbRequest('ems_users?select=id&limit=1')
  return rows?.length || 0
}

export async function getUserByEmail(email) {
  const normalized = encodeURIComponent(String(email || '').trim().toLowerCase())
  const rows = await dbRequest(`ems_users?email=eq.${normalized}&select=*&limit=1`)
  return rows?.[0] || null
}

export async function getUserById(id) {
  if (!id) return null
  const rows = await dbRequest(`ems_users?id=eq.${encodeURIComponent(id)}&select=*&limit=1`)
  return rows?.[0] || null
}

export async function listUsers() {
  const rows = await dbRequest('ems_users?select=id,email,name,role,active,created_at,last_login_at&order=created_at.asc')
  return (rows || []).map(publicUser)
}

export async function createFirstAdmin({ email, name, passwordHash }) {
  const rows = await dbRequest('rpc/bootstrap_ems_admin', {
    method: 'POST',
    body: JSON.stringify({ p_email: email.trim().toLowerCase(), p_name: name.trim(), p_password_hash: passwordHash }),
  })
  return publicUser(Array.isArray(rows) ? rows[0] : rows)
}

export async function createUser({ email, name, role, passwordHash, createdBy }) {
  const rows = await dbRequest('ems_users', {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify({ email: email.trim().toLowerCase(), name: name.trim(), role, password_hash: passwordHash, created_by: createdBy }),
  })
  return publicUser(rows?.[0])
}

export async function updateUser(id, patch) {
  const allowed = {}
  if (patch.name !== undefined) allowed.name = String(patch.name).trim()
  if (patch.role !== undefined) allowed.role = patch.role
  if (patch.active !== undefined) allowed.active = Boolean(patch.active)
  if (patch.passwordHash !== undefined) allowed.password_hash = patch.passwordHash
  allowed.updated_at = new Date().toISOString()

  const rows = await dbRequest(`ems_users?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify(allowed),
  })
  return publicUser(rows?.[0])
}

export async function deleteUser(id) {
  await dbRequest(`ems_users?id=eq.${encodeURIComponent(id)}`, { method: 'DELETE' })
}

export async function recordLogin(id) {
  await dbRequest(`ems_users?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: { Prefer: 'return=minimal' },
    body: JSON.stringify({ last_login_at: new Date().toISOString() }),
  })
}

