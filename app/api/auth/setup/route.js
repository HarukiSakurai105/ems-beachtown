import { NextResponse } from 'next/server'
import { authStatus, createPasswordHash, createSessionToken, SESSION_COOKIE } from '../../../../lib/auth'
import { createFirstAdmin } from '../../../../lib/user-store'

function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request) {
  const status = await authStatus()
  if (!status.setupRequired) {
    return NextResponse.json({ error: status.configured ? 'Thiết lập ban đầu đã hoàn tất.' : 'Supabase chưa sẵn sàng hoặc chưa chạy migration.' }, { status: status.configured ? 409 : 503 })
  }

  const body = await request.json()
  const email = String(body.email || '').trim().toLowerCase()
  const name = String(body.name || '').trim()
  const password = String(body.password || '')

  if (!validEmail(email) || name.length < 2 || name.length > 80) {
    return NextResponse.json({ error: 'Email hoặc tên hiển thị không hợp lệ.' }, { status: 400 })
  }
  if (password.length < 12 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    return NextResponse.json({ error: 'Mật khẩu cần ít nhất 12 ký tự, có chữ và số.' }, { status: 400 })
  }

  try {
    const user = await createFirstAdmin({ email, name, passwordHash: createPasswordHash(password) })
    const response = NextResponse.json({ user })
    response.cookies.set(SESSION_COOKIE, createSessionToken(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 8 * 60 * 60,
    })
    return response
  } catch (error) {
    const alreadyCompleted = error.details?.includes('SETUP_ALREADY_COMPLETED')
    return NextResponse.json({ error: alreadyCompleted ? 'Một Admin khác đã hoàn tất thiết lập.' : 'Không thể tạo tài khoản. Hãy kiểm tra migration Supabase.' }, { status: alreadyCompleted ? 409 : 503 })
  }
}

