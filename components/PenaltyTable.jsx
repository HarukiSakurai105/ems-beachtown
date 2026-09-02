import clsx from 'clsx'

function parseAction(text) {
  // bold **text**
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
    part.startsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : part
  )
}

export default function PenaltyTable({ rows, note, notes }) {
  return (
    <div className="min-w-0 space-y-4 overflow-hidden">
      <div className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2">{rows.map((row, index) => <article key={index} className="min-w-0 overflow-hidden border border-slate-200 bg-slate-50 p-4 text-slate-900 dark:border-slate-700/80 dark:bg-[#091829] dark:text-slate-100"><div className="mb-3 flex flex-wrap gap-1">{Array.from({ length: rows.length }).map((_, skull) => <i key={skull} className={clsx('h-3.5 w-3.5 flex-none rotate-45 border border-[#ff4655]', skull <= index ? 'bg-[#ff4655]' : 'opacity-25')} />)}</div><b className="mdt-display block break-words text-base text-current">{row.label}</b><p className="mt-2 break-words text-xs leading-5 text-slate-600 dark:text-slate-300">{parseAction(row.action)}</p></article>)}</div>

      {/* Single note (resident) */}
      {note && (
        <div className="flex min-w-0 items-start gap-3 border border-[#ffc530] bg-[#332905] p-3.5 text-sm text-[#ffc530]">
          <span className="flex-none">⚠️</span>
          <span className="min-w-0 break-words">{note.replace('⚠️ ', '')}</span>
        </div>
      )}

      {/* Multiple notes (EMS) */}
      {notes && notes.map((n, i) => (
        <div key={i} className={clsx(
          'flex min-w-0 items-start gap-3 border p-3.5 text-sm',
          n.severe
            ? 'border-[#ff4655] bg-[#341015] text-[#ff4655]'
            : 'border-[#ffc530] bg-[#332905] text-[#ffc530]'
        )}>
          <span className="flex-none">{n.icon}</span>
          <div className="min-w-0 break-words">
            <strong>{n.label}:</strong> {n.text}
          </div>
        </div>
      ))}
    </div>
  )
}
