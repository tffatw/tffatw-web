'use client'

import { useState } from 'react'

const currentBoardMembers = [
  {
    name: '蔡思庭', title: '理事長', image: '/images/chief.gif',
    experience: ['酷斯拉咖啡執行長', '紅橘子早午餐連鎖創辦人', '愛餡貓烘焙總經理', '天天蛋餅飯糰顧問', '天天韓式炙燒鍋顧問'],
  },
  {
    name: '蕭雅梅', title: '秘書長', image: '/images/chiefOfStaff.jpg',
    experience: ['少點鹽健康餐盒創辦人，擁有10間直營門市', '聚焦健康飲食、永續經營', '推動多品牌共創與人才孵化'],
  },
  {
    name: 'Leo', title: '首席顧問', image: '/images/deputyChiefOfStaff.png',
    experience: ['社團法人中華亞太創新銷售協會-理事長', '北京企業管理學院-副院長', '亮點企業管理諮詢有限公司-總經理', '盟勝國際、聯網股份有限公司-董事', '知樂學院-院長', 'YouTube 頻道「LEO老師開講」-主講人', 'YouTube 頻道「創業啟示錄」-主持人', '創作書籍：《魔術般打造高效團隊》、《價值百萬的感恩課》、《家長有智慧，孩子才聰慧》'],
  },
]

const pastChairmen = [
  { name: '張廷章', term: '創會會長', period: '2000-2004', company: '巨森食品企業有限公司', image: '/images/male_icon.png' },
  { name: '林坤炎', term: '榮譽理事長', period: '2000-2004', company: '巨森食品企業有限公司', image: '/images/male_icon.png' },
  { name: '許倉賓', term: '第一屆副理事長', period: '2000-2004', company: '弘爺國際企業股份有限公司', image: '/images/male_icon.png' },
  { name: '蔡澔鎔', term: '第二屆理事長', period: '2004-2008', company: '齋聖彥有限公司', image: '/images/male_icon.png' },
  { name: '陳筑怜', term: '第二屆副理事長', period: '2004-2008', company: '齋聖彥有限公司', image: '/images/male_icon.png' },
  { name: '葉益芳', term: '第三屆理事長', period: '2008-2015', company: '益方封口機公司', image: '/images/male_icon.png' },
  { name: '林良田', term: '第五,六屆理事長', period: '2008-2015', company: '板田實業有限公司', image: '/images/male_icon.png' },
  { name: '陳弘欽', term: '第七,八屆理事長', period: '2008-2015', company: '巧沛國際股份有限公司', image: '/images/male_icon.png' },
  { name: '莊茂山', term: '第九,十屆理事長', period: '2008-2015', company: '吉得堡食品有限公司', image: '/images/male_icon.png' },
]

const brandCategories = [
  { label: '餐飲服務', value: '餐飲服務' },
  { label: '供應商', value: '供應商' },
  { label: '食品製造商', value: '食品製造商' },
]

