import Link from 'next/link'
import { Building2, Award, Star } from 'lucide-react'

const stats = [
  { icon: Building2, value: '100+', label: '會員企業', color: 'from-[#FFB84D] to-[#FFA07A]' },
  { icon: Award, value: '50+', label: '知名品牌', color: 'from-[#4A7C9B] to-[#5B8CAD]' },
  { icon: Star, value: '1000+', label: '連鎖門市', color: 'from-[#6B9F7B] to-[#7CB08C]' },
]

const categories = [
  {
    title: '早餐連鎖品牌',
    color: '#FFB84D',
    items: ['傳統早餐店連鎖品牌', '西式早餐連鎖品牌', '複合式早午餐品牌'],
  },
  {
    title: '速食餐飲品牌',
    color: '#4A7C9B',
    items: ['速食漢堡連鎖品牌', '輕食飲品連鎖品牌', '其他速食餐飲品牌'],
  },
  {
    title: '供應鏈廠商',
    color: '#6B9F7B',
    items: ['食材供應商', '設備供應商', '包裝材料供應商'],
  },
  {
    title: '相關服務業者',
    color: '#FFA07A',
    items: ['行銷顧問服務', '財務法律顧問', '資訊系統服務'],
  },
]

export default function MembersSection() {
  return (
    <section id="members" className="py-24 bg-gradient-to-br from-[#F9F9F9] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-white rounded-full mb-4 shadow-sm">
            <span className="text-[#FFB84D] text-sm font-medium">Our Members</span>
          </div>
          <h2 className="text-3xl md:text-4xl text-[#2C3E50] font-semibold mb-4">協會成員</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#FFB84D] to-[#FFA07A] mx-auto rounded-full mb-6" />
          <p className="text-[#6B7280] max-w-2xl mx-auto">
            匯聚速食餐飲產業的領導品牌，共同推動產業發展
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {stats.map(({ icon: Icon, value, label, color }) => (
            <div key={label} className="bg-white rounded-3xl p-8 shadow-lg border border-[#FFB84D]/10 text-center">
              <div className={`w-16 h-16 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-semibold text-[#2C3E50] mb-2">{value}</div>
              <div className="text-[#6B7280]">{label}</div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-white to-[#FFF5E6] rounded-3xl p-8 md:p-12 border border-[#FFB84D]/20 shadow-xl">
          <h3 className="text-2xl text-[#2C3E50] font-semibold mb-6 text-center">會員類別</h3>

          <div className="grid md:grid-cols-2 gap-8">
            {categories.map(({ title, color, items }) => (
              <div key={title} className="space-y-4">
                <h4 className="text-lg text-[#2C3E50] font-medium flex items-center">
                  <span className="w-2 h-2 rounded-full mr-3 flex-shrink-0" style={{ backgroundColor: color }} />
                  {title}
                </h4>
                <ul className="ml-5 space-y-2 text-[#6B7280]">
                  {items.map((item) => (
                    <li key={item} className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 mr-3 flex-shrink-0" style={{ backgroundColor: color }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-[#FFB84D]/20 text-center">
            <p className="text-[#6B7280] mb-6">歡迎速食餐飲產業及相關企業加入我們的行列</p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#FFB84D] to-[#FFA07A] text-[#2C3E50] font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              申請入會
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
