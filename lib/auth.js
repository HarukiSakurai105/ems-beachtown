import crypto from 'node:crypto'
import { cookies } from 'next/headers'

export const SESSION_COOKIE = 'ems_admin_session'

function secret() {
  return process.env.EMS_SESSION_SECRET || ''
}

function configuredUsers() {
  try {
    const users = JSON.parse(process.env.EMS_ADMIN_USERS || '[]')
    return Array.isArray(users) ? users : []
  } catch {
    return []
  }
}

export function authConfigured() {
  return secret().length >= 32 && configuredUsers().length > 0
}

export function hashPassword(password, salt) {
  return crypto.scryptSync(password, salt, 64).toString('hex')
}

function safeEqual(left, right) {
  const a = Buffer.from(left || '')
  const b = Buffer.from(right || '')
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}

export function verifyCredentials(email, password) {
  const user = configuredUsers().find(entry => entry.email?.toLowerCase() === email?.toLowerCase())
  const [salt, expectedHash] = String(user?.passwordHash || '').split(':')
  if (!user || !salt || !expectedHash || !safeEqual(hashPassword(password, salt), expectedHash)) return null
  return {
    email: user.email,
    name: user.name || user.email,
    role: ['admin', 'editor', 'viewer'].includes(user.role) ? user.role : 'viewer',
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
  return verifySessionToken(store.get(SESSION_COOKIE)?.value)
}
