import crypto from 'node:crypto'
import { getDefaultContent } from './default-content'
import { dbRequest, isSupabaseConfigured } from './supabase-admin'

const CONTENT_ID = 'published'
const DRAFT_PREFIX = 'draft:'
const REVISION_PREFIX = 'revision:'

function normalizeContent(content, source) {
  const residentRules = (content?.residentRules || [])
    .filter(rule => rule.id !== 'res-dieu5')
    .map((rule, index) => rule.isPenalty ? rule : { ...rule, num: 'Điều ' + (index + 1) })
  const emsRules = (content?.emsRules || []).map(rule => ({
    ...rule,
    keywords: rule.keywords?.replace(/bảng giá/gi, '').replace(/\s+/g, ' ').trim() || '',
    items: (rule.items || []).map(item => ({
      ...item,
      text: item.text?.replace(
        'Không thu thêm bất kỳ khoản phí nào ngoài bảng giá bệnh viện, trừ khi người dân tự nguyện tips.',
        'Không tự ý thu thêm tiền trái quy định; chỉ nhận thêm khi người dân tự nguyện tips.'
      ) || '',
    })),
  }))
  const changes = (content?.versionInfo?.changes || []).map(item => ({
    ...item,
    summary: item.summary?.replace('quy định và bảng giá', 'quy định').replace('bảng giá và ', '') || '',
  }))

  return {
    residentRules,
    emsRules,
    versionInfo: { ...content?.versionInfo, changes },
    source,
  }
}

export function isDatabaseConfigured() {
  return isSupabaseConfigured()
}

async function getContentRow(id) {
  const rows = await dbRequest(`ems_content?id=eq.${encodeURIComponent(id)}&select=payload,updated_at&limit=1`)
  return rows?.[0] || null
}

export async function getContent() {
  if (!isSupabaseConfigured()) return getDefaultContent()

  try {
    const row = await getContentRow(CONTENT_ID)
    if (!row?.payload) return getDefaultContent()
    return { ...normalizeContent(row.payload, 'database'), revision: row.updated_at }
  } catch (error) {
    console.error('Unable to read EMS content from Supabase:', error)
    return normalizeContent(getDefaultContent(), 'fallback')
  }
}

function cleanContent(content, savedAt = new Date().toISOString()) {
  return {
    residentRules: content.residentRules || [],
    emsRules: content.emsRules || [],
    versionInfo: { ...content.versionInfo, updatedAt: savedAt.slice(0, 10) },
  }
}

function draftId(actor) {
  return `${DRAFT_PREFIX}${actor.id}`
}

export async function getDraft(actor) {
  if (!isSupabaseConfigured()) return null
  const row = await getContentRow(draftId(actor))
  if (!row?.payload?.content) return null
  return {
    content: { ...normalizeContent(row.payload.content, 'draft'), revision: row.payload.baseRevision || null },
    savedAt: row.updated_at,
    baseRevision: row.payload.baseRevision || null,
  }
}

export async function saveDraft(content, actor) {
  if (!isSupabaseConfigured()) throw new Error('DATABASE_NOT_CONFIGURED')
  const savedAt = new Date().toISOString()
  const baseRevision = content.revision || null
  const payload = { content: cleanContent(content, savedAt), baseRevision, actor: { id: actor.id, name: actor.name, email: actor.email } }
  const rows = await dbRequest('ems_content?on_conflict=id', {
    method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
    body: JSON.stringify({ id: draftId(actor), payload, updated_at: savedAt }),
  })
  return { content: { ...payload.content, source: 'draft', revision: baseRevision }, savedAt: rows?.[0]?.updated_at || savedAt, baseRevision }
}

export async function deleteDraft(actor) {
  if (!isSupabaseConfigured()) return
  await dbRequest(`ems_content?id=eq.${encodeURIComponent(draftId(actor))}`, { method: 'DELETE' })
}

