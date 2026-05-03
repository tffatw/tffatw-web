"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "首頁" },
  { href: "/about", label: "關於協會" },
  { href: "/leadership", label: "協會成員" },
  { href: "/events", label: "活動資訊" },
  { href: "/contact", label: "聯絡我們" },
];

export default function TheHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-3">
            <img
              src="/images/logo.jpg"
              alt="台灣速食餐飲協會"
              className="h-10 w-auto"
            />
            <div>
              <p className="text-[#2C3E50] font-semibold leading-tight">
                台灣速食餐飲協會
              </p>
              <p className="text-xs text-[#6B7280]">
                Taiwan Fast Food Association
              </p>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`relative group text-sm transition-colors duration-300 ${pathname === href
                    ? "text-[#FFB84D] font-semibold"
                    : "text-[#2C3E50] hover:text-[#FFB84D]"
                  }`}
              >
                {label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-[#FFB84D] transition-all duration-300 ${pathname === href ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                />
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[#FFF5E6] transition-colors"
            aria-label="選單"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-[#2C3E50]" />
            ) : (
              <Menu className="h-6 w-6 text-[#2C3E50]" />
            )}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#FFB84D]/20">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-2 text-sm transition-all duration-300 hover:pl-2 ${pathname === href
                    ? "text-[#FFB84D] font-semibold pl-2"
                    : "text-[#2C3E50] hover:text-[#FFB84D]"
                  }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
