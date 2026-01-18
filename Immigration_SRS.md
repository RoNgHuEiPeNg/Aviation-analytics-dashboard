# 需求規格說明書 (SRS)：桃園機場入境人次預報查詢網站

## 1. 導言 (Introduction)
本文件旨在定義「桃園機場入境人次預報查詢網站」的功能與技術需求，讓使用者能透過視覺化介面查詢移民署提供的入出境統計資料。

## 2. 綜合描述 (General Description)
使用者可透過網頁介面選擇特定機場及出入境類別，系統將串接「內政部移民署開放資料 API」獲取預報人次數據，並以表格形式呈現查詢結果。

## 3. 系統功能需求 (Functional Requirements)

### 3.1 API 資料整合清單
依據移民署 API 文件，系統應支援以下查詢維度：
- **機場類別**：桃園 (TPE)、松山 (TSA)、高雄 (KHH)、台中 (RMQ)、台南 (TNN)、花蓮 (HUN)、台東 (TTT)、金門 (KNH)、澎湖馬公 (MZG)、嘉義 (CYI) 等。
- **出入境別**：入境 (1)、過境 (3)、出境 (5)。
- **特殊篩選 (桃園專屬)**：支援第一航廈及第二航廈的細分查詢。

### 3.2 使用者介面與視覺設計需求 (UI/UX Design)
依據 `frontend-design` 與 `kpi-dashboard-design` 技能規範，本專案將採用 **「航空工業精煉感 (Refined Aviation Aesthetic)」** 並整合 **「數據戰情中心 (Operations Center)」** 指標：

- **KPI 儀表板 (Dashboard Cards)**：
    - **總預報人數 (Total PAX)**：當前查詢條件下的總人數。
    - **最大來源國 (Primary Nationality)**：佔比最高的國籍。
    - **主要航廈 (Terminal Load)**：各航廈的人數分佈熱度。
- **數據視覺化 (Visualization)**：
    - **國籍分佈圖**：使用簡單的水平比例尺 (Bar) 顯示前五大國籍。
    - **年齡分段分佈**：顯示不同年齡層的人數對比。
- **排版 (Typography)**：...

### 3.3 業務邏輯 (Business Logic)
- 系統應根據使用者的選擇，動態組成 API URL。
- 例如：桃園機場 (TPE) + 入境第一航廈 (11) -> `https://opendata.immigration.gov.tw/APIS/TPE11`。

## 4. 非功能性需求 (Non-functional Requirements)
- **效能**：API 回傳後應即時更新表格，請求等待期間應顯示 Loading 狀態。
- **易用性**：介面應簡潔直觀，支援響應式設計 (RWD)。

## 6. API 路徑對照表 (Full API Mapping)

依據 `v2/api-docs`，以下為所有可用的查詢路徑及其功能描述，開發時應以此表作為下拉選單與 URL 動態生成的唯一依據。

| API 路徑 | 功能描述 / 機場資訊 |
| :--- | :--- |
| `/APIS/CYI1` | 嘉義機場資訊(入境) |
| `/APIS/CYI3` | 嘉義機場資訊(過境) |
| `/APIS/CYI5` | 嘉義機場資訊(出境) |
| `/APIS/HUN1` | 花蓮機場資訊(入境) |
| `/APIS/HUN5` | 花蓮機場資訊(出境) |
| `/APIS/KHH1` | 高雄機場資訊(入境) |
| `/APIS/KHH3` | 高雄機場資訊(過境) |
| `/APIS/KHH5` | 高雄機場資訊(出境) |
| `/APIS/MZG1` | 澎湖馬公機場資訊(入境) |
| `/APIS/MZG5` | 澎湖馬公機場資訊(出境) |
| `/APIS/PIF1` | 屏東機場資訊(入境) |
| `/APIS/PIF5` | 屏東機場資訊(出境) |
| `/APIS/RMQ1` | 台中機場資訊(入境) |
| `/APIS/RMQ3` | 台中機場資訊(過境) |
| `/APIS/RMQ5` | 台中機場資訊(出境) |
| `/APIS/TNN1` | 台南機場資訊(入境) |
| `/APIS/TNN3` | 台南機場資訊(過境) |
| `/APIS/TNN5` | 台南機場資訊(出境) |
| `/APIS/TPE1` | 桃園機場資訊(入境) |
| `/APIS/TPE11` | 桃園機場資訊(入境第一航廈) |
| `/APIS/TPE12` | 桃園機場資訊(入境第二航廈) |
| `/APIS/TPE3` | 桃園機場資訊(過境) |
| `/APIS/TPE5` | 桃園機場資訊(出境) |
| `/APIS/TPE51` | 桃園機場資訊(出境第一航廈) |
| `/APIS/TPE52` | 桃園機場資訊(出境第二航廈) |
| `/APIS/TSA1` | 松山機場資訊(入境) |
| `/APIS/TSA3` | 松山機場資訊(過境) |
| `/APIS/TSA5` | 松山機場資訊(出境) |
| `/APIS/TTT1` | 台東機場資訊(入境) |
| `/APIS/TTT5` | 台東機場資訊(出境) |
| `/APIS/TW1FO1` | 福澳港資訊(入境) |
| `/APIS/TW1FO5` | 福澳港資訊(出境) |
| `/APIS/TW1ST1` | 水頭港資訊(入境) |
| `/APIS/TW1ST5` | 水頭港資訊(出境) |
| `/APIS/TWHUN1` | 花蓮港資訊(入境) |
| `/APIS/TWHUN5` | 花蓮港資訊(出境) |
| `/APIS/TWKEL1` | 基隆港資訊(入境) |
| `/APIS/TWKEL5` | 基隆港資訊(出境) |
| `/APIS/TWKHH1` | 高雄港資訊(入境) |
| `/APIS/TWKHH5` | 高雄港資訊(出境) |
| `/APIS/TWTPE1` | 台北港資訊(入境) |
| `/APIS/TWTPE5` | 台北港資訊(出境) |
| `/APIS/TWTXG1` | 台中港資訊(入境) |
| `/APIS/TWTXG5` | 台中港資訊(出境) |
