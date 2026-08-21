// Official EMS Beach Town service price list
export const pricingData = {
  title: 'BẢNG GIÁ DỊCH VỤ EMS BEACH TOWN',
  services: [
    {
      id: 'hoi-mau',
      name: 'Hồi máu',
      price: 1000,
      icon: '💉',
      desc: 'Băng bó thương tích, phục hồi máu & thể lực tại bệnh viện hoặc hiện trường.',
      badge: 'Cơ bản',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800'
    },
    {
      id: 'cap-cuu',
      name: 'Cấp cứu thông thường',
      price: 1500,
      icon: '🚑',
      desc: 'Tiếp nhận đơn cứu thương (Ping), hồi sinh sơ cứu trong khu vực nội thành.',
      badge: 'Nội thành',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800'
    },
    {
      id: 'sa-mac',
      name: 'Cấp cứu Sa Mạc',
      price: 2000,
      icon: '🏜️',
      desc: 'Tiếp nhận đơn và di chuyển cứu hộ tại Sandy Shores, Grapeseed và ngoại ô.',
      badge: 'Ngoại ô',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800'
    },
    {
      id: 'huong-12h',
      name: 'Cấp cứu Hướng 12h',
      price: 3000,
      icon: '🧭',
      desc: 'Cứu hộ khẩn cấp tại Paleto Bay hoặc các vị trí cực bắc xa nhất bản đồ.',
      badge: 'Cực xa',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800'
    },
  ],
  surcharges: [
    {
      id: 'mountain-water',
      name: 'Trên núi & Dưới nước',
      price: 500,
      icon: '⛰️',
      desc: 'Phụ phí điều động trực thăng, ca nô hoặc cứu hộ tại các vị trí địa hình hiểm trở, vách đá, biển sâu.',
      badge: 'Phụ phí +$500',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800'
    },
  ],
}
