import { NextResponse } from 'next/server'
import { getSession } from '../../../../lib/auth'
import { getContent, saveContent } from '../../../../lib/content-store'

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
    ['pricingData', 'services'],
    ['pricingData', 'surcharges'],
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
  const next = await request.json()
  if (!Array.isArray(next.residentRules) || !Array.isArray(next.emsRules) || !Array.isArray(next.pricingData?.services)) {
    return NextResponse.json({ error: 'Dữ liệu gửi lên không đúng định dạng.' }, { status: 400 })
  }
  const previous = await getContent()
  if (user.role !== 'admin' && containsDeletion(previous, next)) {
    return NextResponse.json({ error: 'Chỉ Admin được phép xóa nội dung.' }, { status: 403 })
  }

  try {
    return NextResponse.json(await saveContent(next, user))
  } catch (error) {
    const message = error.message === 'DATABASE_NOT_CONFIGURED'
      ? 'Database chưa được cấu hình trên Vercel.'
      : 'Không thể lưu dữ liệu. Vui lòng thử lại.'
    return NextResponse.json({ error: message }, { status: 503 })
  }
}
