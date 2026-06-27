'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: '首頁' },
  { href: '/about', label: '關於協會' },
  { href: '/leadership', label: '協會成員' },
  { href: '/events', label: '活動資訊' },
  { href: '/contact', label: '聯絡我們' },
]

export default function TheHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <nav className="container-custom py-4">
        <div className="flex flex-wrap justify-between items-center md:flex-nowrap">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/images/logo.jpg" alt="台灣速食餐飲協會" className="h-10 w-auto" />
              <div>
                <p className="text-base font-bold text-[#2C3E50] leading-tight">台灣速食餐飲協會</p>
                <p className="text-xs text-[#6B7280] leading-tight">Taiwan Fast Food Association</p>
              </div>
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
            aria-label="選單"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <div className={`${isMenuOpen ? 'flex' : 'hidden'} flex-col w-full md:flex md:flex-row md:w-auto md:items-center`}>
            <ul className="flex flex-col md:flex-row md:space-x-8 space-y-1 md:space-y-0 border-t md:border-t-0 border-gray-100 pt-3 pb-2 md:py-0">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`relative group font-medium transition-colors duration-300 ${
                      pathname === href ? 'text-[#FFB84D]' : 'text-[#2C3E50] hover:text-[#FFB84D]'
                    }`}
                  >
                    {label}
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-[#FFB84D] transition-all duration-300 ${
                      pathname === href ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
