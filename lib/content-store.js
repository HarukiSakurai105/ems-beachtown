import { getDefaultContent } from './default-content'

const CONTENT_KEY = 'ems:published-content'
const HISTORY_KEY = 'ems:content-history'

function redisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN
  return url && token ? { url: url.replace(/\/$/, ''), token } : null
}

async function command(...args) {
  const config = redisConfig()
  if (!config) throw new Error('DATABASE_NOT_CONFIGURED')

  const response = await fetch(config.url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
    cache: 'no-store',
  })

  if (!response.ok) throw new Error(`DATABASE_ERROR_${response.status}`)
  const payload = await response.json()
  if (payload.error) throw new Error(payload.error)
  return payload.result
}

export function isDatabaseConfigured() {
  return Boolean(redisConfig())
}

export async function getContent() {
  if (!redisConfig()) return getDefaultContent()

  try {
    const raw = await command('GET', CONTENT_KEY)
    if (!raw) return getDefaultContent()
    return { ...JSON.parse(raw), source: 'database' }
  } catch (error) {
    console.error('Unable to read EMS content store:', error)
    return { ...getDefaultContent(), source: 'fallback' }
  }
}

export async function saveContent(content, actor) {
  if (!redisConfig()) throw new Error('DATABASE_NOT_CONFIGURED')

  const savedAt = new Date().toISOString()
  const cleanContent = {
    residentRules: content.residentRules || [],
    emsRules: content.emsRules || [],
    pricingData: content.pricingData || { title: '', services: [], surcharges: [] },
    versionInfo: { ...content.versionInfo, updatedAt: savedAt.slice(0, 10) },
  }

  await command('SET', CONTENT_KEY, JSON.stringify(cleanContent))
  await command('LPUSH', HISTORY_KEY, JSON.stringify({
    id: crypto.randomUUID(),
    savedAt,
    actor: { email: actor.email, name: actor.name, role: actor.role },
    version: cleanContent.versionInfo?.version || 'Không rõ',
    summary: cleanContent.versionInfo?.changes?.[0]?.summary || 'Cập nhật nội dung',
  }))
  await command('LTRIM', HISTORY_KEY, '0', '49')

  return { ...cleanContent, source: 'database' }
}

export async function getHistory() {
  if (!redisConfig()) return []
  const rows = await command('LRANGE', HISTORY_KEY, '0', '49')
  return (rows || []).map(row => JSON.parse(row))
}

