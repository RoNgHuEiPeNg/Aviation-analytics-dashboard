# 🛫 Aviation Analytics Dashboard

<div align="center">

**High-Contrast "Ops Center" Edition**

[![Made with Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_V4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Open Data](https://img.shields.io/badge/Open_Data-Taiwan_Immigration-blue?style=for-the-badge)](https://opendata.immigration.gov.tw/)

[English](#english) | [繁體中文](#繁體中文)

</div>

---

<a name="english"></a>
## 🌐 English

### Overview

A terminal-inspired, industrial-grade aviation analytics dashboard designed for high-priority operational monitoring. This tool visualizes **real-time immigration forecast data** from Taiwan's 44 airports and seaports using a refined, high-contrast aesthetic optimized for operations centers.

### ✨ Key Features

| Feature | Description |
|---------|-------------|
| **Smart API Orchestration** | Automatically scans 44 government API endpoints on startup to identify active data channels |
| **Intelligent Filtering** | Dropdown menu only shows locations with available data, including live record counts |
| **High-Contrast Industrial UI** | Tailwind CSS V4 design optimized for readability in bright environments |
| **Real-time KPI Dashboard** | Multi-colored charts for nationality distribution and age statistics |
| **Zero-Latency Cache** | Pre-fetched data enables instant switching between locations |

### 🛠️ Tech Stack

- **Frontend**: HTML5, Tailwind CSS V4, Vanilla JavaScript
- **Backend**: Node.js (Lightweight Proxy Server)
- **Data Source**: [Taiwan Immigration Bureau Open Data API](https://opendata.immigration.gov.tw/)
- **Typography**: Outfit (Display) + Geist (Body/Mono)

### 🚀 Quick Start

**Prerequisites**: [Node.js](https://nodejs.org/) v14+

```bash
# 1. Clone the repository
git clone https://github.com/RoNgHuEiPeNg/Aviation-analytics-dashboard.git

# 2. Navigate to the project folder
cd Aviation-analytics-dashboard

# 3. Start the server
node server.js

# 4. Open your browser
# Visit http://localhost:3000
```

### 📁 Project Structure

```
Aviation-analytics-dashboard/
├── index.html      # Main UI (Tailwind V4 + Custom Styles)
├── app.js          # Frontend logic (API handling, charts, caching)
├── server.js       # Node.js proxy server (CORS bypass)
└── README.md       # This file
```

### 📊 Supported Locations

The dashboard supports **44 entry/exit points** across Taiwan:
- **Airports**: Taoyuan (TPE), Songshan (TSA), Kaohsiung (KHH), Taichung, Tainan, Hualien, Taitung, Kinmen, Penghu, Matsu
- **Seaports**: Keelung, Kaohsiung, Taichung, Anping, Hualien, Magong, Kinmen Shuitou, Matsu Fuao

---

<a name="繁體中文"></a>
## 🇹🇼 繁體中文

### 專案概述

這是一套以終端機風格設計、工業等級的航空分析儀表板，專為高優先級的營運監控而打造。本工具視覺化呈現台灣 **44 個機場與港口** 的即時入出境人次預報數據，採用針對中控室環境優化的高對比美學設計。

### ✨ 核心功能

| 功能 | 說明 |
|------|------|
| **智慧 API 編排** | 啟動時自動掃描 44 個政府 API 端點，精確識別有效資料通道 |
| **動態智慧過濾** | 下拉選單僅顯示目前具備資料的地點，並即時標註人次統計 |
| **高對比工業 UI** | 基於 Tailwind CSS V4 打造，針對明亮環境進行閱讀優化 |
| **即時 KPI 儀表板** | 提供多色圖表，快速分析旅客國籍分佈與年齡統計 |
| **零延遲快取引擎** | 預取資料後，切換查詢地點達到即時響應 |

### 🛠️ 技術架構

- **前端**: HTML5, Tailwind CSS V4, 原生 JavaScript
- **後端**: Node.js（輕量級代理伺服器）
- **資料來源**: [內政部移民署開放資料平台](https://opendata.immigration.gov.tw/)
- **字體**: Outfit（標題）+ Geist（內文/等寬）

### 🚀 快速啟動

**前置需求**: [Node.js](https://nodejs.org/) v14 以上版本

```bash
# 1. 複製專案
git clone https://github.com/RoNgHuEiPeNg/Aviation-analytics-dashboard.git

# 2. 進入專案資料夾
cd Aviation-analytics-dashboard

# 3. 啟動伺服器
node server.js

# 4. 開啟瀏覽器
# 前往 http://localhost:3000
```

### 📁 專案結構

```
Aviation-analytics-dashboard/
├── index.html      # 主介面（Tailwind V4 + 自訂樣式）
├── app.js          # 前端邏輯（API 處理、圖表、快取）
├── server.js       # Node.js 代理伺服器（解決 CORS 問題）
└── README.md       # 本文件
```

### 📊 支援地點

本儀表板支援台灣 **44 個出入境據點**：
- **機場**: 桃園（TPE）、松山（TSA）、高雄（KHH）、台中、台南、花蓮、台東、金門、澎湖、馬祖
- **港口**: 基隆、高雄、台中、安平、花蓮、馬公、金門水頭、馬祖福澳

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

<div align="center">

**Made with ❤️ for Taiwan's Aviation Analytics**

</div>
