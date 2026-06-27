import Link from 'next/link'
import { Sparkles, ArrowRight } from 'lucide-react'

export default function HomeHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* 漸層背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF5E6] via-[#F9F9F9] to-[#FFE8CC] -z-10" />

      {/* 裝飾性模糊圓形 */}
      <div className="absolute top-40 right-20 w-64 h-64 bg-[#FFB84D]/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-40 left-20 w-96 h-96 bg-[#4A7C9B]/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 左欄：文字內容 */}
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-[#FFB84D]/30 shadow-sm">
              <Sparkles className="w-4 h-4 text-[#FFB84D]" />
              <span className="text-sm text-[#2C3E50]">成立於 2005 年，服務產業超過 20 年</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#2C3E50] leading-tight font-bold">
              連結產業力量
              <br />
              <span className="text-[#FFB84D]">共創速食餐飲新未來</span>
            </h1>

            <p className="text-lg text-[#6B7280] leading-relaxed max-w-xl">
              專業行業支持 ‧ 定期交流活動 ‧ 全方位供應鏈輔導
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#FFB84D] to-[#FFA07A] text-[#2C3E50] font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                立即加入我們
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#2C3E50] font-semibold rounded-xl border-2 border-[#FFB84D]/30 hover:border-[#FFB84D] hover:bg-[#FFF5E6] transition-all duration-300"
              >
                最新活動資訊
              </Link>
            </div>
          </div>

          {/* 右欄：圖片 */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFB84D]/20 to-[#4A7C9B]/20 rounded-3xl rotate-3" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/images/homepage/1.png"
                alt="台灣速食餐飲協會"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
