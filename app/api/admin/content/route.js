import { NextResponse } from 'next/server'
import { getSession } from '../../../../lib/auth'
import { getContent, saveContent } from '../../../../lib/content-store'
import { validateContent } from '../../../../lib/content-validation'

function canEdit(user) {
  return user && ['admin', 'editor'].includes(user.role)
}

function ids(entries = []) {
  return new Set(entries.map(entry => entry.id))
}

function containsDeletion(previous, next) {
  const collections = [
    ['residentRules'],
    ['emsRules'],
  ]
  return collections.some(path => {
    const before = path.reduce((value, key) => value?.[key], previous) || []
    const after = ids(path.reduce((value, key) => value?.[key], next) || [])
    return [...ids(before)].some(id => !after.has(id))
  })
}

export async function GET() {
  const user = await getSession()
  if (!user) return NextResponse.json({ error: 'Chưa đăng nhập.' }, { status: 401 })
  return NextResponse.json(await getContent())
}

export async function PUT(request) {
  const user = await getSession()
  if (!canEdit(user)) return NextResponse.json({ error: 'Bạn không có quyền chỉnh sửa.' }, { status: 403 })

  const size = Number(request.headers.get('content-length') || 0)
  if (size > 1_000_000) return NextResponse.json({ error: 'Nội dung vượt quá giới hạn 1 MB.' }, { status: 413 })
  let next
  try { next = await request.json() } catch { return NextResponse.json({ error: 'Dữ liệu gửi lên không phải JSON hợp lệ.' }, { status: 400 }) }
  const validationError = validateContent(next)
  if (validationError) return NextResponse.json({ error: validationError }, { status: 400 })
  const previous = await getContent()
  if (previous.source === 'fallback') {
    return NextResponse.json({ error: 'Supabase đang tạm mất kết nối. Hệ thống đã chặn công bố để tránh ghi đè dữ liệu.' }, { status: 503 })
  }
  if (user.role !== 'admin' && containsDeletion(previous, next)) {
    return NextResponse.json({ error: 'Chỉ Admin được phép xóa nội dung.' }, { status: 403 })
  }

  try {
    return NextResponse.json(await saveContent(next, user, previous))
  } catch (error) {
    if (error.message === 'CONTENT_CONFLICT') {
      return NextResponse.json({ error: 'Một người khác vừa công bố nội dung mới. Hãy tải lại trang để tránh ghi đè dữ liệu.', conflict: true }, { status: 409 })
    }
    const message = error.message === 'DATABASE_NOT_CONFIGURED'
      ? 'Supabase chưa được cấu hình trên Vercel.'
      : 'Không thể lưu dữ liệu. Vui lòng thử lại.'
    return NextResponse.json({ error: message }, { status: 503 })
  }
}
