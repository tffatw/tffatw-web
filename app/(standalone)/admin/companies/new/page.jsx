import CompanyForm from '../CompanyForm'

export const metadata = { title: '新增公司 | TFFATW 後台' }

export default function NewCompanyPage() {
  return (
    <div>
      <h1 className="text-xl font-medium text-[#333333] mb-6">新增公司</h1>
      <CompanyForm />
    </div>
  )
}
