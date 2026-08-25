'use client'
import { useState, useEffect } from 'react'
import { ChevronDown, Link2, Sparkles } from 'lucide-react'
import clsx from 'clsx'
import RuleItem from './RuleItem'
import PenaltyTable from './PenaltyTable'

export default function AccordionItem({ rule, highlight, isOpen: externalOpen, onToggle }) {
  const [open, setOpen] = useState(rule.defaultOpen || false)
  const [linkCopied, setLinkCopied] = useState(false)

  // Admin-controlled spotlight that expires automatically after seven days.
  const isNewRule = Boolean(rule.newUntil && new Date(rule.newUntil).getTime() > Date.now())

  useEffect(() => {
    if (externalOpen !== undefined) setOpen(externalOpen)
  }, [externalOpen])

  useEffect(() => {
    if (highlight) setOpen(true)
  }, [highlight])

  const toggle = () => {
    const next = !open
    setOpen(next)
    onToggle?.(rule.id, next)
  }

  const shareLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#${rule.id}`
    navigator.clipboard.writeText(url)
    setLinkCopied(true)
    window.location.hash = rule.id
    setTimeout(() => setLinkCopied(false), 2000)
  }

  const isPenalty = rule.isPenalty

  return (
    <div
      id={rule.id}
      className={clsx(
        'rounded-3xl overflow-hidden transition-all duration-300 group border bg-white dark:bg-white/[.04]',
        open
          ? 'border-red-300 shadow-[0_18px_50px_rgba(15,23,42,.1)] ring-4 ring-red-500/5 dark:border-red-500/30'
          : 'border-slate-200 shadow-sm hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-xl dark:border-white/10 dark:hover:border-white/20',
        isPenalty && 'border-red-200 bg-gradient-to-br from-white to-red-50/60 dark:border-red-500/30 dark:from-white/[.05] dark:to-red-500/[.05]'
      )}
    >
      {/* Header Button */}
      <button
        onClick={toggle}
        aria-expanded={open}
        className="w-full flex items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-slate-50 sm:px-5 dark:hover:bg-white/[.03]"
      >
        {/* Icon + num badge */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <span className="text-xl transform group-hover:scale-110 transition-transform" aria-hidden="true">{rule.icon}</span>
          <span className={clsx(
            'text-[10px] font-black tracking-wider px-2.5 py-1 rounded-lg border',
            isPenalty
              ? 'bg-ems-50 dark:bg-ems-950/40 text-ems-700 dark:text-ems-400 border-ems-200 dark:border-ems-800/70'
              : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-white/10 dark:text-slate-300 dark:border-white/10'
          )}>
            {rule.num}
          </span>
        </div>

        {/* Title */}
        <div className="flex-1 flex items-center gap-2 flex-wrap">
          <span className="font-black text-slate-900 dark:text-gray-100 text-sm sm:text-[15px] group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
            {rule.title}
          </span>
          {isNewRule && (
            <span className="inline-flex items-center gap-1 bg-gradient-to-r from-red-600 to-ems-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-sm uppercase tracking-wider animate-pulse">
              <Sparkles className="w-3 h-3" /> Mới
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {rule.items && (
            <span className="hidden sm:inline text-xs font-medium text-gray-400 dark:text-gray-500">
              {rule.items.length} mục
            </span>
          )}
          
          <button
            onClick={(e) => { e.stopPropagation(); shareLink() }}
            className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 text-gray-400 hover:text-ems-600 hover:bg-ems-50 dark:hover:bg-ems-950/40 transition-all"
            title="Sao chép link Điều này"
            aria-label="Sao chép link"
          >
            {linkCopied ? <span className="text-xs text-green-500 font-bold">✓</span> : <Link2 className="w-4 h-4" />}
          </button>

          <ChevronDown className={clsx(
            'w-4 h-4 text-gray-400 dark:text-gray-500 transition-transform duration-300',
            open ? 'rotate-180 text-ems-500' : ''
          )} />
        </div>
      </button>

      {/* Accordion Content Body */}
      {open && (
        <div className="px-4 pb-5 pt-2 border-t border-slate-100 sm:px-5 dark:border-white/10 accordion-body-open">
          {isPenalty ? (
            <PenaltyTable rows={rule.penaltyRows} note={rule.note} notes={rule.notes} />
          ) : (
            <ul className="space-y-2 mt-2">
              {rule.items.map((item, i) => (
                <RuleItem key={i} item={item} highlight={highlight} index={i} />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
