const MAX_RULES_PER_GROUP = 100
const MAX_ITEMS_PER_RULE = 100
const VALID_ITEM_TYPES = new Set(['normal', 'info', 'warning', 'danger', 'special'])

function isShortText(value, max = 500) {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= max
}

export function validateContent(content) {
  if (!content || !Array.isArray(content.residentRules) || !Array.isArray(content.emsRules)) {
    return 'Dữ liệu phải có danh sách quy định cư dân và nội bộ EMS.'
  }

  for (const [label, rules] of [['Cư dân', content.residentRules], ['Nội bộ EMS', content.emsRules]]) {
    if (rules.length > MAX_RULES_PER_GROUP) return `${label} vượt quá ${MAX_RULES_PER_GROUP} quy định.`
    const ids = new Set()
    for (const rule of rules) {
      if (!isShortText(rule?.id, 120) || !isShortText(rule?.title, 300) || !isShortText(rule?.num, 80)) {
        return `${label} có quy định thiếu ID, số điều hoặc tiêu đề.`
      }
      if (ids.has(rule.id)) return `${label} có ID trùng nhau: ${rule.id}.`
      ids.add(rule.id)
      if ((rule.chapterId || rule.chapterTitle) && (!isShortText(rule.chapterId, 120) || !isShortText(rule.chapterTitle, 200))) {
        return `${rule.title} có mã chương hoặc tên chương không hợp lệ.`
      }
      if (!Array.isArray(rule.items) && !rule.isPenalty) return `${rule.title} chưa có danh sách nội dung.`
      if ((rule.items || []).length > MAX_ITEMS_PER_RULE) return `${rule.title} có quá nhiều nội dung.`
      for (const item of rule.items || []) {
        if (!VALID_ITEM_TYPES.has(item?.type) || !isShortText(item?.text, 10_000)) {
          return `${rule.title} có một nội dung không hợp lệ hoặc đang để trống.`
        }
      }
    }
  }

  if (!isShortText(content.versionInfo?.version, 40)) return 'Phiên bản văn bản không hợp lệ.'
  if (!['active', 'expired'].includes(content.versionInfo?.status)) return 'Trạng thái văn bản không hợp lệ.'
  return null
}
