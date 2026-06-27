import AdminSidebar from './AdminSidebar'

export const metadata = { title: 'TFFATW 後台管理' }

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#FCFAFA]">
      <AdminSidebar />
      <main className="ml-[260px] p-8">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
