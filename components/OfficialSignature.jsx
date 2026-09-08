function RabbitMark() {
  return <svg className="alice-rabbit" viewBox="0 0 74 58" fill="none" aria-hidden="true">
    <path d="M28 20C22 8 24 2 29 3c5 1 7 10 8 16M42 19c2-12 6-18 11-16 5 3 2 12-3 20" />
    <path d="M56 35c0 11-9 19-21 19S14 46 14 35s9-18 21-18 21 7 21 18Z" />
    <path d="M20 28c-8-3-14-1-17 4 5 1 9 4 12 8M54 29c8-2 14 0 17 5-5 1-10 3-14 7" />
    <circle cx="28" cy="33" r="1.8" fill="currentColor" stroke="none" />
    <circle cx="43" cy="33" r="1.8" fill="currentColor" stroke="none" />
    <path d="m33 39 3 2 3-2M36 41v3m0 0c-3 0-5-1-6-3m6 3c3 0 5-1 6-3" />
  </svg>
}

function EmsSeal() {
  return <svg className="ems-red-seal" viewBox="0 0 150 150" role="img" aria-label="Mộc đỏ xác nhận Beach Town EMS">
    <defs><path id="seal-circle" d="M75,75 m-53,0 a53,53 0 1,1 106,0 a53,53 0 1,1 -106,0" /></defs>
    <circle cx="75" cy="75" r="64" fill="none" stroke="currentColor" strokeWidth="4" />
    <circle cx="75" cy="75" r="52" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <text className="ems-seal-ring"><textPath href="#seal-circle" startOffset="3%">BEACH TOWN EMS • XÁC NHẬN •</textPath></text>
    <path d="M75 43v62M64 53h22M64 95h22M75 50c-13 5-15 15-3 21 13 6 12 16-3 22M75 50c13 5 15 15 3 21-13 6-12 16 3 22" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <text x="75" y="124" textAnchor="middle" className="ems-seal-year">2026</text>
  </svg>
}

export default function OfficialSignature() {
  return <section className="official-signature-wrap" aria-label="Chữ ký xác nhận của Alice AI">
    <div className="official-signature-card">
      <div className="official-signature-copy">
        <p>CHỨNG THỰC VĂN BẢN ĐIỆN TỬ</p>
        <h2>Phê duyệt nội dung EMS</h2>
        <span>Chữ ký xác nhận được hiển thị kèm mộc điện tử của hệ thống.</span>
      </div>

      <div className="official-signature-paper">
        <p className="official-signature-label">NGƯỜI XÁC NHẬN</p>
        <div className="alice-signature-line">
          <span className="alice-signature">Alice AI</span>
          <RabbitMark />
        </div>
        <div className="official-signature-rule" />
        <p className="official-signature-name">ALICE AI · EMS DIGITAL ASSISTANT</p>
        <EmsSeal />
      </div>
    </div>
  </section>
}
