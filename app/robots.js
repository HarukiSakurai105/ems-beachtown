export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/dashboard', '/login', '/setup', '/api/'] }],
    sitemap: 'https://ems-beachtown.vercel.app/sitemap.xml',
    host: 'https://ems-beachtown.vercel.app',
  }
}