const brands = [
  { id: 1, name: '紅橘子', logo: '/images/redorange.png', category: '餐飲服務', description: '紅橘子，開啟你幸福的每一天。我們為了幸福而開店，當然也要每天都很幸福。', website: 'https://www.redorange.com.tw/' },
  { id: 2, name: '少點鹽', logo: '/images/saltless.png', category: '餐飲服務', description: '少點鹽健康餐盒專賣，顛覆傳統水煮餐盒印象，當天新鮮食材現烹調，少油少鹽呈現食物的原味，每口都新鮮，簡單卻又不失美味。', website: 'https://www.healthittaipei.com.tw' },
  { id: 3, name: '喜多生物科技', logo: '/images/bio_tech.jpg', category: '食品製造商', description: '喜多以「品質優先」「生產專精」「經營績效」之理念，幾十年來累積許多寶貴的專業經驗提供許多優質產品，並期許以真材實料做食品吃出健康歡喜多服務廣大消費者。', website: 'https://www.facebook.com/SIDUODRINK8848' },
  { id: 4, name: '艾力卡公司', logo: '/images/erica_tech.png', category: '供應商', description: '專業進口咖啡杯、餐盒的紙原料，只要連鎖店需要的杯、餐盒，我有廠商全配合。', website: 'https://www.twincn.com/item.aspx?no=94021730' },
  { id: 5, name: '快樂波浪紙杯工廠', logo: '/images/lodpol.png', category: '供應商', description: '我們是一群來自不同領域的工程師團隊，也是對紙杯製造充滿熱情的創業者，致力研究提升技術，應用科技解決問題。', website: 'https://lodpol.com/' },
  { id: 6, name: '味亦美', logo: '/images/wim.jpg', category: '餐飲服務', description: '味亦美秉持著不變的初衷，堅持品質、照顧分店、照顧員工、良心賺錢、回饋社會，一步一腳印的向未來邁進。', website: 'https://www.facebook.com/wim.tw?locale=zh_TW' },
  { id: 7, name: '東和食品', logo: '/images/howmama.jpg', category: '食品製造商', description: '東和食品創立於西元1965年3月，原先以生產農產品外銷，接著加入水產罐頭製造，是首創國內以水產罐頭多樣化產品銷售國外市場之先例。', website: 'https://www.how-mama.com.tw/?rcode=HZDAUM3H' },
  { id: 8, name: '鮮大王', logo: '/images/freshking.jpg', category: '食品製造商', description: '家有鮮大王，清水變雞湯"是我公司希望提供好的產品，讓您的美食更俱色、香、味，同時也讓您的好廚藝更加突出。', website: 'http://www.freshking.com.tw/default.asp' },
  { id: 9, name: '展安食品', logo: '/images/giga_foods.png', category: '食品製造商', description: '成立於 2013 年，遵循創始初心，於食品業界奠定高品質定位。展安堅持以頂級設備及廚藝搭配新鮮、健康、營養的當季食材烹飪出能夠感動您的料理。', website: 'https://www.gigafoods.com.tw/' },
  { id: 10, name: '樂廚', logo: '/images/lechef.png', category: '食品製造商', description: '創造健康樂活Time, 享受簡單輕鬆 Diy 料理', website: 'https://www.lechef.tw/' },
]

export default function LeadershipPage() {
  const [currentCategory, setCurrentCategory] = useState('all')
  const filteredBrands = currentCategory === 'all' ? brands : brands.filter(b => b.category === currentCategory)

  return (
    <div>
      <section className="bg-[#e0725f] text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">協會成員</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">了解協會領導團隊，共同推動行業發展</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">本屆理事會</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">第十一屆理事會成員由行業內著名企業領導和專業人士組成</p>
          </div>
          {currentBoardMembers.map((member, i) => (
            <div key={i} className="mb-16">
              <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
                <div className={`overflow-hidden rounded-full border-4 border-red-100 shadow-lg flex-shrink-0 ${member.title === '理事長' ? 'w-64 h-64' : 'w-48 h-48'}`}>
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-red-600 font-medium mb-4">{member.title}</p>
                  <ul className="list-disc list-inside text-gray-600 leading-relaxed">
                    {member.experience.map((exp, j) => <li key={j}>{exp}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">歷屆理事長</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">感謝歷屆理事長為協會發展做出的重要貢獻</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pastChairmen.map((c, i) => (
              <div key={i} className="card p-6 text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-red-100 mx-auto mb-4">
                  <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">{c.name}</h3>
                <p className="text-red-600 font-medium mb-2">{c.term}</p>
                <p className="text-gray-600 text-sm mb-2">{c.period}</p>
                <p className="text-gray-600 text-sm">{c.company}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">品牌成員</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">匯聚了國內頂尖速食餐飲品牌的菁英領導者，每位成員皆為業界翹楚，憑藉豐富的市場經驗與專業知識，共同致力於推動產業進步與創新。</p>
          </div>
          <div className="mb-8 flex flex-wrap justify-center gap-4">
            <button onClick={() => setCurrentCategory('all')} className={`px-4 py-2 rounded-full text-sm font-medium ${currentCategory === 'all' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>全部</button>
            {brandCategories.map(cat => (
              <button key={cat.value} onClick={() => setCurrentCategory(cat.value)} className={`px-4 py-2 rounded-full text-sm font-medium ${currentCategory === cat.value ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>{cat.label}</button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBrands.map(brand => (
              <div key={brand.id} className="card p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-center mb-6">
                  <img src={brand.logo} alt={brand.name} className="h-20 object-contain" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">{brand.name}</h3>
                <p className="text-sm text-gray-600 text-center mb-4">{brand.category}</p>
                <p className="text-gray-600 text-sm mb-4">{brand.description}</p>
                <div className="text-center">
                  <a href={brand.website} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800 text-sm font-medium">訪問官網 →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
