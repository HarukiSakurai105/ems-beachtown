'use client'
import { useState, useEffect } from 'react'
import { ChevronDown, Copy, Check, Share2, Sparkles, AlertCircle, ShieldAlert } from 'lucide-react'
import clsx from 'clsx'
import RuleItem from './RuleItem'
import PenaltyTable from './PenaltyTable'

export default function AccordionItem({ rule, highlight, isOpen: externalOpen, onToggle }) {
  const [open, setOpen] = useState(rule.defaultOpen || false)
  const [copied, setCopied] = useState(false)
  const isNewRule = Boolean(rule.newUntil && new Date(rule.newUntil).getTime() > Date.now())

  useEffect(() => {
    if (externalOpen !== undefined) setOpen(externalOpen)
  }, [externalOpen])

  useEffect(() => {
    if (highlight) setOpen(true)
  }, [highlight])

  const toggle = () => {
    setOpen(v => {
      onToggle?.(rule.id, !v)
      return !v
    })
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#${rule.id}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Preview snippet text from items
  const snippet = rule.items?.[0]?.text?.replace(/[*_`]/g, '') || rule.title

  return (
    <article 
      id={rule.id}
      className={clsx(
        'med-card overflow-hidden transition-all duration-300',
        open
          ? 'border-sky-500/50 dark:border-sky-500/50 ring-2 ring-sky-500/10 shadow-lg'
          : 'hover:border-slate-300 dark:hover:border-slate-700'
      )}
    >
      {/* Header matching the photo's card style */}
      <div className="p-4 sm:p-5 flex items-start gap-3 sm:gap-4">
        
        {/* Icon */}
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800/60 flex items-center justify-center text-xl flex-shrink-0">
          {rule.icon || '📋'}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0" onClick={toggle} role="button">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-xs font-black text-sky-600 dark:text-sky-400 tracking-wider uppercase">
              {rule.num}
            </span>
            {isNewRule && (
              <span className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800">
                <Sparkles className="w-2.5 h-2.5" /> Mới
              </span>
            )}
            {rule.isPenalty && (
              <span className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border border-amber-200">
                <ShieldAlert className="w-2.5 h-2.5" /> Chế tài
              </span>
            )}
          </div>

          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
            {rule.title}
          </h3>

          {!open && (
            <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
              {snippet}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={handleCopyLink}
            className="p-2 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Sao chép liên kết điều này"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
          </button>

          <button
            onClick={toggle}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Mở rộng chi tiết"
          >
            <ChevronDown className={clsx('w-4 h-4 transition-transform duration-300', open && 'rotate-180 text-sky-500')} />
          </button>
        </div>

      </div>

      {/* Expanded Details Body */}
      {open && (
        <div className="border-t border-slate-100 dark:border-slate-800/80 px-4 sm:px-6 py-4 bg-slate-50/50 dark:bg-slate-950/20">
          {rule.isPenalty ? (
            <PenaltyTable rows={rule.penaltyRows} note={rule.note} notes={rule.notes} />
          ) : (
            <ul className="space-y-2.5">
              {rule.items?.map((item, index) => (
                <RuleItem key={index} item={item} highlight={highlight} index={index} />
              ))}
            </ul>
          )}
        </div>
      )}

    </article>
  )
}
