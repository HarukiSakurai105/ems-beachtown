'use client'
import { useState } from 'react'
import { Copy, Check, AlertTriangle, AlertCircle, Info, ShieldCheck } from 'lucide-react'
import clsx from 'clsx'

export default function RuleItem({ item, highlight, index }) {
  const [copied, setCopied] = useState(false)

  const copyText = () => {
    const plain = (item.text || '').replace(/[*_`]/g, '')
    navigator.clipboard.writeText(plain)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  // Highlight matches
  const renderHighlighted = (rawText) => {
    if (!rawText) return null
    if (!highlight) {
      return <span dangerouslySetInnerHTML={{
        __html: rawText
          .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900 dark:text-white">$1</strong>')
          .replace(/`(.*?)`/g, '<code class="font-mono text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950 px-1 py-0.5 rounded text-xs">$1</code>')
      }} />
    }

    const regex = new RegExp(`(${highlight})`, 'gi')
    const parts = rawText.split(regex)
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-amber-200 dark:bg-amber-800 text-slate-900 dark:text-amber-100 rounded px-1 font-bold">{part}</mark>
      ) : (
        <span key={i} dangerouslySetInnerHTML={{
          __html: part
            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900 dark:text-white">$1</strong>')
            .replace(/`(.*?)`/g, '<code class="font-mono text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950 px-1 py-0.5 rounded text-xs">$1</code>')
        }} />
      )
    )
  }

  const typeStyles = {
    danger: 'bg-red-50/80 dark:bg-red-950/20 border-red-200 dark:border-red-900/40 text-red-900 dark:text-red-200',
    warning: 'bg-amber-50/80 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/40 text-amber-900 dark:text-amber-200',
    info: 'bg-sky-50/80 dark:bg-sky-950/20 border-sky-200 dark:border-sky-900/40 text-sky-900 dark:text-sky-200',
    normal: 'bg-white dark:bg-slate-900/60 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300',
  }

  return (
    <li className={clsx(
      'group relative flex items-start gap-3 p-3 rounded-xl border text-xs sm:text-sm leading-relaxed transition-colors',
      typeStyles[item.type] || typeStyles.normal
    )}>
      <span className="text-base flex-shrink-0 mt-0.5">{item.icon || '📌'}</span>
      
      <div className="flex-1 min-w-0 pr-8">
        {item.title && (
          <p className="font-extrabold uppercase tracking-wide text-xs mb-1 text-slate-900 dark:text-white">
            {item.title}
          </p>
        )}
        <div>{renderHighlighted(item.text)}</div>
      </div>

      <button
        onClick={copyText}
        className="absolute right-2.5 top-2.5 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-slate-200/60 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 transition-all"
        title="Sao chép nội dung quy định này"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
    </li>
  )
}
