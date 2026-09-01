export default function manifest() {
  return {
    name: 'EMS Beach Town — Cổng quy định',
    short_name: 'EMS Beach Town',
    description: 'Cổng tra cứu chính thức dành cho cư dân và nhân viên EMS Beach Town.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0d10',
    theme_color: '#8ce04b',
    lang: 'vi',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }],
  }
}
