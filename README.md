# 🌟 Wish Pool - 許願池

一個溫暖的線上許願池平台，讓願望被看見，讓祝福傳遞溫暖。

## 📋 專案概述

Wish Pool 是一個社群驅動的許願平台，使用者可以：
- 🎯 發布自己的願望
- 💝 為他人的願望送上祝福
- 🎉 分享願望實現的喜悅
- 🤝 建立正向互助的社群

## 🚀 快速開始

### 環境需求
- Node.js 18.0+
- npm 或 yarn

### 安裝步驟
```bash
# Clone 專案
git clone https://github.com/joechiboo/wish-pool.git
cd wish-pool

# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev
```

開啟 [http://localhost:5173](http://localhost:5173) 查看結果。

### 建置與部署
```bash
# 建置生產版本
npm run build

# 預覽建置結果
npm run preview
```

推送到 `main` 分支後，GitHub Actions 會自動部署到 GitHub Pages。

## 🏗️ 專案結構

```
wish-pool/
├── .github/workflows/  # GitHub Actions 部署設定
├── public/             # 靜態資源
├── src/
│   ├── components/     # Vue 元件
│   │   ├── layout/    # 佈局元件
│   │   └── wish/      # 願望相關元件
│   ├── router/        # Vue Router 路由設定
│   ├── stores/        # Pinia 狀態管理
│   ├── styles/        # 全域樣式
│   ├── types/         # TypeScript 類型定義
│   └── views/         # 頁面視圖
└── index.html
```

## 🛠️ 技術棧

- **框架**: Vue 3 + Vite
- **語言**: TypeScript
- **路由**: Vue Router 4
- **狀態管理**: Pinia
- **樣式**: Tailwind CSS 4
- **部署**: GitHub Pages

## ✨ 功能特色

- 🌈 漸層色彩設計，溫暖療癒的視覺風格
- 📱 響應式設計，支援手機、平板、桌面
- ⚡ 快速載入，優化的打包體積
- 🎨 流暢動畫，祝福星星飄散效果
- 🔒 支援匿名許願

## 📄 授權

本專案採用 MIT 授權

---

<p align="center">用愛與程式碼，讓每個願望都有實現的可能 💫</p>
