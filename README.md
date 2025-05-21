# 協會官網

這是一個使用Vue 3和Tailwind CSS構建的協會官方網站，提供協會資訊展示、活動管理等功能。

## 功能特點

- 響應式設計，適配各種螢幕尺寸
- 展示協會基本資訊（關於協會、領導團隊、合作品牌）
- 展示協會活動資訊及活動詳情
- 聯絡表單功能

## 技術棧

- Vue 3
- Vue Router
- Tailwind CSS
- Vite

## 專案結構

```
association-website/
├── public/          # 公共資源檔案
├── src/             # 原始碼目錄
│   ├── assets/      # 靜態資源
│   ├── components/  # 通用元件
│   ├── router/      # 路由配置
│   ├── views/       # 頁面元件
│   ├── App.vue      # 應用主元件
│   ├── main.js      # 入口檔案
│   └── style.css    # 全域樣式
├── index.html       # HTML模板
└── vite.config.js   # Vite配置
```

## 開發指南

### 安裝依賴

```bash
npm install
```

### 啟動開發服務

```bash
npm run dev
```

### 構建生產版本

```bash
npm run build
```

## 頁面概覽

- 首頁：展示協會概況和最新活動
- 關於我們：協會歷史、使命和願景
- 協會領導：展示理事長、秘書長等領導資訊
- 合作品牌：展示合作夥伴資訊
- 活動資訊：展示協會舉辦的各類活動
- 聯絡我們：聯絡方式和留言表單

## GitHub Pages 部署

本項目已配置 GitHub Actions 工作流程，可自動部署到 GitHub Pages。

### 自動部署流程

1. 當代碼推送到 `main` 分支時，將自動觸發部署流程
2. GitHub Actions 會執行以下步驟：
   - 檢出代碼
   - 安裝依賴
   - 構建項目
   - 將構建結果部署到 `gh-pages` 分支

### 手動觸發部署

您也可以在 GitHub 倉庫的 Actions 頁面手動觸發部署流程。

### 注意事項

- 確保倉庫已啟用 GitHub Pages，並設置為從 `gh-pages` 分支部署
- 首次部署後，可能需要在倉庫設置中配置自定義域名（如需要）

# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).
