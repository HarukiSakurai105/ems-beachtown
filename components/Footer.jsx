export default function Footer() {
  return (
    <footer className="bg-navy-900 dark:bg-navy-950 text-center py-10 px-4 mt-8 no-print">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-10 h-10 bg-ems-600 rounded-xl flex items-center justify-center text-xl shadow-lg">⚕️</div>
          <div className="text-left">
            <p className="text-white font-extrabold tracking-widest text-sm">EMS BEACH TOWN</p>
            <p className="text-navy-400 text-[11px]">GTA RolePlay Server</p>
          </div>
        </div>
        <p className="text-navy-300 text-sm mb-4 leading-relaxed">
          Mọi quyết định cuối cùng thuộc về{' '}
          <strong className="text-white">Giám Đốc</strong> và{' '}
          <strong className="text-white">Phó Giám Đốc</strong> EMS Beach Town.
        </p>
        <div className="flex justify-center gap-3 mb-4">
          <a href="#" className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 rounded-full text-white/70 hover:text-white text-xs font-medium transition-all">
            💬 Discord Server
          </a>
          <a href="https://github.com/HarukiSakurai105/ems-beachtown" target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 rounded-full text-white/70 hover:text-white text-xs font-medium transition-all">
            🐙 GitHub
          </a>
        </div>
        <p className="text-navy-600 text-[11px]">© 2026 EMS Beach Town • All rights reserved</p>
      </div>
    </footer>
  )
}
