'use client'
import { useState, useEffect } from 'react'
import { ChevronDown, Link2, Sparkles } from 'lucide-react'
import clsx from 'clsx'
import RuleItem from './RuleItem'
import PenaltyTable from './PenaltyTable'

export default function AccordionItem({ rule, highlight, isOpen: externalOpen, onToggle }) {
  const [open, setOpen] = useState(rule.defaultOpen || false)
  const [linkCopied, setLinkCopied] = useState(false)

  // Newly added rules to spotlight
  const isNewRule = [
    'ems-yeu-cau-bac-si',
    'ems-trach-nhiem-bac-si',
    'ems-dieu-cam-ky',
    'ems-quy-dinh-truc-thang',
  ].includes(rule.id)

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
        'glass-strong rounded-2xl overflow-hidden transition-all duration-300 group border',
        open
          ? 'ring-2 ring-ems-500/40 border-ems-400/40 shadow-xl'
          : 'hover:shadow-xl hover:-translate-y-0.5 hover:border-ems-300 dark:hover:border-ems-800',
        isPenalty && 'border-ems-300 dark:border-ems-800 bg-gradient-to-br from-white/95 to-red-50/30 dark:from-navy-800/95 dark:to-red-950/20'
      )}
    >
      {/* Header Button */}
      <button
        onClick={toggle}
        aria-expanded={open}
        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-gray-50/60 dark:hover:bg-navy-700/40 transition-colors"
      >
        {/* Icon + num badge */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <span className="text-xl transform group-hover:scale-110 transition-transform" aria-hidden="true">{rule.icon}</span>
          <span className={clsx(
            'text-[11px] font-extrabold tracking-wider px-2.5 py-1 rounded-full border',
            isPenalty
              ? 'bg-ems-50 dark:bg-ems-950/40 text-ems-700 dark:text-ems-400 border-ems-200 dark:border-ems-800/70'
              : 'bg-gray-100 dark:bg-navy-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-navy-600'
          )}>
            {rule.num}
          </span>
        </div>

        {/* Title */}
        <div className="flex-1 flex items-center gap-2 flex-wrap">
          <span className="font-bold text-gray-900 dark:text-gray-100 text-[15px] group-hover:text-ems-600 dark:group-hover:text-ems-400 transition-colors">
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
        <div className="px-5 pb-5 pt-1 border-t border-gray-100 dark:border-navy-700/50 accordion-body-open">
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
