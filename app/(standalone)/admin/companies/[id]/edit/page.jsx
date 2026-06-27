import { getCloudflareContext } from '@opennextjs/cloudflare'
import { notFound } from 'next/navigation'
import CompanyForm from '../../CompanyForm'

export const metadata = { title: '編輯公司 | TFFATW 後台' }

async function getCompany(id) {
  const { env } = await getCloudflareContext({ async: true })
  return await env.DB.prepare(
    'SELECT * FROM company_profiles WHERE id = ?'
  ).bind(id).first()
}

export default async function EditCompanyPage({ params }) {
  const { id } = await params
  const company = await getCompany(id)
  if (!company) notFound()

  return (
    <div>
      <h1 className="text-xl font-medium text-[#333333] mb-6">編輯公司</h1>
      <CompanyForm initialData={company} companyId={id} />
    </div>
  )
}
