'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

const eventCategories = [
  { label: '例會', value: '例會' },
  { label: '參訪活動', value: '參訪活動' },
]

const eventsPerPage = 12

export default function EventsClient({ initialEvents }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentCategory, setCurrentCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredBySearch = useMemo(() => {
    if (!searchQuery) return initialEvents
    const q = searchQuery.toLowerCase()
    return initialEvents.filter(e =>
      e.title.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q) ||
      e.location.toLowerCase().includes(q)
    )
  }, [initialEvents, searchQuery])

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
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container-custom">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
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
                      <span className="text-sm text-gray-500">{event.location}</span>
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
