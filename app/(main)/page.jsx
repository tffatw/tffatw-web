'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { eventService } from '@/lib/eventService'

const slides = [
  { title: '台灣速食餐飲協會', image: '/images/homepage/1.png' },
  { title: '專業的行業支持', image: '/images/homepage/2.png' },
  { title: '定期舉辦行業活動', image: '/images/homepage/3.png' },
  { title: '新會員招募', image: '/images/homepage/4.png' },
]

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [featuredEvents, setFeaturedEvents] = useState([])

  useEffect(() => {
    setFeaturedEvents(eventService.getFeaturedEvents(3))
    const interval = setInterval(() => {
      setCurrentSlide(s => (s + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <section className="relative">
        <div className="carousel-container relative overflow-hidden aspect-[4/3] md:aspect-[3/1]">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-slide absolute inset-0 transition-opacity duration-1000 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
            >
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            </div>
          ))}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-gray-400'}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">關於我們的協會</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img src="/activity/20250213/20250213_activity_1.jpg" alt="協會介紹" className="rounded-lg shadow-lg w-full h-auto" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">我們的使命</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                本會前身「台灣早餐速食促進協會」，由多家早餐速食業之翹楚所共同努力促成之，奉內政部台內社字第0930071455號許可並於94年2月25日正式成立並推選張廷章先生擔任創會理事長，
                本著以同業聯盟及經驗分享為宗旨，共同致力於促進速食連鎖加盟事業之健全發展。
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                經第二屆理事長蔡澔鎔先生努力，第三屆會員大會提案正式通過並奉內政部台內社字第0980037539號許可核准正名為「台灣速食餐飲協會」，更名首屆理事長為葉益芳先生。
                未來，本會將秉持專業的態度，提供會員教育講習、海外市場經營資訊、供應鏈輔導諮詢等業務，期望本會成為兩岸速食餐飲產業最大服務平台的願景得以實現。
              </p>
              <Link href="/about" className="bg-[#e0725f] btn btn-primary hover:bg-[#d06050]">詳細了解</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">最新活動</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredEvents.map((event, index) => (
              <div key={index} className="card">
                <Link href={`/events/${event.id}`}>
                  <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                </Link>
                <div className="p-6">
                  <div className="flex items-center text-gray-500 mb-2">
                    <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {event.date}
                  </div>
                  <Link href={`/events/${event.id}`}>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 hover:text-red-600 transition-colors">
                      {event.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <Link href={`/events/${event.id}`} className="text-red-600 font-medium hover:text-red-800">
                    查看詳情 &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/events" className="bg-[#e0725f] btn btn-primary hover:bg-[#d06050]">查看所有活動</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
