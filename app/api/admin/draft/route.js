import { NextResponse } from 'next/server'
import { getSession } from '../../../../lib/auth'
import { deleteDraft, getDraft, saveDraft } from '../../../../lib/content-store'
import { validateContent } from '../../../../lib/content-validation'

function canEdit(user) {
  return user && ['admin', 'editor'].includes(user.role)
}

export async function GET() {
  const user = await getSession()
  if (!user) return NextResponse.json({ error: 'Chưa đăng nhập.' }, { status: 401 })
  try {
    return NextResponse.json({ draft: await getDraft(user) })
  } catch {
    return NextResponse.json({ error: 'Không thể tải bản nháp.' }, { status: 503 })
  }
}

export async function PUT(request) {
  const user = await getSession()
  if (!canEdit(user)) return NextResponse.json({ error: 'Bạn không có quyền lưu bản nháp.' }, { status: 403 })
  const size = Number(request.headers.get('content-length') || 0)
  if (size > 1_000_000) return NextResponse.json({ error: 'Bản nháp vượt quá giới hạn 1 MB.' }, { status: 413 })
  let content
  try { content = await request.json() } catch { return NextResponse.json({ error: 'Dữ liệu bản nháp không hợp lệ.' }, { status: 400 }) }
  const validationError = validateContent(content)
  if (validationError) return NextResponse.json({ error: validationError }, { status: 400 })
  try {
    return NextResponse.json({ draft: await saveDraft(content, user) })
  } catch {
    return NextResponse.json({ error: 'Không thể lưu bản nháp lên Supabase.' }, { status: 503 })
  }
}

export async function DELETE() {
  const user = await getSession()
  if (!canEdit(user)) return NextResponse.json({ error: 'Bạn không có quyền xóa bản nháp.' }, { status: 403 })
  try {
    await deleteDraft(user)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Không thể xóa bản nháp.' }, { status: 503 })
  }
}
