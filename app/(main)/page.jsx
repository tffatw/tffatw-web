import Link from 'next/link'
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react'
import HomeHero from '@/components/HomeHero'
import HomeServices from '@/components/HomeServices'
import { getFeaturedEvents } from '@/lib/articleService'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const featuredEvents = await getFeaturedEvents(3)

  return (
    <div>
      {/* Hero */}
      <HomeHero />

      {/* 關於我們 */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-[#FFF5E6] rounded-full mb-4">
              <span className="text-[#FFB84D] font-medium">About Us</span>
            </div>
            <h2 className="text-3xl font-bold text-[#2C3E50] mb-4">關於我們的協會</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#FFB84D] to-[#FFA07A] mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img src="/activity/20250213/20250213_activity_1.jpg" alt="協會介紹" className="rounded-2xl shadow-lg w-full h-auto" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-[#2C3E50] mb-4">我們的使命</h3>
              <p className="text-[#6B7280] mb-6 leading-relaxed">
                本會前身「台灣早餐速食促進協會」，由多家早餐速食業之翹楚所共同努力促成之，奉內政部台內社字第0930071455號許可並於94年2月25日正式成立並推選張廷章先生擔任創會理事長，
                本著以同業聯盟及經驗分享為宗旨，共同致力於促進速食連鎖加盟事業之健全發展。
              </p>
              <p className="text-[#6B7280] mb-6 leading-relaxed">
                經第二屆理事長蔡澔鎔先生努力，第三屆會員大會提案正式通過並奉內政部台內社字第0980037539號許可核准正名為「台灣速食餐飲協會」，更名首屆理事長為葉益芳先生。
                未來，本會將秉持專業的態度，提供會員教育講習、海外市場經營資訊、供應鏈輔導諮詢等業務，期望本會成為兩岸速食餐飲產業最大服務平台的願景得以實現。
              </p>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#FFB84D] to-[#FFA07A] text-[#2C3E50] font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                詳細了解
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 服務與活動 */}
      <HomeServices />

      {/* 最新活動 */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-[#FFF5E6] rounded-full mb-4">
              <span className="text-[#FFB84D] font-medium">Events</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-4">最新活動</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#FFB84D] to-[#FFA07A] mx-auto rounded-full mb-6" />
            <p className="text-[#6B7280] max-w-2xl mx-auto">
              定期舉辦各類活動，促進會員交流與產業發展
            </p>
          </div>

          {/* Event Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredEvents.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-[#FFB84D]/10"
              >
                {/* Cover image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold text-lg leading-snug">{event.title}</h3>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-6 space-y-4">
                  <p className="text-[#6B7280] text-sm leading-relaxed line-clamp-2">
                    {event.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-[#FFB84D]/20">
                    <div className="flex items-center text-sm text-[#6B7280]">
                      <Calendar className="w-4 h-4 text-[#FFB84D] mr-3 flex-shrink-0" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-[#6B7280]">
                      <MapPin className="w-4 h-4 text-[#FFB84D] mr-3 flex-shrink-0" />
                      {event.location}
                    </div>
                    {event.participants && (
                      <div className="flex items-center text-sm text-[#6B7280]">
                        <Users className="w-4 h-4 text-[#FFB84D] mr-3 flex-shrink-0" />
                        {event.participants}
                      </div>
                    )}
                  </div>

                  <div className="pt-2 flex items-center text-[#FFB84D] group-hover:text-[#FFA07A] transition-colors">
                    <span className="text-sm font-medium">查看詳情</span>
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA Banner */}
          <div className="mt-16 bg-gradient-to-br from-[#FFB84D]/10 to-[#FFF5E6] rounded-3xl p-8 md:p-12 text-center">
            <h3 className="text-2xl font-bold text-[#2C3E50] mb-4">更多精彩活動</h3>
            <p className="text-[#6B7280] mb-6 max-w-2xl mx-auto">
              查看所有活動資訊，不要錯過任何與產業夥伴交流的機會
            </p>
            <Link
              href="/events"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#FFB84D] to-[#FFA07A] text-[#2C3E50] font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              查看所有活動
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
