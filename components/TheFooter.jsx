import Link from 'next/link'

const quickLinks = [
  { href: '/about', label: '關於協會' },
  { href: '/leadership', label: '協會成員' },
  { href: '/events', label: '活動資訊' },
  { href: '/contact', label: '聯絡我們' },
]

export default function TheFooter() {
  return (
    <footer className="bg-gradient-to-br from-[#2C3E50] to-[#34495E] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FFB84D] to-[#FFA07A] rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                <span className="text-white font-bold">台</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">台灣速食餐飲協會</h3>
                <p className="text-xs text-gray-400">Taiwan Fast Food Association</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              致力於促進速食連鎖加盟事業的健全發展，成為兩岸速食餐飲產業最大的服務平台。
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">快速連結</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-gray-400 hover:text-[#FFB84D] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">聯絡資訊</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>台北市內湖區新湖二路 156 號</li>
              <li>
                <a href="tel:0916044823" className="hover:text-[#FFB84D] transition-colors">
                  0916-044-823
                </a>
              </li>
              <li>
                <a href="mailto:tffatw.org@gmail.com" className="hover:text-[#FFB84D] transition-colors">
                  tffatw.org@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} 台灣速食餐飲協會 Taiwan Fast Food Association. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
