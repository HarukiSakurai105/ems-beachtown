export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050b14] px-4 py-12 text-center no-print">
      <div className="mx-auto max-w-3xl">
        <div className="mb-5 flex items-center justify-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-red-700 via-red-600 to-rose-400 text-xl text-white shadow-lg shadow-red-600/20">⚕️</div>
          <div className="text-left"><p className="text-sm font-black tracking-tight text-white">BEACH TOWN EMS</p><p className="text-[9px] font-bold uppercase tracking-[.2em] text-slate-500">Protocol Center · v2</p></div>
        </div>
        <p className="text-slate-400 text-sm mb-5 leading-relaxed">
          Mọi quyết định cuối cùng thuộc về{' '}
          <strong className="text-white">Giám Đốc</strong> và{' '}
          <strong className="text-white">Phó Giám Đốc</strong> EMS Beach Town.
        </p>
        <div className="flex justify-center gap-3 mb-4">
          <a
            href="https://discord.gg/beachtown2026"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white px-5 py-3 text-xs font-black text-slate-950 transition hover:-translate-y-0.5"
          >
            <span>💬 Tham gia Discord Beach Town</span>
            <span>➔</span>
          </a>
        </div>
        <div className="mx-auto my-6 h-px max-w-md bg-white/10" /><p className="text-slate-600 text-[10px] font-bold uppercase tracking-wider">© 2026 EMS Beach Town · Medical Protocol System</p>
      </div>
    </footer>
  )
}
