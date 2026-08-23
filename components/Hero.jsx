'use client'
export default function Hero({ onSelectTag }) {
  const tags = [
    { label: '🚑 Cấp cứu & PD', query: 'cấp cứu' },
    { label: '⚔️ Giao tranh', query: 'giao tranh' },
    { label: '⏸️ Treo Duty', query: 'treo duty' },
    { label: '🎭 Roleplay', query: 'roleplay' },
    { label: '📹 Body-cam', query: 'body-cam' },
    { label: '🚗 Phương tiện', query: 'phương tiện' },
    { label: '⚖️ Kỷ luật & Phạt', query: 'kỷ luật' },
  ]

  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-[#190c13] to-navy-950 pt-24 pb-16 px-4">
      
      {/* Ambient background glowing orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-ems-600/25 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-12 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[130px] animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute -bottom-16 left-1/3 w-80 h-80 bg-ems-500/15 rounded-full blur-[100px]" />
        
        {/* Floating Icons Parallax */}
        <div className="absolute top-20 left-12 text-3xl opacity-20 animate-bounce" style={{animationDuration: '6s'}}>➕</div>
        <div className="absolute top-28 right-16 text-3xl opacity-20 animate-bounce" style={{animationDuration: '7s', animationDelay: '1s'}}>🏥</div>
        <div className="absolute bottom-16 left-24 text-2xl opacity-15 animate-pulse">💊</div>
        <div className="absolute bottom-20 right-28 text-3xl opacity-15 animate-pulse" style={{animationDelay: '1.5s'}}>🚑</div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        
        {/* Top pill badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-ems-600/30 via-white/10 to-blue-600/30 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-xs font-extrabold text-white tracking-widest uppercase mb-5 shadow-lg shadow-black/30">
          <span className="w-2 h-2 rounded-full bg-ems-400 animate-ping" />
          <span>GTA ROLEPLAY • BEACH TOWN EMS HOSPITAL</span>
        </div>

        {/* Emblem */}
        <div className="text-6xl mb-3 drop-shadow-[0_10px_20px_rgba(230,57,70,0.4)] animate-bounce" style={{animationDuration: '4s'}}>
          ⚕️
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-3 leading-tight tracking-tight">
          QUY ĐỊNH KHÁM BỆNH<br />
          <span className="bg-gradient-to-r from-ems-400 via-red-300 to-rose-400 bg-clip-text text-transparent">
            TẠI EMS BEACH TOWN
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-navy-200 text-sm sm:text-base mb-6 leading-relaxed max-w-xl mx-auto">
          Cổng thông tin tra cứu quy chuẩn dành cho <strong className="text-white font-bold">Cư dân</strong> và <strong className="text-white font-bold">Nhân viên Y tế</strong>. Mọi hành vi vi phạm đều áp dụng đúng khung hình phạt.
        </p>

        {/* Stats Pills */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-7">
          {[
            { icon: '🚑', label: 'Cấp cứu On-Duty 24/7', color: 'bg-ems-600/30 border-ems-500/40 text-ems-200 shadow-ems-900/30' },
            { icon: '📋', label: 'Quy định Cư dân & Nội bộ', color: 'bg-navy-700/50 border-navy-500/40 text-navy-200 shadow-navy-900/30' },
            { icon: '⚖️', label: 'Xử lý nghiêm minh', color: 'bg-emerald-800/30 border-emerald-500/40 text-emerald-300' },
          ].map(t => (
            <span key={t.label} className={`inline-flex items-center gap-2 border rounded-full px-3.5 py-1.5 text-xs font-bold backdrop-blur-md shadow-md ${t.color}`}>
              {t.icon} {t.label}
            </span>
          ))}
        </div>

        {/* Quick Filter Tag Chips */}
        <div className="pt-2 border-t border-white/10">
          <p className="text-[11px] text-white/50 uppercase tracking-wider font-bold mb-2.5">
            ⚡ Lọc nhanh theo chủ đề:
          </p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {tags.map(t => (
              <button
                key={t.label}
                onClick={() => onSelectTag?.(t.query)}
                className="px-3 py-1 bg-white/10 hover:bg-ems-600 border border-white/15 hover:border-ems-400 rounded-lg text-xs font-semibold text-white/80 hover:text-white transition-all transform hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Wave bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-10 dark:hidden">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#f9fafb" />
        </svg>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-10 hidden dark:block">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#0f172a" />
        </svg>
      </div>
    </header>
  )
}
