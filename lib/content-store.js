import { getDefaultContent } from './default-content'
import { dbRequest, isSupabaseConfigured } from './supabase-admin'

const CONTENT_ID = 'published'

export function isDatabaseConfigured() {
  return isSupabaseConfigured()
}

export async function getContent() {
  if (!isSupabaseConfigured()) return getDefaultContent()

  try {
    const rows = await dbRequest(`ems_content?id=eq.${CONTENT_ID}&select=payload&limit=1`)
    if (!rows?.[0]?.payload) return getDefaultContent()
    return { ...rows[0].payload, source: 'database' }
  } catch (error) {
    console.error('Unable to read EMS content from Supabase:', error)
    return { ...getDefaultContent(), source: 'fallback' }
  }
}

export async function saveContent(content, actor) {
  if (!isSupabaseConfigured()) throw new Error('DATABASE_NOT_CONFIGURED')

  const savedAt = new Date().toISOString()
  const cleanContent = {
    residentRules: content.residentRules || [],
    emsRules: content.emsRules || [],
    pricingData: content.pricingData || { title: '', services: [], surcharges: [] },
    versionInfo: { ...content.versionInfo, updatedAt: savedAt.slice(0, 10) },
  }

  await dbRequest('ems_content?on_conflict=id', {
    method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify({ id: CONTENT_ID, payload: cleanContent, updated_at: savedAt }),
  })

  await dbRequest('ems_content_history', {
    method: 'POST',
    headers: { Prefer: 'return=minimal' },
    body: JSON.stringify({
      id: crypto.randomUUID(),
      saved_at: savedAt,
      actor_email: actor.email,
      actor_name: actor.name,
      actor_role: actor.role,
      version: cleanContent.versionInfo?.version || 'Không rõ',
      summary: cleanContent.versionInfo?.changes?.[0]?.summary || 'Cập nhật nội dung',
    }),
  })

  return { ...cleanContent, source: 'database' }
}

export async function getHistory() {
  if (!isSupabaseConfigured()) return []
  const rows = await dbRequest('ems_content_history?select=id,saved_at,actor_email,actor_name,actor_role,version,summary&order=saved_at.desc&limit=50')
  return (rows || []).map(row => ({
    id: row.id,
    savedAt: row.saved_at,
    actor: { email: row.actor_email, name: row.actor_name, role: row.actor_role },
    version: row.version,
    summary: row.summary,
  }))
}
