import clsx from 'clsx'

function parseAction(text) {
  // bold **text**
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
    part.startsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : part
  )
}

export default function PenaltyTable({ rows, note, notes }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-2 sm:grid-cols-2">{rows.map((row, index) => <article key={index} className="border border-[var(--line)] bg-[var(--panel)] p-4"><div className="mb-3 flex gap-1">{Array.from({ length: rows.length }).map((_, skull) => <i key={skull} className={clsx('h-3.5 w-3.5 rotate-45 border border-[#ff4655]', skull <= index ? 'bg-[#ff4655]' : 'opacity-25')} />)}</div><b className="mdt-display block text-base text-[var(--ink)]">{row.label}</b><p className="mt-2 text-xs leading-5 text-[var(--muted)]">{parseAction(row.action)}</p></article>)}</div>

      {/* Single note (resident) */}
      {note && (
        <div className="flex gap-3 border border-[#ffc530] bg-[#332905] p-3.5 text-sm text-[#ffc530]">
          <span>⚠️</span>
          <span>{note.replace('⚠️ ', '')}</span>
        </div>
      )}

      {/* Multiple notes (EMS) */}
      {notes && notes.map((n, i) => (
        <div key={i} className={clsx(
          'flex gap-3 border p-3.5 text-sm',
          n.severe
            ? 'border-[#ff4655] bg-[#341015] text-[#ff4655]'
            : 'border-[#ffc530] bg-[#332905] text-[#ffc530]'
        )}>
          <span>{n.icon}</span>
          <div>
            <strong>{n.label}:</strong> {n.text}
          </div>
        </div>
      ))}
    </div>
  )
}
