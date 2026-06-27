'use client'

import { useState } from 'react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

const associationEmail = 'tffatw.org@gmail.com'

function getMailtoLink(eventTitle) {
  return `mailto:${associationEmail}?subject=${encodeURIComponent(`活動報名：${eventTitle}`)}`
}

function getStatusBadgeClass(status) {
  switch (status) {
    case '報名中': return 'bg-green-600 text-white'
    case '籌備中': return 'bg-yellow-600 text-white'
    case '已結束': return 'bg-gray-600 text-white'
    default: return 'bg-gray-600 text-white'
  }
}

const sharePaths = [
  'M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z',
  'M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z',
  'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
  'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
]

export default function EventDetailClient({ event, relatedEvents }) {
  const initialImage = event.images?.length > 0 ? event.images[0] : event.image
  const [currentImage, setCurrentImage] = useState(initialImage)

  return (
    <div className="pb-16">
      <section className="bg-gradient-to-r from-[#FFB84D] to-[#FFA07A] text-white pt-24 pb-16">
        <div className="container-custom">
          <div className="flex items-center text-amber-100 mb-4">
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
                <span className="px-3 py-1 text-sm bg-white/20 text-white rounded-full">{event.type}</span>
                <span className={`px-3 py-1 text-sm rounded-full ${getStatusBadgeClass(event.status)}`}>{event.status}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.title}</h1>
              <div className="flex flex-wrap text-amber-100 mb-6">
                <div className="flex items-center mr-6 mb-2">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center mr-6 mb-2">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{event.location}</span>
                </div>
              </div>
              <p className="text-lg">{event.description}</p>
            </div>
            <div className="md:col-span-4">
              {event.status === '報名中' ? (
                <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-4">活動報名</h3>
                  <p className="text-gray-600 mb-4">立即報名參加本次活動，名額有限，請儘早報名！</p>
                  <a href={getMailtoLink(event.title)} className="btn btn-primary w-full py-3">立即報名</a>
                </div>
              ) : event.status === '籌備中' ? (
                <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-4">活動籌備中</h3>
                  <p className="text-gray-600 mb-4">活動正在籌備中，敬請期待...</p>
                  <button className="btn btn-secondary w-full py-3">預約提醒</button>
                </div>
              ) : (
                <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-4">活動已結束</h3>
                  <p className="text-gray-600 mb-4">感謝您的關注，活動已結束。</p>
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
              <h2 className="text-2xl font-bold text-gray-800 mb-6">活動詳情</h2>

              {event.images?.length > 0 ? (
                <div className="mb-8">
                  <div className="mb-4">
                    <img src={currentImage} alt={event.title} className="w-full h-auto rounded-lg shadow-md object-cover aspect-video" />
                  </div>
                  <div className="flex overflow-x-auto space-x-2 pb-2">
                    {event.images.map((img, index) => (
                      <div
                        key={index}
                        onClick={() => setCurrentImage(img)}
                        className={`cursor-pointer border-2 rounded-md overflow-hidden transition-all w-24 h-24 flex-shrink-0 ${currentImage === img ? 'border-[#FFB84D]' : 'border-transparent hover:border-[#FFB84D]/60'}`}
                      >
                        <img src={img} alt={`${event.title} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mb-8">
                  <img src={event.image} alt={event.title} className="w-full h-auto rounded-lg shadow-md" />
                </div>
              )}

              <div className="prose max-w-none">
                <ReactMarkdown>{event.content ?? ''}</ReactMarkdown>
              </div>
            </div>

            <div>
              <div className="sticky top-8">
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">分享活動</h3>
                  <div className="flex space-x-4">
                    {sharePaths.map((path, i) => (
                      <a key={i} href="#" className="bg-gray-200 p-2 rounded-full hover:bg-[#FFF5E6] hover:text-[#FFB84D] transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d={path} />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">聯繫方式</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-gray-600 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                      <span className="text-gray-700">tffatw.org@gmail.com</span>
                    </div>
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-gray-600 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-gray-700">0916-044-823</span>
                    </div>
                  </div>
                </div>

                {relatedEvents.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">相關活動</h3>
                    <div className="space-y-4">
                      {relatedEvents.map(re => (
                        <div key={re.id} className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-500 mb-1">{re.date}</div>
                          <h4 className="font-medium text-gray-800 mb-1">{re.title}</h4>
                          <Link href={`/events/${re.id}`} className="text-[#FFB84D] text-sm hover:text-[#FFA07A]">查看詳情</Link>
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
