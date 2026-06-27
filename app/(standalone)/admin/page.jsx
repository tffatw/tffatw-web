import { getCloudflareContext } from '@opennextjs/cloudflare'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

async function getCompanies() {
  const { env } = await getCloudflareContext({ async: true })
  const { results } = await env.DB.prepare(
    'SELECT * FROM company_profiles ORDER BY name ASC'
  ).all()
  return results
}

export default async function AdminPage() {
  const companies = await getCompanies()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-medium text-[#333333]">公司管理</h1>
        <Link
          href="/admin/companies/new"
          className="bg-[#819C73] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#819C73]/90 transition-colors"
        >
          + 新增公司
        </Link>
      </div>

      {companies.length === 0 ? (
        <div className="text-center py-20 text-[#666666]">
          <p className="text-base">尚無公司資料</p>
          <Link href="/admin/companies/new" className="text-[#819C73] text-sm mt-2 inline-block hover:underline">
            新增第一間公司
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#EBE4D8] overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#EBE4D8]/40 border-b border-[#EBE4D8]">
              <tr>
                <th className="text-left px-6 py-3 text-[#666666] font-medium">公司名稱</th>
                <th className="text-left px-6 py-3 text-[#666666] font-medium">網址代碼</th>
                <th className="text-left px-6 py-3 text-[#666666] font-medium">聯絡 Email</th>
                <th className="text-left px-6 py-3 text-[#666666] font-medium">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBE4D8]">
              {companies.map((company) => (
                <tr key={company.id} className="hover:bg-[#FCFAFA]">
                  <td className="px-6 py-4 font-medium text-[#333333]">{company.name}</td>
                  <td className="px-6 py-4 text-[#666666]">
                    <a
                      href={`/members/${company.slug}`}
                      target="_blank"
                      className="text-[#819C73] hover:underline"
                    >
                      /members/{company.slug}
                    </a>
                  </td>
                  <td className="px-6 py-4 text-[#666666]">{company.contact_email ?? '—'}</td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/companies/${company.id}/edit`}
                      className="text-[#819C73] hover:underline"
                    >
                      編輯
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
