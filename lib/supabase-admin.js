export function supabaseConfig() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY
  return url && key ? { url: url.replace(/\/$/, ''), key } : null
}

export function isSupabaseConfigured() {
  return Boolean(supabaseConfig())
}

export async function dbRequest(path, options = {}) {
  const config = supabaseConfig()
  if (!config) throw new Error('DATABASE_NOT_CONFIGURED')

  const response = await fetch(`${config.url}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${config.key}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    const details = await response.text()
    console.error(`Supabase request failed (${response.status}):`, details)
    const error = new Error(`DATABASE_ERROR_${response.status}`)
    error.status = response.status
    error.details = details
    throw error
  }

  if (response.status === 204) return null
  const text = await response.text()
  return text ? JSON.parse(text) : null
}

