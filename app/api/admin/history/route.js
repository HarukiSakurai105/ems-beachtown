import { NextResponse } from 'next/server'
import { getSession } from '../../../../lib/auth'
import { getHistory } from '../../../../lib/content-store'

export async function GET() {
  if (!await getSession()) return NextResponse.json({ error: 'Chưa đăng nhập.' }, { status: 401 })
  try {
    return NextResponse.json({ history: await getHistory() })
  } catch {
    return NextResponse.json({ history: [], error: 'Không thể tải lịch sử.' }, { status: 503 })
  }
}

