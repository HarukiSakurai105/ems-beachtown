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
  return <article id={rule.id} className={clsx('mdt-panel overflow-hidden', open ? 'border-[var(--line-strong)]' : 'border-[var(--line)]')}>
    <div className="flex items-stretch">
      <button onClick={toggle} aria-expanded={open} className="flex min-w-0 flex-1 items-center gap-3 p-4 text-left sm:gap-4 sm:p-5">
        <span className="mdt-mono grid h-11 w-11 flex-none place-items-center border border-[var(--line)] text-sm text-[#8ce04b]">{rule.icon}</span>
        <span className="min-w-0 flex-1"><span className="flex flex-wrap items-center gap-2"><small className="mdt-mono text-[9px] font-bold uppercase tracking-[.12em] text-[#3fa9f5]">REC//{rule.num}</small>{rule._section && <small className="mdt-tag mdt-tag-info">{rule._section}</small>}{isNewRule && <small className="mdt-tag mdt-tag-danger"><Sparkles className="mr-1 h-2.5 w-2.5" /> Mới</small>}</span><b className="mdt-display mt-1 block text-base leading-5 text-[var(--ink)] sm:text-lg">{rule.title}</b></span>
        <span className="mdt-mono hidden text-[9px] text-[var(--muted)] sm:block">{rule.isPenalty ? `${rule.penaltyRows?.length || 0} LEVEL` : `${rule.items?.length || 0} ENTRY`}</span>
        <ChevronDown className={clsx('h-4 w-4 flex-none text-[var(--muted)] transition-transform', open && 'rotate-180')} />
      </button>
      <button onClick={share} className="grid w-12 place-items-center border-l border-[var(--line)] text-[var(--muted)] hover:bg-[#151d24] hover:text-[#8ce04b]" aria-label="Sao chép liên kết">{copied ? <b className="mdt-mono text-[9px] text-[#8ce04b]">OK</b> : <Copy className="h-4 w-4" />}</button>
    </div>
    {open && <div className="border-t border-[var(--line)] bg-[#0c1115] px-4 py-4 sm:px-5">{rule.isPenalty ? <PenaltyTable rows={rule.penaltyRows} note={rule.note} notes={rule.notes} /> : <ul>{rule.items.map((item, index) => <RuleItem key={index} item={item} highlight={highlight} index={index} />)}</ul>}</div>}
  </article>
}
