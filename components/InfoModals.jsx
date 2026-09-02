'use client'
import { X, ShieldCheck, HeartPulse, Stethoscope, Users, Award, FileText, CheckCircle2 } from 'lucide-react'

export function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm p-4 flex items-center justify-center animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-[#0c182a] border border-sky-500/30 shadow-2xl p-6 sm:p-8 text-slate-800 dark:text-slate-200">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"><X className="w-5 h-5" /></button>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">🏥</span>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase">VỀ CHÚNG TÔI - EMS BEACH TOWN</h2>
            <p className="text-xs text-sky-600 dark:text-sky-400 font-bold">Trung tâm y tế khẩn cấp Los Santos & Beach Town</p>
          </div>
        </div>
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          <p>
            <strong>EMS Beach Town</strong> là lực lượng cứu hộ y tế tuyến đầu của thành phố, cam kết phục vụ cứu người 24/7 với tinh thần <strong>hoàn toàn trung lập</strong>. Chúng tôi không can dự vào các xung đột băng đảng (GANG) hay mâu thuẫn cá nhân.
          </p>
          <div className="grid sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-center">
              <span className="text-2xl">⚡</span>
              <p className="font-bold text-xs mt-1 text-slate-900 dark:text-white">Phản ứng nhanh</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Tiếp nhận đơn ping ngay lập tức</p>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
              <span className="text-2xl">🤝</span>
              <p className="font-bold text-xs mt-1 text-slate-900 dark:text-white">Tuyệt đối trung lập</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Cứu chữa mọi công dân công bằng</p>
            </div>
            <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-center">
              <span className="text-2xl">⚖️</span>
              <p className="font-bold text-xs mt-1 text-slate-900 dark:text-white">Kỷ luật thép</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Xử phạt nghiêm khắc vi phạm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SOPModal({ isOpen, onClose }) {
  if (!isOpen) return null
  const steps = [
    { num: '01', title: 'Tiếp nhận tín hiệu Ping', desc: 'Bác sĩ trực nhận đơn qua radio/MDT và phản hồi sớm nhất.' },
    { num: '02', title: 'Di chuyển khẩn cấp', desc: 'Bật còi hú và đèn ưu tiên, tuân thủ lộ trình an toàn đến hiện trường.' },
    { num: '03', title: 'Kiểm tra an toàn hiện trường', desc: 'Chờ lực lượng cảnh sát PD đảm bảo an toàn trước khi tiếp cận nạn nhân.' },
    { num: '04', title: 'Thực hiện Roleplay sơ cứu', desc: 'Roleplay chuẩn thương tích bằng /me /do, băng bó và hồi sinh bệnh nhân.' },
    { num: '05', title: 'Xuất hóa đơn & Báo cáo', desc: 'Xuất đúng biểu phí quy định và lưu trữ nhật ký body-cam ca trực.' },
  ]
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm p-4 flex items-center justify-center animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-[#0c182a] border border-sky-500/30 shadow-2xl p-6 sm:p-8 text-slate-800 dark:text-slate-200">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"><X className="w-5 h-5" /></button>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">📋</span>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase">QUY TRÌNH CẤP CỨU TIÊU CHUẨN (SOP)</h2>
            <p className="text-xs text-sky-600 dark:text-sky-400 font-bold">Standard Operating Procedures - EMS Beach Town</p>
          </div>
        </div>
        <div className="space-y-3">
          {steps.map(s => (
            <div key={s.num} className="flex items-start gap-4 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
              <span className="font-mono font-black text-base text-sky-600 dark:text-sky-400 bg-sky-100 dark:bg-sky-950 px-2.5 py-1 rounded-xl">{s.num}</span>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{s.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function PersonnelModal({ isOpen, onClose }) {
  if (!isOpen) return null
  const ranks = [
    { rank: 'Giám Đốc Bệnh Viện', prefix: 'GĐ', desc: 'Quản lý toàn bộ điều hành, phân quyền và duyệt nội quy.' },
    { rank: 'Phó Giám Đốc', prefix: 'PGĐ', desc: 'Phụ trách nhân sự, quản lý kỷ luật và duyệt đơn ứng tuyển.' },
    { rank: 'Trưởng Khoa / Quản Lý', prefix: 'TK', desc: 'Chỉ huy ca trực, phân chia địa bàn cấp cứu ngoài hiện trường.' },
    { rank: 'Bác Sĩ Điều Trị', prefix: 'BS', desc: 'Thực hiện cấp cứu, phẫu thuật và điều phối đơn cứu thương.' },
    { rank: 'Y Tá / Điều Dưỡng', prefix: 'YT', desc: 'Hỗ trợ cấp cứu, kiểm tra tình trạng bệnh nhân và trực sảnh.' },
    { rank: 'Thực Tập Sinh (Intern)', prefix: 'TTS', desc: 'Nhân viên mới thử việc 14 ngày, học việc theo sát cấp trên.' },
  ]
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm p-4 flex items-center justify-center animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-[#0c182a] border border-sky-500/30 shadow-2xl p-6 sm:p-8 text-slate-800 dark:text-slate-200">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"><X className="w-5 h-5" /></button>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">🎖️</span>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase">CƠ CẤU NHÂN SỰ & CẤP BẬC EMS</h2>
            <p className="text-xs text-sky-600 dark:text-sky-400 font-bold">Cú pháp đặt tên bắt buộc: EMS | [Chức Vụ] | [Tên IC]</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {ranks.map(r => (
            <div key={r.rank} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">{r.rank}</span>
                <code className="text-[10px] font-mono font-bold text-sky-600 dark:text-sky-400 bg-sky-100 dark:bg-sky-950 px-2 py-0.5 rounded-md">{r.prefix}</code>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
