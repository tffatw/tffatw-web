import TheHeader from '@/components/TheHeader'
import TheFooter from '@/components/TheFooter'

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <TheHeader />
      <main className="flex-grow">{children}</main>
      <TheFooter />
    </div>
  )
}
