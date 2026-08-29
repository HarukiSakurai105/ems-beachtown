import { NextResponse } from 'next/server'
import { getSession } from '../../../../../../lib/auth'
import { restoreContent } from '../../../../../../lib/content-store'

export async function POST(request, { params }) {
  const user = await getSession()
  if (!user) return NextResponse.json({ error: 'Chưa đăng nhập.' }, { status: 401 })
  if (user.role !== 'admin') return NextResponse.json({ error: 'Chỉ Admin được khôi phục phiên bản.' }, { status: 403 })
  const { id } = await params
  let body
  try { body = await request.json() } catch { return NextResponse.json({ error: 'Dữ liệu khôi phục không hợp lệ.' }, { status: 400 }) }
  const { revision } = body
  try {
    return NextResponse.json(await restoreContent(id, user, revision))
  } catch (error) {
    if (error.message === 'REVISION_NOT_FOUND') return NextResponse.json({ error: 'Phiên bản cũ này chưa có snapshot để khôi phục.' }, { status: 404 })
    if (error.message === 'CONTENT_CONFLICT') return NextResponse.json({ error: 'Nội dung vừa được người khác cập nhật. Hãy tải lại trước khi khôi phục.', conflict: true }, { status: 409 })
    return NextResponse.json({ error: 'Không thể khôi phục phiên bản.' }, { status: 503 })
  }
}
