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
  danger:  'bg-red-50 border-red-100 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-300',
  warning: 'bg-amber-50 border-amber-100 text-amber-800 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-300',
  info:    'bg-blue-50 border-blue-100 text-blue-800 dark:bg-blue-500/10 dark:border-blue-500/20 dark:text-blue-300',
  normal:  'bg-slate-50 border-slate-100 text-slate-700 dark:bg-white/[.035] dark:border-white/10 dark:text-slate-300',
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
        'group flex items-start gap-3 rounded-2xl border px-3.5 py-3 text-sm leading-relaxed transition-all hover:shadow-sm sm:px-4',
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
        className="flex-shrink-0 rounded p-1 text-gray-400 opacity-100 transition-all hover:text-gray-600 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100 dark:hover:text-gray-200"
        aria-label="Sao chép"
        title="Sao chép quy tắc"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
    </li>
  )
}
