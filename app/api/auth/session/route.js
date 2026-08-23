import { NextResponse } from 'next/server'
import { authStatus, getSession } from '../../../../lib/auth'
import { isDatabaseConfigured } from '../../../../lib/content-store'

export async function GET() {
  const status = await authStatus()
  return NextResponse.json({
    user: await getSession(),
    ...status,
    databaseConfigured: isDatabaseConfigured(),
  })
}
