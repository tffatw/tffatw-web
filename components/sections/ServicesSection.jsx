import { Handshake, GraduationCap, Plane } from 'lucide-react'

const services = [
  {
    icon: Handshake,
    title: '商務媒合',
    description: '搭建品牌與供應鏈的橋樑，促進產業鏈上下游的合作機會',
    features: ['供應商媒合', '商業合作洽談', '產業資源整合'],
    colorBar: 'from-[#FFB84D] to-[#FFA07A]',
  },
  {
    icon: GraduationCap,
    title: '專業課程',
    description: '涵蓋品牌定位、節稅規劃、政府補助申請等多元課程',
    features: ['品牌經營策略', '財務稅務規劃', '政府資源申請'],
    colorBar: 'from-[#4A7C9B] to-[#5B8CAD]',
  },
  {
    icon: Plane,
    title: '產業參訪',
    description: '定期舉辦國內外考察與年度會員大會，拓展視野與交流',
    features: ['海外市場考察', '年度會員大會', '產業交流活動'],
    colorBar: 'from-[#6B9F7B] to-[#7CB08C]',
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-gradient-to-br from-[#F9F9F9] to-[#FFF5E6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-white rounded-full mb-4 shadow-sm">
            <span className="text-[#FFB84D] text-sm font-medium">Our Services</span>
          </div>
          <h2 className="text-3xl md:text-4xl text-[#2C3E50] font-semibold mb-4">服務與活動</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#FFB84D] to-[#FFA07A] mx-auto rounded-full mb-6" />
          <p className="text-[#6B7280] max-w-2xl mx-auto">
            我們提供全方位的服務，協助會員企業在競爭激烈的市場中脫穎而出
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map(({ icon: Icon, title, description, features, colorBar }) => (
            <div
              key={title}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`h-2 bg-gradient-to-r ${colorBar}`} />
              <div className="p-8">
                <div className={`w-16 h-16 bg-gradient-to-br ${colorBar} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl text-[#2C3E50] font-semibold mb-3">{title}</h3>
                <p className="text-[#6B7280] mb-6 leading-relaxed">{description}</p>
                <ul className="space-y-3">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-[#6B7280]">
                      <div className={`w-1.5 h-1.5 bg-gradient-to-r ${colorBar} rounded-full mr-3 flex-shrink-0`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
