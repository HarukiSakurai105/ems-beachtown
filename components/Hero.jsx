export default function Hero() {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-ems-800 to-navy-900 pt-24 pb-20 px-4">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-ems-600/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-10 right-0 w-96 h-96 bg-navy-700/30 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1.5s'}} />
        <div className="absolute -bottom-10 left-1/2 w-64 h-64 bg-ems-500/15 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '3s'}} />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{backgroundImage: 'repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 0,transparent 50%), repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 0,transparent 50%)', backgroundSize: '40px 40px'}}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold text-white/80 tracking-widest uppercase mb-6 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-ems-400 animate-pulse" />
          GTA RolePlay • Beach Town Server
        </div>

        {/* Icon */}
        <div className="text-6xl mb-4 animate-fade-in drop-shadow-2xl" style={{animationDelay: '0.1s'}}>
          ⚕️
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight animate-fade-in" style={{animationDelay: '0.2s'}}>
          QUY ĐỊNH KHÁM BỆNH<br />
          <span className="text-ems-400">TẠI EMS BEACH TOWN</span>
        </h1>

        {/* Subtitle */}
        <p className="text-navy-200 text-base sm:text-lg mb-8 leading-relaxed max-w-xl mx-auto animate-fade-in" style={{animationDelay: '0.3s'}}>
          Tra cứu nhanh nội quy dành cho <strong className="text-white">cư dân</strong> và <strong className="text-white">nhân viên EMS</strong>.
          <br className="hidden sm:block" />
          Đọc kỹ trước khi đến bệnh viện — mọi vi phạm đều có hình thức xử lý.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
          {[
            { icon: '🚑', label: 'Cấp cứu 24/7', color: 'bg-ems-600/30 border-ems-500/30 text-ems-200' },
            { icon: '📋', label: '20 Điều & Phụ lục', color: 'bg-navy-700/40 border-navy-600/30 text-navy-200' },
            { icon: '🏥', label: 'Chuyên nghiệp', color: 'bg-emerald-800/30 border-emerald-600/30 text-emerald-300' },
          ].map(t => (
            <span key={t.label} className={`inline-flex items-center gap-2 border rounded-full px-4 py-1.5 text-sm font-semibold backdrop-blur-sm ${t.color}`}>
              {t.icon} {t.label}
            </span>
          ))}
        </div>
      </div>

      {/* Wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12 dark:hidden">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#f9fafb" />
        </svg>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12 hidden dark:block">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#0f172a" />
        </svg>
      </div>
    </header>
  )
}
