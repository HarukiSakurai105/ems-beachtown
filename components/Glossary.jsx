const terms = [
  ['CRM', 'Hành vi cố ý dùng phương tiện để tấn công hoặc giết người trái quy định Roleplay.'],
  ['TTC', 'Tòa Thị Chính — cơ quan quản lý và xử lý kỷ luật cấp thành phố.'],
  ['ON-DUTY', 'Bác sĩ đang trong ca trực, mặc đồng phục và thực hiện nhiệm vụ EMS.'],
  ['OFF-DUTY', 'Bác sĩ đã kết thúc hoặc tạm rời ca trực và không sử dụng quyền lợi EMS.'],
  ['Gọi Bụt', 'Cơ chế hỗ trợ hồi sinh ngoài quy trình cứu chữa thông thường của bác sĩ.'],
  ['Ping', 'Tín hiệu yêu cầu cấp cứu kèm vị trí được gửi tới hệ thống EMS.'],
]

export default function Glossary() {
  return <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 no-print" aria-labelledby="glossary-title"><div className="glass-strong rounded-2xl p-5"><h2 id="glossary-title" className="text-lg font-black mb-4 dark:text-white">📖 Giải thích thuật ngữ</h2><dl className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">{terms.map(([term, definition]) => <div key={term} className="rounded-xl bg-gray-50 dark:bg-navy-800 p-3"><dt className="font-black text-ems-600 dark:text-ems-400"><abbr title={definition} className="no-underline">{term}</abbr></dt><dd className="text-sm mt-1 text-gray-600 dark:text-gray-400">{definition}</dd></div>)}</dl></div></section>
}

