'use client'
import { useState } from 'react'
import { Calculator, Copy, Check, RotateCcw, DollarSign, Plus, Minus, FileText, Sparkles, MapPin } from 'lucide-react'
import { pricingData } from '../data/pricing'
import clsx from 'clsx'

export default function BillCalculator() {
  const [selectedService, setSelectedService] = useState('cap-cuu')
  const [quantity, setQuantity] = useState(1)
  const [hasSurcharge, setHasSurcharge] = useState(false)
  const [patientName, setPatientName] = useState('')
  const [notes, setNotes] = useState('')
  const [copied, setCopied] = useState(false)

  const currentService = pricingData.services.find(s => s.id === selectedService) || pricingData.services[0]
  const basePrice = currentService.price
  const surchargePrice = hasSurcharge ? 500 : 0
  const unitPrice = basePrice + surchargePrice
  const totalPrice = unitPrice * quantity

  const formatMoney = (amount) => {
    return '$' + amount.toLocaleString('en-US')
  }

  const handleCopyBill = () => {
    const serviceName = currentService.name
    const surchargeText = hasSurcharge ? ' (+ Phụ phí Núi/Nước: $500)' : ''
    const patientText = patientName.trim() ? ` | Bệnh nhân: ${patientName.trim()}` : ''
    const qtyText = quantity > 1 ? ` | Số lượng: ${quantity} người` : ''
    const noteText = notes.trim() ? ` (${notes.trim()})` : ''

    const billString = `[HÓA ĐƠN EMS BEACH TOWN] Dịch vụ: ${serviceName}${surchargeText}${qtyText}${patientText}${noteText} | TỔNG VIỆN PHÍ: ${formatMoney(totalPrice)}`

    navigator.clipboard.writeText(billString)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleReset = () => {
    setSelectedService('cap-cuu')
    setQuantity(1)
    setHasSurcharge(false)
    setPatientName('')
    setNotes('')
  }

  return (
    <div className="space-y-8">
      
      {/* ── BẢNG GIÁ CHÍNH THỨC ────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="p-2 bg-ems-600/20 text-ems-500 rounded-xl">
            <DollarSign className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-lg font-black text-gray-900 dark:text-white">
              BẢNG GIÁ DỊCH VỤ NIÊM YẾT
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Áp dụng chính thức theo quy định Ban Giám Đốc EMS Beach Town
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {pricingData.services.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedService(item.id)}
              className={clsx(
                'glass-strong rounded-2xl p-4 cursor-pointer transition-all duration-300 border relative overflow-hidden',
                selectedService === item.id
                  ? 'ring-2 ring-ems-500 border-ems-500 bg-gradient-to-b from-ems-500/10 to-transparent shadow-lg shadow-ems-500/10 -translate-y-1'
                  : 'hover:border-ems-300 dark:hover:border-ems-700 hover:-translate-y-0.5'
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-2xl">{item.icon}</span>
                <span className={clsx('text-[10px] font-extrabold px-2 py-0.5 rounded-full border', item.badgeColor)}>
                  {item.badge}
                </span>
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">
                {item.name}
              </h4>
              <p className="text-2xl font-black text-ems-600 dark:text-ems-400 font-mono mb-2">
                {formatMoney(item.price)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                {item.desc}
              </p>

              {selectedService === item.id && (
                <div className="absolute top-2 right-2 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ems-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-ems-500"></span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Phụ phí banner */}
        <div className="mt-3.5 p-4 rounded-2xl bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-blue-500/10 border border-rose-300/40 dark:border-rose-800/40 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⛰️</span>
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                Phụ phí địa hình hiểm trở: <span className="text-rose-600 dark:text-rose-400 font-mono font-black">+ $500 / người</span>
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Áp dụng khi nạn nhân ở <strong>Trên núi cao</strong> hoặc <strong>Dưới nước biển sâu</strong> (cần trực thăng/ca nô cứu hộ).
              </p>
            </div>
          </div>
          <button
            onClick={() => setHasSurcharge(!hasSurcharge)}
            className={clsx(
              'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all',
              hasSurcharge
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                : 'bg-white dark:bg-navy-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-navy-600 hover:border-rose-400'
            )}
          >
            {hasSurcharge ? '✓ Đã chọn phụ phí (+$500)' : '+ Áp dụng phụ phí ($500)'}
          </button>
        </div>
      </div>

      {/* ── MÁY TÍNH XUẤT HÓA ĐƠN NHANH ───────────────────── */}
      <div className="glass-strong rounded-3xl p-6 border border-white/60 dark:border-navy-700 shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200 dark:border-navy-700 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-ems-600 to-red-500 flex items-center justify-center text-white shadow-lg shadow-ems-600/30">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-gray-900 dark:text-white">
                MÁY TÍNH XUẤT BILL NHANH
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Công cụ hỗ trợ Bác Sĩ & Cư Dân tính toán viện phí chính xác trong game
              </p>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-navy-700 hover:bg-gray-200 dark:hover:bg-navy-600 rounded-lg text-xs font-semibold text-gray-600 dark:text-gray-300 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Làm mới</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Form Controls */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* 1. Chọn dịch vụ */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2">
                1. Loại dịch vụ cứu chữa:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {pricingData.services.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedService(s.id)}
                    className={clsx(
                      'flex items-center justify-between p-3 rounded-xl border text-left transition-all',
                      selectedService === s.id
                        ? 'bg-ems-50 dark:bg-ems-950/40 border-ems-500 ring-1 ring-ems-500 text-ems-900 dark:text-white font-bold'
                        : 'bg-white dark:bg-navy-800/80 border-gray-200 dark:border-navy-700 text-gray-700 dark:text-gray-300 hover:border-ems-300'
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{s.icon}</span>
                      <span className="text-xs font-bold">{s.name}</span>
                    </div>
                    <span className="text-xs font-mono font-black text-ems-600 dark:text-ems-400 ml-2">
                      {formatMoney(s.price)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Số lượng người & Phụ phí */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              
              {/* Số lượng bệnh nhân */}
              <div className="bg-white dark:bg-navy-800/80 p-3.5 rounded-2xl border border-gray-200 dark:border-navy-700">
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-2">
                  2. Số lượng bệnh nhân:
                </label>
                <div className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-navy-700 hover:bg-gray-200 dark:hover:bg-navy-600 flex items-center justify-center text-gray-800 dark:text-white font-bold transition-all active:scale-95"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-xl font-black font-mono text-gray-900 dark:text-white">
                    {quantity} <span className="text-xs font-normal text-gray-500">người</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 rounded-xl bg-ems-600 hover:bg-ems-500 flex items-center justify-center text-white font-bold transition-all active:scale-95 shadow-md shadow-ems-600/30"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Phụ phí địa hình */}
              <div
                onClick={() => setHasSurcharge(!hasSurcharge)}
                className={clsx(
                  'p-3.5 rounded-2xl border cursor-pointer flex flex-col justify-between transition-all select-none',
                  hasSurcharge
                    ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-500 ring-1 ring-rose-500'
                    : 'bg-white dark:bg-navy-800/80 border-gray-200 dark:border-navy-700 hover:border-rose-300'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    Trên núi / Dưới nước
                  </span>
                  <input
                    type="checkbox"
                    checked={hasSurcharge}
                    onChange={() => {}}
                    className="w-4 h-4 accent-rose-600 rounded cursor-pointer"
                  />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[11px] text-gray-500">Địa hình hiểm trở</span>
                  <span className="text-xs font-mono font-black text-rose-600 dark:text-rose-400">
                    +$500/người
                  </span>
                </div>
              </div>

            </div>

            {/* 3. Tên bệnh nhân & Ghi chú (Optional) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">
                  Tên IC / ID Bệnh nhân (Tùy chọn):
                </label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="VD: John Wick (ID 123)"
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700 rounded-xl outline-none focus:border-ems-500 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">
                  Ghi chú đơn (Tùy chọn):
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="VD: Chiếm đóng, Giao tranh..."
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700 rounded-xl outline-none focus:border-ems-500 text-gray-900 dark:text-white"
                />
              </div>
            </div>

          </div>

          {/* Right Column: Receipt Summary Card */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-gradient-to-br from-navy-900 to-navy-950 text-white rounded-2xl p-5 border border-white/10 shadow-xl flex-1 flex flex-col justify-between">
              
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                  <span className="text-xs font-bold tracking-widest uppercase text-navy-300">
                    PHIẾU THU VIỆN PHÍ
                  </span>
                  <span className="text-[10px] bg-ems-600 text-white font-extrabold px-2 py-0.5 rounded-full uppercase">
                    BEACH TOWN EMS
                  </span>
                </div>

                {/* Breakdown items */}
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between text-navy-200">
                    <span>Dịch vụ chính:</span>
                    <span className="font-semibold text-white">{currentService.name}</span>
                  </div>
                  <div className="flex justify-between text-navy-200">
                    <span>Đơn giá cơ bản:</span>
                    <span className="font-mono font-bold text-white">{formatMoney(basePrice)}</span>
                  </div>
                  {hasSurcharge && (
                    <div className="flex justify-between text-rose-300">
                      <span>Phụ phí Núi / Nước:</span>
                      <span className="font-mono font-bold">+$500</span>
                    </div>
                  )}
                  <div className="flex justify-between text-navy-200">
                    <span>Số lượng:</span>
                    <span className="font-bold text-white">{quantity} người</span>
                  </div>
                  {patientName.trim() && (
                    <div className="flex justify-between text-navy-200">
                      <span>Bệnh nhân:</span>
                      <span className="font-bold text-amber-300">{patientName}</span>
                    </div>
                  )}
                </div>

                {/* Total box */}
                <div className="mt-5 p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                  <p className="text-xs text-navy-300 font-bold uppercase tracking-wider mb-1">
                    TỔNG TIỀN CẦN XUẤT BILL:
                  </p>
                  <p className="text-3xl sm:text-4xl font-black font-mono text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.5)]">
                    {formatMoney(totalPrice)}
                  </p>
                </div>
              </div>

              {/* Action copy button */}
              <div className="mt-5 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleCopyBill}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-ems-600 to-red-600 hover:from-ems-500 hover:to-red-500 rounded-xl text-xs font-black tracking-wider uppercase text-white shadow-lg shadow-ems-600/40 transition-all transform hover:scale-[1.02] active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>ĐÃ COPY HÓA ĐƠN!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>SAO CHÉP HÓA ĐƠN (GỬI VÀO GAME)</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  )
}
