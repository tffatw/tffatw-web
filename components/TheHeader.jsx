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
    <header className="bg-white shadow">
      <nav className="container-custom py-4">
        <div className="flex flex-wrap justify-between items-center gap-4 md:flex-nowrap">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img src="/images/logo.jpg" alt="台灣速食餐飲協會" className="h-10 w-auto mr-2" />
              <span className="text-xl font-bold text-red-700">台灣速食餐飲協會</span>
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

          <div className={`${isMenuOpen ? 'block' : 'hidden'} md:flex`}>
            <ul className="flex flex-col md:flex-row md:space-x-8 space-y-2 md:space-y-0">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={
                      pathname === href
                        ? 'text-red-600 font-semibold'
                        : 'text-gray-700 hover:text-red-600 font-medium'
                    }
                  >
                    {label}
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
