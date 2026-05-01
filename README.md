# 台灣速食餐飲連鎖協會 官方網站

台灣速食餐飲連鎖協會（TFFATW）的官方網站，提供協會資訊展示、活動管理等功能。

## 技術棧

- Next.js 14 (App Router)
- React 18
- Tailwind CSS

## 專案結構

```
tffatw-web/
├── app/                    # Next.js App Router 頁面
│   ├── (main)/             # 含 Header + Footer 的頁面群組
│   │   ├── page.jsx        # 首頁
│   │   ├── about/
│   │   ├── leadership/
│   │   ├── brands/
│   │   ├── events/
│   │   │   └── [id]/       # 活動詳情（動態路由）
│   │   └── contact/
│   ├── (standalone)/       # 無 Header/Footer 的頁面群組
│   │   ├── redOrange/
│   │   └── redOrange-backend/
│   ├── layout.jsx          # 根 layout
│   ├── globals.css         # 全域樣式
│   └── not-found.jsx       # 404 頁面
├── components/             # 共用元件
│   ├── TheHeader.jsx
│   └── TheFooter.jsx
├── lib/                    # 資料與服務
│   ├── events.json
│   └── eventService.js
├── public/                 # 靜態資源
│   ├── images/             # 品牌圖片
│   └── activity/           # 活動照片
└── next.config.js          # Next.js 設定（靜態匯出）
```

## 開發指南

```bash
npm install       # 安裝依賴
npm run dev       # 啟動開發伺服器（http://localhost:3000）
npm run build     # 建置生產版本（輸出至 out/）
npm run preview   # 本地預覽生產版本
```

## 頁面一覽

| 路由 | 說明 |
|---|---|
| `/` | 首頁：輪播圖 + 最新活動 |
| `/about` | 關於我們：協會歷史、使命與願景 |
| `/leadership` | 協會成員：理事會與品牌成員 |
| `/brands` | 合作品牌：合作夥伴資訊 |
| `/events` | 活動資訊：搜尋、篩選、分頁 |
| `/events/[id]` | 活動詳情：圖片gallery、相關活動 |
| `/contact` | 聯絡我們：表單與 FAQ |
| `/redOrange` | 晨曦 Brunch 展示頁 |
| `/redOrange-backend` | 品牌設定後台（Demo） |

## 部署

本專案設定為靜態匯出（`output: 'export'`），透過 GitHub Actions 自動部署至 GitHub Pages。

推送至 `main` 分支時會自動觸發：執行 `npm run build` → 將 `out/` 目錄部署至 GitHub Pages。
