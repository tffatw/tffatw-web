'use client'

import Link from 'next/link'
import { ArrowRight, Calendar, MapPin, Users } from 'lucide-react'
import { eventService } from '@/lib/eventService'

export default function EventsPreviewSection() {
  const events = eventService.getFeaturedEvents(3)

  return (
    <section id="events" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-[#FFF5E6] rounded-full mb-4">
            <span className="text-[#FFB84D] text-sm font-medium">Events</span>
          </div>
          <h2 className="text-3xl md:text-4xl text-[#2C3E50] font-semibold mb-4">最新活動</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#FFB84D] to-[#FFA07A] mx-auto rounded-full mb-6" />
          <p className="text-[#6B7280] max-w-2xl mx-auto">
            定期舉辦各類活動，促進會員交流與產業發展
          </p>
        </div>

        {events.length === 0 ? (
          <div className="text-center text-[#6B7280] py-12">目前沒有活動資訊</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-[#FFB84D]/10"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-lg font-semibold leading-snug">{event.title}</h3>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-[#6B7280] text-sm leading-relaxed line-clamp-2">
                    {event.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-[#FFB84D]/20">
                    <div className="flex items-center text-sm text-[#6B7280]">
                      <Calendar className="w-4 h-4 text-[#FFB84D] mr-3 flex-shrink-0" />
                      {event.date}
                    </div>
                    {event.location && (
                      <div className="flex items-center text-sm text-[#6B7280]">
                        <MapPin className="w-4 h-4 text-[#FFB84D] mr-3 flex-shrink-0" />
                        {event.location}
                      </div>
                    )}
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
        )}

        <div className="mt-16 bg-gradient-to-br from-[#FFB84D]/10 to-[#FFF5E6] rounded-3xl p-8 md:p-12 text-center">
          <h3 className="text-2xl text-[#2C3E50] font-semibold mb-4">更多精彩活動</h3>
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
  )
}
