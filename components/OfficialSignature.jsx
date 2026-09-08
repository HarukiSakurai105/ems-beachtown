function RabbitMark() {
  return <svg className="alice-rabbit" viewBox="0 0 96 82" fill="none" aria-hidden="true">
    <ellipse className="rabbit-ear" cx="35" cy="21" rx="10" ry="22" transform="rotate(-15 35 21)" />
    <ellipse className="rabbit-ear" cx="61" cy="21" rx="10" ry="22" transform="rotate(15 61 21)" />
    <ellipse className="rabbit-ear-inner" cx="36" cy="20" rx="4" ry="14" transform="rotate(-15 36 20)" />
    <ellipse className="rabbit-ear-inner" cx="60" cy="20" rx="4" ry="14" transform="rotate(15 60 20)" />
    <circle className="rabbit-tail" cx="77" cy="63" r="11" />
    <ellipse className="rabbit-body" cx="49" cy="63" rx="28" ry="17" />
    <circle className="rabbit-face" cx="48" cy="45" r="25" />
    <ellipse className="rabbit-eye" cx="38" cy="43" rx="4" ry="5" />
    <ellipse className="rabbit-eye" cx="58" cy="43" rx="4" ry="5" />
    <circle className="rabbit-eye-shine" cx="39" cy="41" r="1.4" />
    <circle className="rabbit-eye-shine" cx="59" cy="41" r="1.4" />
    <ellipse className="rabbit-cheek" cx="30" cy="52" rx="6" ry="3.5" />
    <ellipse className="rabbit-cheek" cx="66" cy="52" rx="6" ry="3.5" />
    <path className="rabbit-mouth" d="m44 50 4 3 4-3M48 53v3m0 0c-3 0-5-1-6-3m6 3c3 0 5-1 6-3" />
    <path className="rabbit-heart" d="M48 69c-7-5-11-8-11-13 0-6 8-8 11-2 3-6 11-4 11 2 0 5-4 8-11 13Z" />
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
