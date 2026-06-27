'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Building2, FileText, ArrowLeft } from 'lucide-react'

const navItems = [
  { href: '/admin', label: '公司管理', icon: Building2, exact: true },
  { href: '/admin/articles', label: '文章管理', icon: FileText },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  function isActive(href, exact) {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <aside className="w-[260px] h-screen fixed left-0 top-0 bg-[#EBE4D8] border-r border-black/5 flex flex-col">
      <div className="p-6">
        <p className="text-xs text-[#666666] mb-1 uppercase tracking-wider">台灣速食餐飲協會</p>
        <h2 className="text-[#333333] font-medium text-base leading-snug">後台管理系統</h2>
      </div>

      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const active = isActive(href, exact)
          return (
            <Link
              key={href}
              href={href}
              className={`relative flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${
                active
                  ? 'text-[#819C73] bg-white/30'
                  : 'text-[#666666] hover:bg-white/50'
              }`}
            >
              {active && (
                <span className="absolute left-0 top-2 bottom-2 w-1 bg-[#819C73] rounded-r-full" />
              )}
              <Icon className="w-4 h-4 shrink-0" />
              <span>{label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="px-3 pb-6">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-[#666666] hover:bg-white/50 transition-all"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          <span>回前台</span>
        </Link>
      </div>
    </aside>
  )
}
