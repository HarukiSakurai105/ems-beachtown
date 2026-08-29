'use client'
import { useEffect, useState } from 'react'
import { ChevronDown, Copy, Sparkles } from 'lucide-react'
import clsx from 'clsx'
import RuleItem from './RuleItem'
import PenaltyTable from './PenaltyTable'

export default function AccordionItem({ rule, highlight, isOpen: externalOpen, onToggle }) {
  const [open, setOpen] = useState(rule.defaultOpen || false)
  const [copied, setCopied] = useState(false)
  const isNewRule = Boolean(rule.newUntil && new Date(rule.newUntil).getTime() > Date.now())
  useEffect(() => { if (externalOpen !== undefined) setOpen(externalOpen) }, [externalOpen])
  useEffect(() => { if (highlight) setOpen(true) }, [highlight])
  const toggle = () => { setOpen(value => { onToggle?.(rule.id, !value); return !value }) }
  const share = () => { navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#${rule.id}`); setCopied(true); setTimeout(() => setCopied(false), 1600) }
  return <article id={rule.id} className={clsx('overflow-hidden rounded-[1.6rem] border bg-[var(--panel)]', open ? 'border-[var(--line-strong)] shadow-[var(--shadow-soft)]' : 'border-[var(--line)]')}>
    <div className="flex items-stretch">
      <button onClick={toggle} aria-expanded={open} className="flex min-w-0 flex-1 items-center gap-3 p-4 text-left sm:gap-4 sm:p-5">
        <span className={clsx('grid h-11 w-11 flex-none place-items-center rounded-2xl text-lg', rule.isPenalty ? 'bg-[#ffe0da]' : 'bg-[var(--page)]')}>{rule.icon}</span>
        <span className="min-w-0 flex-1"><span className="flex flex-wrap items-center gap-2"><small className="text-[9px] font-black uppercase tracking-[.16em] text-[#ff5d45]">{rule.num}</small>{rule._section && <small className="rounded-full bg-[var(--accent-soft)] px-2 py-1 text-[8px] font-black uppercase text-[var(--accent)]">{rule._section}</small>}{isNewRule && <small className="inline-flex items-center gap-1 rounded-full bg-[#ff5d45] px-2 py-1 text-[8px] font-black uppercase text-white"><Sparkles className="h-2.5 w-2.5" /> Mới</small>}</span><b className="mt-1 block text-sm leading-5 text-[var(--ink)] sm:text-base">{rule.title}</b></span>
        <span className="hidden text-[10px] font-bold text-[var(--muted)] sm:block">{rule.isPenalty ? `${rule.penaltyRows?.length || 0} mức` : `${rule.items?.length || 0} mục`}</span>
        <ChevronDown className={clsx('h-4 w-4 flex-none text-[var(--muted)] transition-transform', open && 'rotate-180')} />
      </button>
      <button onClick={share} className="grid w-12 place-items-center border-l border-[var(--line)] text-[var(--muted)] hover:bg-[var(--page)] hover:text-[#ff5d45]" aria-label="Sao chép liên kết">{copied ? <b className="text-[10px] text-[#2ba66f]">OK</b> : <Copy className="h-4 w-4" />}</button>
    </div>
    {open && <div className="border-t border-[var(--line)] bg-[var(--page)] px-4 py-5 sm:px-5">{rule.isPenalty ? <PenaltyTable rows={rule.penaltyRows} note={rule.note} notes={rule.notes} /> : <ul className="space-y-2">{rule.items.map((item, index) => <RuleItem key={index} item={item} highlight={highlight} index={index} />)}</ul>}</div>}
  </article>
}
