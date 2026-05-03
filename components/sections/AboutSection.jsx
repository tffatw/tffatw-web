import { Target, Users, TrendingUp, Award } from 'lucide-react'

const missions = [
  { icon: Users, title: '同業聯盟', description: '促進產業間的經驗分享與合作交流' },
  { icon: Target, title: '會員教育', description: '提供專業教育講習與培訓課程' },
  { icon: TrendingUp, title: '市場拓展', description: '協助會員開拓海外市場與經營資訊' },
  { icon: Award, title: '供應鏈輔導', description: '全方位的供應鏈諮詢與媒合服務' },
]

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-[#FFF5E6] rounded-full mb-4">
            <span className="text-[#FFB84D] text-sm font-medium">About Us</span>
          </div>
          <h2 className="text-3xl md:text-4xl text-[#2C3E50] font-semibold mb-4">關於協會</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#FFB84D] to-[#FFA07A] mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h3 className="text-2xl text-[#2C3E50] font-semibold">協會起源</h3>
            <div className="h-1 w-16 bg-[#FFB84D] rounded-full" />
            <p className="text-[#6B7280] leading-relaxed">
              本會前身「台灣早餐速食促進協會」，由多家早餐速食業之翹楚所共同努力促成，成立於 2005 年。
              本著以同業聯盟及經驗分享為宗旨，共同致力於促進速食連鎖加盟事業之健全發展。
            </p>
            <p className="text-[#6B7280] leading-relaxed">
              正名為「台灣速食餐飲協會」後，持續提供會員教育講習、海外市場經營資訊、供應鏈輔導諮詢，
              期望成為兩岸速食餐飲產業最大服務平台。
            </p>
            <div className="bg-gradient-to-br from-[#FFF5E6] to-white p-6 rounded-2xl border border-[#FFB84D]/20">
              <h4 className="text-[#2C3E50] font-semibold mb-3">核心使命</h4>
              <ul className="space-y-3 text-[#6B7280]">
                {['促進同業聯盟與經驗分享', '提供會員專業教育講習', '分享海外市場經營資訊與供應鏈諮詢'].map((item) => (
                  <li key={item} className="flex items-start">
                    <span className="w-2 h-2 bg-[#FFB84D] rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFB84D]/10 to-[#4A7C9B]/10 rounded-3xl -rotate-2" />
            <div className="relative bg-white rounded-3xl shadow-xl p-8 border border-[#FFB84D]/20">
              <img
                src="/activity/20250213/20250213_activity_1.jpg"
                alt="協會活動"
                className="w-full h-64 object-cover rounded-2xl mb-6"
              />
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { value: '20+', label: '服務年資' },
                  { value: '100+', label: '會員企業' },
                  { value: '50+', label: '年度活動' },
                ].map(({ value, label }) => (
                  <div key={label}>
                    <div className="text-2xl font-semibold text-[#FFB84D] mb-1">{value}</div>
                    <div className="text-xs text-[#6B7280]">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {missions.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group bg-gradient-to-br from-white to-[#FFF5E6] p-6 rounded-2xl border border-[#FFB84D]/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#FFB84D] to-[#FFA07A] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-[#2C3E50] font-semibold mb-2">{title}</h4>
              <p className="text-sm text-[#6B7280] leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
