'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { eventService } from '@/lib/eventService'

const eventCategories = [
  { label: '例會', value: '例會' },
  { label: '參訪活動', value: '參訪活動' },
]

const eventsPerPage = 12

export default function EventsPage() {
  const [allEvents, setAllEvents] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [currentCategory, setCurrentCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setAllEvents(eventService.getAllEvents())
  }, [])

  const filteredBySearch = useMemo(() => {
    if (!searchQuery) return allEvents
    const q = searchQuery.toLowerCase()
    return allEvents.filter(e =>
      e.title.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q) ||
      e.location.toLowerCase().includes(q)
    )
  }, [allEvents, searchQuery])

  const filteredByCategory = useMemo(() => {
    if (currentCategory === 'all') return filteredBySearch
    return filteredBySearch.filter(e => e.type === currentCategory)
  }, [filteredBySearch, currentCategory])

  const totalPages = Math.max(1, Math.ceil(filteredByCategory.length / eventsPerPage))

  const filteredEvents = useMemo(() => {
    const start = (currentPage - 1) * eventsPerPage
    return filteredByCategory.slice(start, start + eventsPerPage)
  }, [filteredByCategory, currentPage])

  const displayedPages = useMemo(() => {
    let start = Math.max(1, currentPage - 2)
    let end = Math.min(totalPages, start + 4)
    if (end - start < 4 && start > 1) start = Math.max(1, end - 4)
    const pages = []
    for (let i = start; i <= end; i++) pages.push(i)
    return pages
  }, [currentPage, totalPages])

  const handleCategoryChange = (cat) => {
    setCurrentCategory(cat)
    setCurrentPage(1)
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

  const resetFilters = () => {
    setSearchQuery('')
    setCurrentCategory('all')
    setCurrentPage(1)
  }

  return (
    <div>
      <section className="bg-[#e0725f] text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">活動資訊</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">掌握協會最新動態與行業資訊</p>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleCategoryChange('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium ${currentCategory === 'all' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                全部
              </button>
              {eventCategories.map(cat => (
                <button
                  key={cat.value}
                  onClick={() => handleCategoryChange(cat.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${currentCategory === cat.value ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="搜尋活動..."
                className="border border-gray-300 rounded-full py-2 px-4 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container-custom">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">沒有找到符合條件的活動</h3>
              <p className="text-gray-500">請嘗試其他搜尋條件或瀏覽全部活動</p>
              <button onClick={resetFilters} className="mt-4 text-red-600 hover:text-red-800 font-medium">
                重置篩選條件
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map(event => (
                <div key={event.id} className="card overflow-hidden group">
                  <Link href={`/events/${event.id}`}>
                    <div className="relative overflow-hidden">
                      <img src={event.image} alt={event.title} className="w-full h-52 object-cover transition duration-500 group-hover:scale-105" />
                      <div className="absolute top-4 left-4">
                        <span className="inline-block bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded">{event.type}</span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <div className="flex items-center text-white">
                          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{event.date}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="p-6">
                    <Link href={`/events/${event.id}`}>
                      <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2 transition-colors hover:text-red-600">
                        {event.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{event.location}</span>
                      </div>
                      <Link href={`/events/${event.id}`} className="text-red-600 hover:text-red-800 font-medium text-sm">
                        查看詳情 &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 flex justify-center">
            <div className="flex space-x-1">
              <button
                onClick={() => currentPage > 1 && setCurrentPage(p => p - 1)}
                className={`px-3 py-1 rounded text-sm ${currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                上一頁
              </button>
              {displayedPages.map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded text-sm ${currentPage === page ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => currentPage < totalPages && setCurrentPage(p => p + 1)}
                className={`px-3 py-1 rounded text-sm ${currentPage === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                下一頁
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
