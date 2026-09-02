import { Shield, ArrowUpRight, HeartPulse } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0b1828] dark:bg-[#060d16] text-slate-300 border-t border-white/10 pt-12 pb-16 px-4 no-print mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
        {/* Col 1: Brand */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-ems-600 to-red-500 flex items-center justify-center text-xl shadow-lg">
              ⚕️
            </div>
            <div>
              <h3 className="text-white font-black text-sm tracking-wider uppercase">LOS SANTOS EMS DEPARTMENT</h3>
              <p className="text-sky-400 text-xs font-bold">BEACH TOWN GTA ROLEPLAY</p>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-slate-400 max-w-md">
            Hệ thống văn bản, quy chuẩn hành chính và nội quy cứu thương chính thức. Mọi quyết định kỷ luật và điều hành tối cao thuộc về <strong>Ban Giám Đốc EMS Beach Town</strong>.
          </p>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-3">Liên kết nhanh</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#main-rules-section" className="hover:text-sky-400 transition-colors">Tra cứu bộ luật</a></li>
            <li><a href="https://discord.gg/beachtown2026" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-colors flex items-center gap-1">Kênh Discord EMS <ArrowUpRight className="w-3 h-3" /></a></li>
            <li><a href="/admin" className="hover:text-sky-400 transition-colors flex items-center gap-1"><Shield className="w-3 h-3" /> Quản trị nội bộ</a></li>
          </ul>
        </div>

        {/* Col 3: Emergency */}
        <div>
          <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-3">Cấp cứu khẩn cấp</h4>
          <p className="text-xs text-slate-400 leading-relaxed mb-3">
            Gõ lệnh <code>/call 911</code> trong game để gửi vị trí cứu thương nhanh nhất.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
            <span>HOTLINE: 911 (24/7)</span>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
        <p>© 2026 Los Santos EMS - GTA Roleplay Server. All rights reserved.</p>
        <p className="font-mono">BEACH TOWN EMS // SYSTEM V3.0</p>
      </div>
    </footer>
  )
}
