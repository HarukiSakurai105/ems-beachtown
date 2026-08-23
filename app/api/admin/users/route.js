import { NextResponse } from 'next/server'
import { createPasswordHash, getSession } from '../../../../lib/auth'
import { createUser, deleteUser, listUsers, updateUser } from '../../../../lib/user-store'

const roles = ['admin', 'editor', 'viewer']

async function adminSession() {
  const user = await getSession()
  return user?.role === 'admin' ? user : null
}

function validPassword(password) {
  return password.length >= 12 && /[A-Za-z]/.test(password) && /\d/.test(password)
}

export async function GET() {
  if (!await adminSession()) return NextResponse.json({ error: 'Chỉ Admin được quản lý tài khoản.' }, { status: 403 })
  return NextResponse.json({ users: await listUsers() })
}

export async function POST(request) {
  const actor = await adminSession()
  if (!actor) return NextResponse.json({ error: 'Chỉ Admin được tạo tài khoản.' }, { status: 403 })
  const body = await request.json()
  const email = String(body.email || '').trim()
  const name = String(body.name || '').trim()
  const role = String(body.role || '')
  const password = String(body.password || '')
  if (!email.includes('@') || name.length < 2 || !roles.includes(role) || !validPassword(password)) {
    return NextResponse.json({ error: 'Thông tin không hợp lệ. Mật khẩu cần ít nhất 12 ký tự, có chữ và số.' }, { status: 400 })
  }
  try {
    const user = await createUser({ email, name, role, passwordHash: createPasswordHash(password), createdBy: actor.id })
    return NextResponse.json({ user }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error.status === 409 ? 'Email này đã tồn tại.' : 'Không thể tạo tài khoản.' }, { status: error.status === 409 ? 409 : 503 })
  }
}

export async function PATCH(request) {
  const actor = await adminSession()
  if (!actor) return NextResponse.json({ error: 'Chỉ Admin được chỉnh tài khoản.' }, { status: 403 })
  const body = await request.json()
  const users = await listUsers()
  const target = users.find(user => user.id === body.id)
  if (!target) return NextResponse.json({ error: 'Không tìm thấy tài khoản.' }, { status: 404 })

  const patch = {}
  if (body.name !== undefined) patch.name = String(body.name)
  if (body.role !== undefined) {
    if (!roles.includes(body.role)) return NextResponse.json({ error: 'Vai trò không hợp lệ.' }, { status: 400 })
    patch.role = body.role
  }
  if (body.active !== undefined) patch.active = Boolean(body.active)
  if (body.password !== undefined) {
    const password = String(body.password)
    if (!validPassword(password)) return NextResponse.json({ error: 'Mật khẩu cần ít nhất 12 ký tự, có chữ và số.' }, { status: 400 })
    patch.passwordHash = createPasswordHash(password)
  }

  if (target.id === actor.id && (patch.role && patch.role !== 'admin' || patch.active === false)) {
    return NextResponse.json({ error: 'Bạn không thể tự hạ quyền hoặc khóa chính mình.' }, { status: 400 })
  }
  const activeAdmins = users.filter(user => user.role === 'admin' && user.active)
  if (target.role === 'admin' && target.active && activeAdmins.length === 1 && (patch.role && patch.role !== 'admin' || patch.active === false)) {
    return NextResponse.json({ error: 'Hệ thống phải còn ít nhất một Admin hoạt động.' }, { status: 400 })
  }

  return NextResponse.json({ user: await updateUser(target.id, patch) })
}

export async function DELETE(request) {
  const actor = await adminSession()
  if (!actor) return NextResponse.json({ error: 'Chỉ Admin được xóa tài khoản.' }, { status: 403 })
  const { id } = await request.json()
  if (id === actor.id) return NextResponse.json({ error: 'Bạn không thể tự xóa tài khoản đang đăng nhập.' }, { status: 400 })
  const users = await listUsers()
  const target = users.find(user => user.id === id)
  if (!target) return NextResponse.json({ error: 'Không tìm thấy tài khoản.' }, { status: 404 })
  if (target.role === 'admin' && target.active && users.filter(user => user.role === 'admin' && user.active).length === 1) {
    return NextResponse.json({ error: 'Hệ thống phải còn ít nhất một Admin hoạt động.' }, { status: 400 })
  }
  await deleteUser(id)
  return NextResponse.json({ ok: true })
}

