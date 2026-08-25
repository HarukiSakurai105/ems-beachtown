const terms = [
  ['CRM', 'Hành vi cố ý dùng phương tiện để tấn công hoặc giết người trái quy định Roleplay.'],
  ['TTC', 'Tòa Thị Chính — cơ quan quản lý và xử lý kỷ luật cấp thành phố.'],
  ['ON-DUTY', 'Bác sĩ đang trong ca trực, mặc đồng phục và thực hiện nhiệm vụ EMS.'],
  ['OFF-DUTY', 'Bác sĩ đã kết thúc hoặc tạm rời ca trực và không sử dụng quyền lợi EMS.'],
  ['Gọi Bụt', 'Cơ chế hỗ trợ hồi sinh ngoài quy trình cứu chữa thông thường của bác sĩ.'],
  ['Ping', 'Tín hiệu yêu cầu cấp cứu kèm vị trí được gửi tới hệ thống EMS.'],
]

export default function Glossary() {
  return <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-12 no-print" aria-labelledby="glossary-title"><div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-2xl sm:p-8 dark:border-white/10"><div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end"><div><p className="text-[10px] font-black uppercase tracking-[.2em] text-red-400">EMS Dictionary</p><h2 id="glossary-title" className="mt-1 text-2xl font-black">Thuật ngữ nghiệp vụ</h2></div><p className="text-xs text-slate-400">Giải thích nhanh các từ viết tắt thường gặp</p></div><dl className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">{terms.map(([term, definition]) => <div key={term} className="rounded-2xl border border-white/10 bg-white/[.04] p-4 transition hover:bg-white/[.08]"><dt className="font-black text-red-400"><abbr title={definition} className="no-underline">{term}</abbr></dt><dd className="text-xs leading-5 mt-1 text-slate-300">{definition}</dd></div>)}</dl></div></section>
}
