import './globals.css'

export const metadata = {
  title: '台灣速食餐飲協會',
  description: '台灣速食餐飲協會官方網站',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  )
}