function describeChanges(previous, next) {
  const groups = [
    ['Quy định cư dân', previous?.residentRules, next?.residentRules],
    ['Quy định nội bộ', previous?.emsRules, next?.emsRules],
  ]
  const changes = []
  const nameOf = item => item?.title || item?.name || item?.num || item?.id

  for (const [group, beforeList = [], afterList = []] of groups) {
    const before = new Map(beforeList.map(item => [item.id, item]))
    const after = new Map(afterList.map(item => [item.id, item]))
    for (const [id, item] of after) {
      if (!before.has(id)) changes.push(`Thêm ${group}: ${nameOf(item)}`)
      else if (before.get(id).visible !== item.visible) changes.push(`${item.visible === false ? 'Ẩn' : 'Hiện'} ${group}: ${nameOf(item)}`)
      else if (JSON.stringify(before.get(id)) !== JSON.stringify(item)) changes.push(`Sửa ${group}: ${nameOf(item)}`)
    }
    for (const [id, item] of before) if (!after.has(id)) changes.push(`Xóa ${group}: ${nameOf(item)}`)
  }

  if (!changes.length && JSON.stringify(previous?.versionInfo) !== JSON.stringify(next?.versionInfo)) changes.push('Cập nhật thông tin văn bản')
  return changes.length ? changes.slice(0, 8).join(' • ') : 'Công bố lại nội dung không thay đổi'
}

async function cleanupPublish(historyId) {
  await Promise.allSettled([
    dbRequest(`ems_content?id=eq.${encodeURIComponent(`${REVISION_PREFIX}${historyId}`)}`, { method: 'DELETE' }),
    dbRequest(`ems_content_history?id=eq.${encodeURIComponent(historyId)}`, { method: 'DELETE' }),
  ])
}

export async function saveContent(content, actor, previous = null, summaryOverride = '') {
  if (!isSupabaseConfigured()) throw new Error('DATABASE_NOT_CONFIGURED')

  const savedAt = new Date().toISOString()
  const nextContent = cleanContent(content, savedAt)
  const historyId = crypto.randomUUID()
  const expectedRevision = content.revision || null

  try {
    await dbRequest('ems_content', {
      method: 'POST',
      headers: { Prefer: 'return=minimal' },
      body: JSON.stringify({ id: `${REVISION_PREFIX}${historyId}`, payload: nextContent, updated_at: savedAt }),
    })

    await dbRequest('ems_content_history', {
      method: 'POST',
      headers: { Prefer: 'return=minimal' },
      body: JSON.stringify({
        id: historyId,
        saved_at: savedAt,
        actor_email: actor.email,
        actor_name: actor.name,
        actor_role: actor.role,
        version: nextContent.versionInfo?.version || 'Không rõ',
        summary: summaryOverride || describeChanges(previous, nextContent),
      }),
    })

    let rows
    if (expectedRevision) {
      rows = await dbRequest(`ems_content?id=eq.${CONTENT_ID}&updated_at=eq.${encodeURIComponent(expectedRevision)}`, {
        method: 'PATCH',
        headers: { Prefer: 'return=representation' },
        body: JSON.stringify({ payload: nextContent, updated_at: savedAt }),
      })
      if (!rows?.length) {
        const error = new Error('CONTENT_CONFLICT')
        throw error
      }
    } else {
      rows = await dbRequest('ems_content?on_conflict=id', {
        method: 'POST',
        headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
        body: JSON.stringify({ id: CONTENT_ID, payload: nextContent, updated_at: savedAt }),
      })
    }
  } catch (error) {
    await cleanupPublish(historyId)
    throw error
  }

  await deleteDraft(actor).catch(() => {})
  return { ...nextContent, source: 'database', revision: savedAt }
}

export async function restoreContent(historyId, actor, expectedRevision) {
  const row = await getContentRow(`${REVISION_PREFIX}${historyId}`)
  if (!row?.payload) throw new Error('REVISION_NOT_FOUND')
  const previous = await getContent()
  return saveContent({ ...row.payload, revision: expectedRevision }, actor, previous, `Khôi phục phiên bản ${row.payload.versionInfo?.version || ''} từ lịch sử`)
}

export async function getHistory() {
  if (!isSupabaseConfigured()) return []
  const rows = await dbRequest('ems_content_history?select=id,saved_at,actor_email,actor_name,actor_role,version,summary&order=saved_at.desc&limit=50')
  let restorable = new Set()
  try {
    const snapshots = await dbRequest(`ems_content?id=like.${REVISION_PREFIX}*&select=id`)
    restorable = new Set((snapshots || []).map(row => row.id.slice(REVISION_PREFIX.length)))
  } catch {}
  return (rows || []).map(row => ({
    id: row.id,
    savedAt: row.saved_at,
    actor: { email: row.actor_email, name: row.actor_name, role: row.actor_role },
    version: row.version,
    summary: row.summary,
    restorable: restorable.has(row.id),
  }))
}
