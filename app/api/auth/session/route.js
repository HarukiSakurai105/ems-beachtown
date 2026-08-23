import { NextResponse } from 'next/server'
import { authConfigured, getSession } from '../../../../lib/auth'
import { isDatabaseConfigured } from '../../../../lib/content-store'

export async function GET() {
  return NextResponse.json({
    user: await getSession(),
    configured: authConfigured(),
    databaseConfigured: isDatabaseConfigured(),
  })
}

