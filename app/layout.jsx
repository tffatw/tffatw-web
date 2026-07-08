import Script from 'next/script'
import './globals.css'

export const metadata = {
  title: '台灣速食餐飲協會',
  description: '台灣速食餐飲協會官方網站',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body>
        {children}
        {process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN && (
          <Script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{"token": "${process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN}"}`}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  )
}
