'use client'

import { useEffect, useState } from 'react'
import clsx from 'clsx'

export default function LoadingScreen({ onFinish }) {
  const [fading, setFading] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fadeTimer = window.setTimeout(() => setFading(true), reducedMotion ? 120 : 950)
    const hideTimer = window.setTimeout(() => {
      setHidden(true)
      onFinish?.()
    }, reducedMotion ? 220 : 1250)

    return () => {
      window.clearTimeout(fadeTimer)
      window.clearTimeout(hideTimer)
    }
  }, [onFinish])

  if (hidden) return null

  return (
    <div
      className={clsx('ems-loading-overlay', fading && 'ems-loading-overlay--leaving')}
      role="status"
      aria-live="polite"
      aria-label="Đang tải hệ thống văn bản EMS"
    >
      <div className="ems-loader-card">
        <div className="ems-loader-mark" aria-hidden="true"><span>⚕</span><i /></div>
        <p className="ems-loader-kicker">BEACH TOWN MEDICAL DEPARTMENT</p>
        <h2>HỆ THỐNG VĂN BẢN EMS</h2>
        <svg className="ems-loader-ecg" viewBox="0 0 240 40" fill="none" aria-hidden="true">
          <path d="M0 20h50l10-10 10 20 10-25 10 30 10-15h40l10-10 10 20 10-25 10 30 10-15h50" />
        </svg>
        <div className="ems-loader-track" aria-hidden="true"><span /></div>
        <div className="ems-loader-status"><span>Đang đồng bộ dữ liệu quy định</span><b><i /><i /><i /></b></div>
      </div>
      <p className="ems-loader-footer">EMS BEACH TOWN · PROTOCOL CENTER</p>
    </div>
  )
}
