import { NextResponse } from 'next/server'
import { authStatus, createSessionToken, SESSION_COOKIE, verifyCredentials } from '../../../../lib/auth'

const LOGIN_WINDOW_MS = 15 * 60 * 1000
const MAX_LOGIN_FAILURES = 5
const loginAttempts = globalThis.__emsLoginAttempts || new Map()
globalThis.__emsLoginAttempts = loginAttempts

function getClientKey(request) {
  return (request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown').split(',')[0].trim()
}

function getAttempt(key) {
  const attempt = loginAttempts.get(key)
  if (attempt && attempt.resetAt > Date.now()) return attempt
  loginAttempts.delete(key)
  return { count: 0, resetAt: Date.now() + LOGIN_WINDOW_MS }
}

export async function POST(request) {
  const clientKey = getClientKey(request)
  const attempt = getAttempt(clientKey)
  if (attempt.count >= MAX_LOGIN_FAILURES) {
    const retryAfter = Math.max(1, Math.ceil((attempt.resetAt - Date.now()) / 1000))
    return NextResponse.json({ error: 'Bạn đã thử đăng nhập quá nhiều lần. Vui lòng chờ rồi thử lại.' }, { status: 429, headers: { 'Retry-After': String(retryAfter) } })
  }

  const status = await authStatus()
  if (status.setupRequired) {
    return NextResponse.json({ error: 'Hãy tạo tài khoản Admin đầu tiên.', setupRequired: true }, { status: 409 })
  }
  if (!status.configured) {
    return NextResponse.json({ error: status.migrationRequired ? 'Chưa chạy migration tài khoản Supabase.' : 'Hệ thống đăng nhập chưa được cấu hình.' }, { status: 503 })
  }

  let credentials
  try {
    credentials = await request.json()
  } catch {
    return NextResponse.json({ error: 'Dữ liệu đăng nhập không hợp lệ.' }, { status: 400 })
  }
  const { email, password } = credentials
  const user = await verifyCredentials(String(email || ''), String(password || ''))
  if (!user) {
    loginAttempts.set(clientKey, { count: attempt.count + 1, resetAt: attempt.resetAt })
    return NextResponse.json({ error: 'Email hoặc mật khẩu không đúng.' }, { status: 401 })
  }

  loginAttempts.delete(clientKey)

  const response = NextResponse.json({ user })
  response.cookies.set(SESSION_COOKIE, createSessionToken(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 8 * 60 * 60,
  })
  return response
}
