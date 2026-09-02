'use client'
import { PhoneCall, X, AlertTriangle, Disc, MapPin, Radio, ShieldAlert } from 'lucide-react'

export default function EmergencyModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm p-4 flex items-center justify-center animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-[#0c182a] border border-red-500/30 shadow-2xl overflow-hidden">
        
        {/* Emergency Header */}
        <div className="bg-gradient-to-r from-red-600 via-ems-600 to-rose-700 p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner animate-bounce">
            🚑
          </div>

          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider">
            BÁO CẤP CỨU KHẨN CẤP (911)
          </h2>
          <p className="text-xs text-red-100 mt-1 font-medium">
            Trung Tâm Điều Phối Y Tế Khẩn Cấp EMS Beach Town
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          
          <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50">
            <h3 className="font-extrabold text-red-700 dark:text-red-400 uppercase tracking-wide flex items-center gap-2 mb-2">
              <PhoneCall className="w-4 h-4" /> 1. Báo cấp cứu trong game:
            </h3>
            <p className="leading-relaxed">
              Nhấn <code>T</code> và gõ lệnh: <strong className="text-red-600 dark:text-red-400 font-mono">/call 911</strong> hoặc bấm nút phát tín hiệu cứu hộ <strong>Ping</strong> trên điện thoại.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900/50">
            <h3 className="font-extrabold text-sky-700 dark:text-sky-400 uppercase tracking-wide flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4" /> 2. Trường hợp lag xác / khuất tầm nhìn:
            </h3>
            <p className="leading-relaxed">
              Nếu vị trí tử vong bị lỗi không ping được, hãy chụp ảnh bản đồ GPS và đăng bài tại phòng <strong>#ho-tro-ems</strong> trên Discord.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50">
            <h3 className="font-extrabold text-amber-800 dark:text-amber-400 uppercase tracking-wide flex items-center gap-2 mb-1">
              <ShieldAlert className="w-4 h-4" /> 3. Quy định an toàn hiện trường:
            </h3>
            <p className="leading-relaxed text-xs">
              Trong các vụ đấu súng, chiếm đóng hoặc bạo động, Bác sĩ chỉ tiếp cận khi hiện trường đã kết thúc hoặc được <strong>cảnh sát PD đảm bảo an toàn</strong>.
            </p>
          </div>

          <div className="pt-2">
            <a
              href="https://discord.gg/beachtown2026"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-sm shadow-lg shadow-[#5865F2]/25 transition-transform active:scale-95"
            >
              <span>Vào Discord Điều Phối Cấp Cứu</span>
              <span>➔</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  )
}
