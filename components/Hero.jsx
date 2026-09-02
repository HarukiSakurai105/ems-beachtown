'use client'
import { Search, X } from 'lucide-react'

export default function Hero({ onSearch, searchValue }) {
  return (
    <section className="relative overflow-hidden bg-[#09223c] text-white pt-9 pb-16 px-4">
      
      {/* Background with real ambulance on right and hospital on left */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-45 mix-blend-luminosity filter blur-[1px]"
        style={{
          backgroundImage: `url('/ems-hero-banner.jpg')`,
        }}
      />
      {/* Direct cutout of the ambulance on the right side for clear visibility */}
      <div 
        className="hidden lg:block absolute right-0 top-0 bottom-0 w-96 bg-contain bg-right bg-no-repeat pointer-events-none opacity-80"
        style={{
          backgroundImage: `url('/ambulance-cutout.png')`,
        }}
      />
      {/* Direct cutout of the hospital interior on the left side */}
      <div 
        className="hidden lg:block absolute left-0 top-0 bottom-0 w-80 bg-contain bg-left bg-no-repeat pointer-events-none opacity-45"
        style={{
          backgroundImage: `url('/hospital-interior.png')`,
        }}
      />

      {/* Dark blue vignette overlay matching the photo */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#09223c]/85 via-[#07192d]/75 to-[#081e36]/95 pointer-events-none" />

      {/* Hero content matching photo */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        
        {/* Title */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase mb-2">
          HỆ THỐNG VĂN BẢN EMS
        </h1>

        {/* Slogan */}
        <p className="text-xs sm:text-base font-medium text-slate-200 mb-6">
          Sứ mệnh cứu người - Kỷ luật là sức mạnh
        </p>

        {/* Big White Search Bar */}
        <div className="max-w-xl mx-auto">
          <div className="relative flex items-center bg-white rounded-full shadow-2xl p-1.5 border border-white/30">
            <Search className="w-4 h-4 text-slate-400 ml-3 flex-shrink-0" />
            <input
              type="text"
              value={searchValue || ''}
              onChange={(e) => onSearch?.(e.target.value)}
              placeholder="Tìm kiếm luật, quy định..."
              className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none font-medium"
            />
            {searchValue && (
              <button
                onClick={() => onSearch?.('')}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 mr-2"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}
