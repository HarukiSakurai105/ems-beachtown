function renderMarkup(text, keyPrefix = '') {
  return String(text).split(/(`.*?`|\*\*.*?\*\*)/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={`${keyPrefix}-${index}`} className="font-bold text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={`${keyPrefix}-${index}`}>{part.slice(1, -1)}</code>
    }
    return part
  })
}

export default function FormattedText({ text = '', highlight = '' }) {
  if (!highlight) return renderMarkup(text)

  const escapedQuery = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  if (!escapedQuery) return renderMarkup(text)
  const matcher = new RegExp(`(${escapedQuery})`, 'gi')

  return String(text).split(matcher).map((part, index) => (
    part.toLocaleLowerCase('vi') === highlight.toLocaleLowerCase('vi')
      ? <mark key={index}>{part}</mark>
      : <span key={index}>{renderMarkup(part, index)}</span>
  ))
}
