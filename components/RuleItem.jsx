'use client'
import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import clsx from 'clsx'

function parseText(text) {
  // Bold (**text**), code (`text`)
  const parts = []
  const re = /(`[^`]+`|\*\*[^*]+\*\*)/g
  let last = 0, m
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push({ t: 'text', v: text.slice(last, m.index) })
    const raw = m[0]
    if (raw.startsWith('`')) parts.push({ t: 'code', v: raw.slice(1, -1) })
    else parts.push({ t: 'bold', v: raw.slice(2, -2) })
    last = m.index + raw.length
  }
  if (last < text.length) parts.push({ t: 'text', v: text.slice(last) })
  return parts
}

function RichText({ text, highlight }) {
  const parts = parseText(text)
  return (
    <>
      {parts.map((p, i) => {
        if (p.t === 'code') return <code key={i}>{p.v}</code>
        if (p.t === 'bold') return <strong key={i}>{p.v}</strong>
        // highlight search matches
        if (highlight && p.v.toLowerCase().includes(highlight.toLowerCase())) {
          const idx = p.v.toLowerCase().indexOf(highlight.toLowerCase())
          return (
            <span key={i}>
              {p.v.slice(0, idx)}
              <mark>{p.v.slice(idx, idx + highlight.length)}</mark>
              {p.v.slice(idx + highlight.length)}
            </span>
          )
        }
        return <span key={i}>{p.v}</span>
      })}
    </>
  )
}

const variantMap = { danger: 'mdt-tag-danger', warning: 'mdt-tag-warning', info: 'mdt-tag-info', normal: 'mdt-tag-normal' }
const variantLabels = { danger: 'Cấm', warning: 'Lưu ý', info: 'Hướng dẫn', normal: 'Quy định' }

export default function RuleItem({ item, highlight, index }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(item.text.replace(/`|\*\*/g, ''))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (item.type === 'special') {
    return (
      <div className="my-3 border border-[#ffc530] bg-[#332905] p-4">
        <p className="mdt-display mb-1.5 text-sm text-[#ffc530]">{item.title}</p>
        <p className="text-sm leading-relaxed text-[var(--ink)]">
          <RichText text={item.text} highlight={highlight} />
        </p>
      </div>
    )
  }

  return (
    <li
      className="group flex items-start gap-3 border-t border-[#1a252c] py-3 text-sm leading-relaxed first:border-t-0"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <span className={clsx('mdt-tag mt-0.5', variantMap[item.type] || variantMap.normal)}>{variantLabels[item.type] || variantLabels.normal}</span>
      <span className="min-w-0 flex-1 text-[var(--ink)]">
        <RichText text={item.text} highlight={highlight} />
      </span>
      <button
        onClick={handleCopy}
        className="mdt-rule-copy flex-shrink-0 p-1 text-[var(--muted)] sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100"
        aria-label="Sao chép"
        title="Sao chép quy tắc"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
    </li>
  )
}
