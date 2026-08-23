import crypto from 'node:crypto'
import { cookies } from 'next/headers'
import { countUsers, getUserByEmail, getUserById, recordLogin } from './user-store'
import { isSupabaseConfigured } from './supabase-admin'

export const SESSION_COOKIE = 'ems_admin_session'

function secret() {
  return process.env.EMS_SESSION_SECRET || process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || ''
}

export async function authStatus() {
  if (!isSupabaseConfigured() || secret().length < 32) return { configured: false, setupRequired: false }
  try {
    const users = await countUsers()
    return { configured: users > 0, setupRequired: users === 0 }
  } catch {
    return { configured: false, setupRequired: false, migrationRequired: true }
  }
}

export function hashPassword(password, salt) {
  return crypto.scryptSync(password, salt, 64).toString('hex')
}

export function createPasswordHash(password) {
  const salt = crypto.randomBytes(16).toString('hex')
  return `${salt}:${hashPassword(password, salt)}`
}

function safeEqual(left, right) {
  const a = Buffer.from(left || '')
  const b = Buffer.from(right || '')
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}

export async function verifyCredentials(email, password) {
  const user = await getUserByEmail(email)
  const [salt, expectedHash] = String(user?.password_hash || '').split(':')
  if (!user || !user.active || !salt || !expectedHash || !safeEqual(hashPassword(password, salt), expectedHash)) return null
  await recordLogin(user.id)
  return {
    id: user.id,
    email: user.email,
    name: user.name || user.email,
    role: user.role,
  }
}

function encode(value) {
  return Buffer.from(value).toString('base64url')
}

function sign(value) {
  return crypto.createHmac('sha256', secret()).update(value).digest('base64url')
}

export function createSessionToken(user) {
  const payload = encode(JSON.stringify({ ...user, exp: Date.now() + 8 * 60 * 60 * 1000 }))
  return `${payload}.${sign(payload)}`
}

export function verifySessionToken(token) {
  if (!token || !secret()) return null
  const [payload, signature] = token.split('.')
  if (!payload || !safeEqual(sign(payload), signature)) return null

  try {
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
    return session.exp > Date.now() ? session : null
  } catch {
    return null
  }
}

export async function getSession() {
  const store = await cookies()
  const token = verifySessionToken(store.get(SESSION_COOKIE)?.value)
  if (!token?.id) return null
  try {
    const user = await getUserById(token.id)
    if (!user?.active) return null
    return { id: user.id, email: user.email, name: user.name, role: user.role }
  } catch {
    return null
  }
}
