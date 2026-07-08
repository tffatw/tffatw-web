'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const weeklyData = [
  { date: '週一', visits: 120 },
  { date: '週二', visits: 185 },
  { date: '週三', visits: 240 },
  { date: '週四', visits: 195 },
  { date: '週五', visits: 280 },
  { date: '週六', visits: 320 },
  { date: '週日', visits: 385 },
]

function StatCard({ title, value, subtitle, trend }) {
  return (
    <div className="bg-white border border-[#EBE4D8] rounded-xl p-6 hover:shadow-sm transition-shadow">
      <div className="text-sm text-[#666666] mb-2">{title}</div>
      <div className="text-3xl font-semibold text-[#819C73] mb-1">{value}</div>
      {subtitle && <div className="text-sm text-[#666666]">{subtitle}</div>}
      {trend !== undefined && (
        <div className={`mt-2 text-sm ${trend >= 0 ? 'text-[#819C73]' : 'text-red-500'}`}>
          {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% 較昨日
        </div>
      )}
    </div>
  )
}

export default function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-medium text-[#333333]">分析報表</h1>
        <p className="text-sm text-[#666666] mt-1">資料來源：Cloudflare Web Analytics（示意數據）</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="今日造訪" value="385" subtitle="次" trend={12.5} />
        <StatCard title="平均停留時間" value="2:45" subtitle="分鐘" />
        <StatCard title="跳出率" value="32%" />
        <StatCard title="新訪客" value="245" subtitle="人" />
      </div>

      <div className="bg-white border border-[#EBE4D8] rounded-xl p-6">
        <h3 className="text-sm font-medium text-[#333333] mb-6">過去 7 天造訪趨勢</h3>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#819C73" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#819C73" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#EBE4D8" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="#666666"
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: '#EBE4D8' }}
              tickLine={false}
            />
            <YAxis
              stroke="#666666"
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FCFAFA',
                border: '1px solid #EBE4D8',
                borderRadius: '8px',
                color: '#333333',
                fontSize: '13px',
              }}
              formatter={(value) => [`${value} 次`, '造訪']}
            />
            <Area
              type="monotone"
              dataKey="visits"
              stroke="#819C73"
              strokeWidth={2}
              fill="url(#colorVisits)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-[#EBE4D8] rounded-xl p-6">
          <h3 className="text-sm font-medium text-[#333333] mb-4">本週累計</h3>
          <div className="text-3xl font-semibold text-[#819C73]">1,725</div>
          <div className="text-sm text-[#666666] mt-1">次造訪</div>
        </div>
        <div className="bg-white border border-[#EBE4D8] rounded-xl p-6">
          <h3 className="text-sm font-medium text-[#333333] mb-4">總計造訪</h3>
          <div className="text-3xl font-semibold text-[#819C73]">24,680</div>
          <div className="text-sm text-[#666666] mt-1">次造訪</div>
        </div>
      </div>

      <div className="bg-[#EBE4D8]/30 border border-[#EBE4D8] rounded-xl p-4 text-sm text-[#666666]">
        <strong className="text-[#333333]">注意：</strong>
        以上為示意數據。若要顯示真實資料，請至 Cloudflare Dashboard → Web Analytics 啟用並設定
        <code className="mx-1 px-1.5 py-0.5 bg-white rounded text-xs">NEXT_PUBLIC_CF_ANALYTICS_TOKEN</code>
        環境變數，並可透過 Cloudflare Analytics GraphQL API 串接。
      </div>
    </div>
  )
}
