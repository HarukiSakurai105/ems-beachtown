'use client'

import { useEffect, useRef } from 'react'
import { ArrowDown, BookOpen, Search, ShieldCheck, X } from 'lucide-react'
import styles from './PortalHero.module.css'

export default function PortalHero({ searchValue, onSearch, ruleCount, chapterCount, version }) {
  const inputRef = useRef(null)
  useEffect(() => {
    function focusSearch(event) {
      const typing = event.target instanceof HTMLElement && (event.target.isContentEditable || /INPUT|TEXTAREA|SELECT/.test(event.target.tagName))
      if (event.key === '/' && !typing && !event.ctrlKey && !event.metaKey && !event.altKey) {
        event.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', focusSearch)
    return () => window.removeEventListener('keydown', focusSearch)
  }, [])

  return <section className={styles.hero} aria-labelledby="portal-title">
    <div className={styles.scene} aria-hidden="true" />
    <div className={styles.inner}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}><span /> BEACH TOWN / EMS PROTOCOL CENTER</p>
        <h1 id="portal-title">Nắm rõ quy định.<br /><span>Sẵn sàng cứu người.</span></h1>
        <p className={styles.description}>Tra cứu quy định, quy trình cấp cứu và hướng dẫn nội bộ. Một nơi để cả đội ngũ cùng làm việc đúng chuẩn.</p>
        <div className={styles.search}>
          <Search size={19} aria-hidden="true" />
          <input ref={inputRef} type="search" aria-label="Tìm kiếm luật và quy định" placeholder="Tìm số điều, nội dung hoặc từ khóa…" value={searchValue} onChange={event => onSearch(event.target.value)} onKeyDown={event => { if (event.key === 'Escape') onSearch('') }} />
          {searchValue ? <button aria-label="Xóa tìm kiếm" onClick={() => { onSearch(''); inputRef.current?.focus() }}><X size={18} /></button> : <kbd>/</kbd>}
        </div>
        <div className={styles.links}><a href="#rules-container">Khám phá bộ luật <ArrowDown size={14} /></a><span>Tìm kiếm trong nhóm đang chọn</span></div>
      </div>
      <aside className={styles.context} aria-label="Tổng quan thư viện">
        <div className={styles.contextTop}><ShieldCheck size={22} /><span>THƯ VIỆN QUY ĐỊNH</span></div>
        <p>Kiến thức rõ ràng.<br />Phối hợp hiệu quả.</p>
        <div className={styles.metrics}><div><strong>{ruleCount}</strong><span>Quy định hiển thị</span></div><div><strong>{chapterCount}</strong><span>Chương tra cứu</span></div></div>
        <div className={styles.version}><BookOpen size={15} /><span>Phiên bản văn bản</span><b>{version ? `v${version}` : '—'}</b></div>
      </aside>
    </div>
  </section>
}
