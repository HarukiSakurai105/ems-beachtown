import { residentRules } from '../data/resident-rules'
import { emsRules } from '../data/ems-rules'

export const defaultVersionInfo = {
  version: '1.1.0',
  issuedAt: '2026-08-23',
  updatedAt: '2026-08-23',
  approvedBy: 'Ban Quản lý EMS Beach Town',
  status: 'active',
  changes: [
    {
      version: '1.1.0',
      date: '2026-08-23',
      summary: 'Bổ sung quy định cư dân, bác sĩ, trực thăng, xử phạt và quy trình khiếu nại.',
    },
    {
      version: '1.0.0',
      date: '2026-08-01',
      summary: 'Ban hành cổng tra cứu quy định EMS Beach Town.',
    },
  ],
}

function addVisibility(entries) {
  return entries.map(entry => ({ ...entry, visible: entry.visible !== false }))
}

export function getDefaultContent() {
  return {
    residentRules: addVisibility(structuredClone(residentRules)),
    emsRules: addVisibility(structuredClone(emsRules)),
    versionInfo: structuredClone(defaultVersionInfo),
    source: 'static',
  }
}
