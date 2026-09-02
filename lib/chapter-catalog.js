export const DEFAULT_CHAPTERS = [
  { id: 'ch1', num: '1', title: 'Quy định chung & Tác phong' },
  { id: 'ch2', num: '2', title: 'Quy trình Cấp cứu (SOP)' },
  { id: 'ch3', num: '3', title: 'Sử dụng Trang thiết bị & Xe' },
  { id: 'ch4', num: '4', title: 'Quy tắc Ứng xử' },
  { id: 'ch5', num: '5', title: 'Hệ thống Kỷ luật' },
]

const LEGACY_RULE_CHAPTERS = {
  'ems-dieu1': 'ch1', 'ems-dieu2': 'ch1', 'res-dieu1': 'ch1', 'res-dieu2': 'ch1',
  'ems-dieu3': 'ch2', 'ems-dieu4': 'ch2', 'res-dieu3': 'ch2', 'res-dieu6': 'ch2',
  'ems-dieu5': 'ch3', 'ems-dieu8': 'ch3',
  'ems-dieu6': 'ch4', 'ems-dieu7': 'ch4', 'ems-dieu10': 'ch4', 'ems-dieu11': 'ch4', 'ems-dieu13': 'ch4', 'res-dieu4': 'ch4',
}

export function getRuleChapter(rule) {
  const fallbackId = LEGACY_RULE_CHAPTERS[rule?.id] || 'ch5'
  const fallback = DEFAULT_CHAPTERS.find(chapter => chapter.id === fallbackId) || DEFAULT_CHAPTERS[0]
  return {
    id: rule?.chapterId?.trim() || fallback.id,
    title: rule?.chapterTitle?.trim() || fallback.title,
  }
}

export function buildChapterCatalog(rules = [], includeAllDefaults = false) {
  const usedIds = new Set(rules.map(rule => getRuleChapter(rule).id))
  const chapters = includeAllDefaults ? [...DEFAULT_CHAPTERS] : DEFAULT_CHAPTERS.filter(chapter => usedIds.has(chapter.id))
  const known = new Set(DEFAULT_CHAPTERS.map(chapter => chapter.id))

  for (const rule of rules) {
    const chapter = getRuleChapter(rule)
    if (!known.has(chapter.id)) {
      chapters.push({ id: chapter.id, title: chapter.title, num: String(chapters.length + 1) })
      known.add(chapter.id)
    }
  }

  return chapters.map((chapter, index) => ({ ...chapter, num: String(index + 1) }))
}

