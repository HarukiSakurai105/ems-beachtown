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

const variantMap = {
  danger:  'bg-red-50 dark:bg-red-950/30 border-l-red-500 text-red-700 dark:text-red-400',
  warning: 'bg-amber-50 dark:bg-amber-950/30 border-l-amber-500 text-amber-800 dark:text-amber-400',
  info:    'bg-blue-50 dark:bg-blue-950/30 border-l-blue-500 text-blue-800 dark:text-blue-300',
  normal:  'bg-gray-50 dark:bg-navy-800/60 border-l-gray-300 dark:border-l-navy-600 text-gray-700 dark:text-gray-300',
}

export default function RuleItem({ item, highlight, index }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(item.text.replace(/`|\*\*/g, ''))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (item.type === 'special') {
    return (
      <div className="my-3 p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-xl">
        <p className="font-bold text-amber-800 dark:text-amber-400 text-sm mb-1.5">{item.title}</p>
        <p className="text-amber-700 dark:text-amber-300 text-sm leading-relaxed">
          <RichText text={item.text} highlight={highlight} />
        </p>
      </div>
    )
  }

  return (
    <li
      className={clsx(
        'group flex items-start gap-3 px-3 py-2.5 rounded-lg border-l-[3px] text-sm leading-relaxed transition-all hover:shadow-sm',
        variantMap[item.type] || variantMap.normal
      )}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <span className="flex-shrink-0 text-base mt-0.5">{item.icon}</span>
      <span className="flex-1">
        <RichText text={item.text} highlight={highlight} />
      </span>
      <button
        onClick={handleCopy}
        className="flex-shrink-0 opacity-0 group-hover:opacity-100 p-1 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-all"
        aria-label="Sao chép"
        title="Sao chép quy tắc"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
    </li>
  )
}
