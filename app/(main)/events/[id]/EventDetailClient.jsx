'use client'

import { useState } from 'react'
import Link from 'next/link'

const associationEmail = 'tffatw.org@gmail.com'

function getMailtoLink(eventTitle) {
  return `mailto:${associationEmail}?subject=${encodeURIComponent(`活動報名：${eventTitle}`)}`
}

function getStatusBadgeClass(status) {
  switch (status) {
    case '報名中': return 'bg-green-500 text-white'
    case '籌備中': return 'bg-yellow-500 text-white'
    case '已結束': return 'bg-gray-500 text-white'
    default: return 'bg-gray-500 text-white'
  }
}

export default function EventDetailClient({ event, relatedEvents }) {
  const initialImage = event.images?.length > 0 ? event.images[0] : event.image
  const [currentImage, setCurrentImage] = useState(initialImage)

  return (
    <div className="pb-16">
      <section className="bg-gradient-to-br from-[#FFB84D] to-[#FFA07A] text-white pt-36 pb-16">
        <div className="container-custom">
          <div className="flex items-center text-white/80 mb-4">
            <Link href="/events" className="flex items-center hover:text-white transition-colors">
              <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              返回活動列表
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 text-sm bg-white/20 text-white rounded-full backdrop-blur-sm">{event.type}</span>
                <span className={`px-3 py-1 text-sm rounded-full ${getStatusBadgeClass(event.status)}`}>{event.status}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.title}</h1>
              <div className="flex flex-wrap text-white/90 mb-6 gap-x-6 gap-y-2">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{event.location}</span>
                </div>
              </div>
              <p className="text-lg text-white/95">{event.description}</p>
            </div>
            <div className="md:col-span-4">
              {event.status === '報名中' ? (
                <div className="bg-white text-[#2C3E50] p-6 rounded-2xl shadow-xl">
                  <h3 className="text-xl font-bold mb-4">活動報名</h3>
                  <p className="text-[#6B7280] mb-4">立即報名參加本次活動，名額有限，請儘早報名！</p>
                  <a href={getMailtoLink(event.title)} className="block text-center py-3 bg-gradient-to-r from-[#FFB84D] to-[#FFA07A] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">立即報名</a>
                </div>
              ) : event.status === '籌備中' ? (
                <div className="bg-white text-[#2C3E50] p-6 rounded-2xl shadow-xl">
                  <h3 className="text-xl font-bold mb-4">活動籌備中</h3>
                  <p className="text-[#6B7280] mb-4">活動正在籌備中，敬請期待...</p>
                  <button className="w-full py-3 bg-gray-100 text-[#6B7280] font-semibold rounded-xl">預約提醒</button>
                </div>
              ) : (
                <div className="bg-white text-[#2C3E50] p-6 rounded-2xl shadow-xl">
                  <h3 className="text-xl font-bold mb-4">活動已結束</h3>
                  <p className="text-[#6B7280] mb-4">感謝您的關注，活動已結束。</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-[#2C3E50] mb-6">活動詳情</h2>

              {event.images?.length > 0 ? (
                <div className="mb-8">
                  <div className="mb-4">
                    <img src={currentImage} alt={event.title} className="w-full h-auto rounded-2xl shadow-md object-cover aspect-video" />
                  </div>
                  <div className="flex overflow-x-auto space-x-2 pb-2">
                    {event.images.map((img, index) => (
                      <div
                        key={index}
                        onClick={() => setCurrentImage(img)}
                        className={`cursor-pointer border-2 rounded-xl overflow-hidden transition-all w-24 h-24 flex-shrink-0 ${currentImage === img ? 'border-[#FFB84D]' : 'border-transparent hover:border-[#FFB84D]/40'}`}
                      >
                        <img src={img} alt={`${event.title} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mb-8">
                  <img src={event.image} alt={event.title} className="w-full h-auto rounded-2xl shadow-md" />
                </div>
              )}

              <div className="prose max-w-none text-[#2C3E50]">
                {(event.contentBlocks || []).map((block, index) => {
                  if (block.type === 'heading') {
                    return <h3 key={index} className="text-xl font-bold mt-6 mb-3 text-[#2C3E50]">{block.content}</h3>
                  }
                  if (block.type === 'paragraph') {
                    return <p key={index} className="mb-4 text-[#6B7280] leading-relaxed" dangerouslySetInnerHTML={{ __html: block.content }} />
                  }
                  if (block.type === 'list') {
                    return (
                      <ul key={index} className="list-disc pl-6 mb-4 text-[#6B7280]">
                        {block.items.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    )
                  }
                  return null
                })}
              </div>
            </div>

            <div>
              <div className="sticky top-24">
                <div className="bg-gradient-to-br from-[#F9F9F9] to-[#FFF5E6] p-6 rounded-2xl mb-6 border border-[#FFB84D]/20">
                  <h3 className="text-lg font-semibold text-[#2C3E50] mb-4">分享活動</h3>
                  <div className="flex space-x-3">
                    <a href="https://www.facebook.com/groups/152691983155490" className="bg-white p-2 rounded-full hover:bg-[#FFB84D] hover:text-white text-[#FFB84D] transition-colors shadow-sm" target="_blank" rel="noopener noreferrer">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#F9F9F9] to-[#FFF5E6] p-6 rounded-2xl border border-[#FFB84D]/20">
                  <h3 className="text-lg font-semibold text-[#2C3E50] mb-4">聯繫方式</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-[#FFB84D] mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                      <span className="text-[#6B7280] text-sm">tffatw.org@gmail.com</span>
                    </div>
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-[#FFB84D] mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-[#6B7280] text-sm">0916-044-823</span>
                    </div>
                  </div>
                </div>

                {relatedEvents.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-[#2C3E50] mb-4">相關活動</h3>
                    <div className="space-y-4">
                      {relatedEvents.map(re => (
                        <div key={re.id} className="bg-gradient-to-br from-[#F9F9F9] to-[#FFF5E6] p-4 rounded-2xl border border-[#FFB84D]/20">
                          <div className="text-sm text-[#6B7280] mb-1">{re.date}</div>
                          <h4 className="font-medium text-[#2C3E50] mb-1 text-sm">{re.title}</h4>
                          <Link href={`/events/${re.id}`} className="text-[#FFB84D] text-sm hover:text-[#FFA07A] transition-colors">查看詳情</Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
