import { NextResponse } from 'next/server'

export async function POST(request) {
  const body = await request.json()
  if (body.website) return NextResponse.json({ ok: true })
  const category = String(body.category || '').slice(0, 80)
  const name = String(body.name || '').trim().slice(0, 80)
  const details = String(body.details || '').trim().slice(0, 1500)
  if (!name || details.length < 10) return NextResponse.json({ error: 'Vui lòng nhập đầy đủ tên và nội dung chi tiết.' }, { status: 400 })

  const webhook = process.env.EMS_DISCORD_WEBHOOK_URL
  if (!webhook) return NextResponse.json({ error: 'Form chưa được kết nối. Vui lòng gửi trực tiếp tại Discord Beach Town.' }, { status: 503 })

  const response = await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'EMS Website Support',
      allowed_mentions: { parse: [] },
      embeds: [{ title: category, color: 15153478, fields: [{ name: 'Người gửi', value: name }, { name: 'Nội dung', value: details }], timestamp: new Date().toISOString() }],
    }),
  })
  if (!response.ok) return NextResponse.json({ error: 'Không thể gửi phản hồi lúc này.' }, { status: 502 })
  return NextResponse.json({ ok: true })
}
