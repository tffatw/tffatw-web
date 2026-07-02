export const metadata = {
  title: "關於我們 - 台灣速食餐飲協會",
  description:
    "了解台灣速食餐飲協會的歷史、使命和願景。本協會致力於促進速食連鎖加盟事業健全發展，提供會員教育講習、海外市場經營資訊等專業服務。",
  keywords:
    "台灣速食餐飲協會,關於我們,協會歷史,使命願景,速食餐飲,連鎖加盟,行業發展",
};

const timelineItems = [
  {
    num: 1,
    year: "2005年 - 協會成立",
    desc: "協會由行業內20家領先企業共同發起成立，致力於搭建行業交流平台，促進行業健康發展。",
  },
  {
    num: 2,
    year: "2006年 - 擴大發展",
    desc: "會員數量增長，協會影響力逐步擴大，成功舉辦首屆行業峰會，吸引了全國各地的行業代表參與。",
  },
  {
    num: 3,
    year: "2010年 - 行業標準制定",
    desc: "協會牽頭制定多項行業標準，得到國家相關部門認可，為行業規範化發展奠定基礎。",
  },
  {
    num: 4,
    year: "2015年 - 國際合作",
    desc: "協會與多個國際組織建立合作關係，開始積極參與國際交流活動，提升行業國際影響力。",
  },
  {
    num: 5,
    year: "2020年 - 數位化轉型",
    desc: "協會推動行業數位化轉型，設立創新基金，支持會員企業技術創新，提高行業競爭力。",
  },
  {
    num: 6,
    year: "今天 - 繼續前行",
    desc: "協會現已發展成為擁有多家會員單位的行業領軍組織，繼續致力於促進行業可持續發展，為會員創造更多價值。",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="bg-gradient-to-r from-[#FFB84D] to-[#FFA07A] text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">關於我們</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            了解我們協會的歷史、使命和願景
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                我們的協會
              </h2>
              <div className="w-20 h-1 bg-[#FFB84D] mb-6"></div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                本會前身「台灣早餐速食促進協會」，由多家早餐速食業之翹楚所共同努力促成之，奉內政部台內社字第0930071455號許可並於94年2月25日正式成立並推選張廷章先生擔任創會理事長，本著以同業聯盟及經驗分享為宗旨，共同致力於促進速食連鎖加盟事業之健全發展。經第二屆理事長蔡澔鎔先生努力，第三屆會員大會提案正式通過並奉內政部台內社字第0980037539號許可核准正名為「台灣速食餐飲協會」，更名首屆理事長為葉益芳先生。
                未來，本會將秉持專業的態度，提供會員教育講習、海外市場經營資訊、供應鏈輔導諮詢等業務，期望本會成為兩岸速食餐飲產業最大服務平台的願景得以實現。
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                致力於促進早餐速食連鎖加盟事業之健全發展
              </p>
            </div>
            <div>
              <img
                src="/activity/20250213/20250213_activity_1.jpg"
                alt="協會活動"
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              我們的使命與願景
            </h2>
            <div className="w-20 h-1 bg-[#FFB84D] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card p-8">
              <div className="w-16 h-16 bg-[#FFF5E6] rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-[#FFB84D]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                我們的使命
              </h3>
              <p className="text-gray-600 leading-relaxed">
                整合台灣速食餐飲產業菁英力量，提供專業教育培訓與市場資訊，促進供應鏈優化與國際市場拓展，強化產業競爭力與永續發展，為會員創造最大價值，同時推動台灣速食餐飲文化的創新與傳承。
              </p>
            </div>
            <div className="card p-8">
              <div className="w-16 h-16 bg-[#FFF5E6] rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-[#FFB84D]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                我們的願景
              </h3>
              <p className="text-gray-600 leading-relaxed">
                致力成為兩岸速食餐飲產業最具影響力的服務平台，連結產官學研各界資源，引領產業提升品質與效能，促進國際交流與合作，打造台灣速食餐飲品牌的國際競爭力，共創產業繁榮與消費者福祉的美好未來。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              我們的歷史與發展
            </h2>
            <div className="w-20 h-1 bg-[#FFB84D] mx-auto"></div>
          </div>
          <div className="relative border-l-4 border-[#FFB84D] ml-6 md:ml-8 pl-8 pb-8">
            <div className="space-y-12">
              {timelineItems.map((item) => (
                <div key={item.num} className="relative">
                  <div className="absolute -left-12 md:-left-14 top-0 w-8 h-8 bg-[#FFB84D] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{item.num}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {item.year}
                    </h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
