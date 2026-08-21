import clsx from 'clsx'

const levelStyles = {
  yellow:        'bg-yellow-50 dark:bg-yellow-950/20',
  orange:        'bg-orange-50 dark:bg-orange-950/20',
  'orange-dark': 'bg-rose-50   dark:bg-rose-950/20',
  red:           'bg-red-50    dark:bg-red-950/30',
}
const badgeStyles = {
  yellow:        'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/40 dark:text-yellow-300 dark:border-yellow-700',
  orange:        'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900/40 dark:text-orange-300 dark:border-orange-700',
  'orange-dark': 'bg-rose-100   text-rose-800   border-rose-300   dark:bg-rose-900/40   dark:text-rose-300   dark:border-rose-700',
  red:           'bg-red-100    text-red-800    border-red-300    dark:bg-red-900/40    dark:text-red-300    dark:border-red-700',
}

function parseAction(text) {
  // bold **text**
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
    part.startsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : part
  )
}

export default function PenaltyTable({ rows, note, notes }) {
  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-navy-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-navy-900 dark:bg-navy-950">
              <th className="text-left px-4 py-3 text-white/80 font-semibold text-xs tracking-wider uppercase">Mức vi phạm</th>
              <th className="text-left px-4 py-3 text-white/80 font-semibold text-xs tracking-wider uppercase">Hình thức xử lý</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className={clsx('border-t border-gray-100 dark:border-navy-700/50', levelStyles[row.color])}>
                <td className="px-4 py-3 w-44">
                  <span className={clsx('inline-flex px-2.5 py-1 rounded-full text-xs font-bold border', badgeStyles[row.color])}>
                    {row.label}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                  {parseAction(row.action)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Single note (resident) */}
      {note && (
        <div className="flex gap-3 p-3.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 rounded-xl text-sm text-amber-800 dark:text-amber-300">
          <span>⚠️</span>
          <span>{note.replace('⚠️ ', '')}</span>
        </div>
      )}

      {/* Multiple notes (EMS) */}
      {notes && notes.map((n, i) => (
        <div key={i} className={clsx(
          'flex gap-3 p-3.5 rounded-xl text-sm border',
          n.severe
            ? 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800/40 text-red-800 dark:text-red-300'
            : 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/40 text-amber-800 dark:text-amber-300'
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
