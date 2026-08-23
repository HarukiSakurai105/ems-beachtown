import { NextResponse } from 'next/server'
import { authStatus, createSessionToken, SESSION_COOKIE, verifyCredentials } from '../../../../lib/auth'

export async function POST(request) {
  const status = await authStatus()
  if (status.setupRequired) {
    return NextResponse.json({ error: 'Hãy tạo tài khoản Admin đầu tiên.', setupRequired: true }, { status: 409 })
  }
  if (!status.configured) {
    return NextResponse.json({ error: status.migrationRequired ? 'Chưa chạy migration tài khoản Supabase.' : 'Hệ thống đăng nhập chưa được cấu hình.' }, { status: 503 })
  }

  const { email, password } = await request.json()
  const user = await verifyCredentials(String(email || ''), String(password || ''))
  if (!user) return NextResponse.json({ error: 'Email hoặc mật khẩu không đúng.' }, { status: 401 })

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
