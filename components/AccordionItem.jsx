'use client'
import { useState, useEffect } from 'react'
import { ChevronDown, Link2, Share2 } from 'lucide-react'
import clsx from 'clsx'
import RuleItem from './RuleItem'
import PenaltyTable from './PenaltyTable'

export default function AccordionItem({ rule, highlight, isOpen: externalOpen, onToggle }) {
  const [open, setOpen] = useState(rule.defaultOpen || false)
  const [linkCopied, setLinkCopied] = useState(false)

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
        'glass-strong rounded-2xl overflow-hidden transition-all duration-300 group',
        open ? 'ring-1 ring-ems-200 dark:ring-ems-900/60' : 'hover:shadow-xl hover:-translate-y-0.5',
        isPenalty && 'ring-1 ring-ems-300 dark:ring-ems-800/50'
      )}
    >
      {/* Header */}
      <button
        onClick={toggle}
        aria-expanded={open}
        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-gray-50/50 dark:hover:bg-navy-700/30 transition-colors"
      >
        {/* Icon + num */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <span className="text-xl" aria-hidden="true">{rule.icon}</span>
          <span className={clsx(
            'text-[11px] font-bold tracking-wider px-2.5 py-1 rounded-full border',
            isPenalty
              ? 'bg-ems-50 dark:bg-ems-950/30 text-ems-700 dark:text-ems-400 border-ems-200 dark:border-ems-800/60'
              : 'bg-gray-100 dark:bg-navy-700 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-navy-600'
          )}>
            {rule.num}
          </span>
        </div>

        {/* Title */}
        <span className="flex-1 font-bold text-gray-800 dark:text-gray-100 text-[15px]">
          {rule.title}
        </span>

        {/* Actions */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {rule.items && (
            <span className="hidden sm:inline text-xs text-gray-400 dark:text-gray-600">
              {rule.items.length} khoản
            </span>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); shareLink() }}
            className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 text-gray-400 hover:text-ems-600 hover:bg-ems-50 dark:hover:bg-ems-950/30 transition-all"
            title="Copy link điều này"
            aria-label="Sao chép link"
          >
            {linkCopied ? '✓' : <Link2 className="w-3.5 h-3.5" />}
          </button>
          <ChevronDown className={clsx(
            'w-4 h-4 text-gray-400 dark:text-gray-600 transition-transform duration-300',
            open ? 'rotate-180' : ''
          )} />
        </div>
      </button>

      {/* Body */}
      {open && (
        <div className="px-5 pb-5 accordion-body-open">
          {isPenalty ? (
            <PenaltyTable rows={rule.penaltyRows} note={rule.note} notes={rule.notes} />
          ) : (
            <ul className="space-y-2">
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
