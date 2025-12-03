# 許願池金流整合規劃

## 概述

整合綠界 ECPay 金流，讓使用者付款後才能刊登需求（願望），實現「付費發布」機制。

---

## 系統架構

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Vue 前端      │     │  Vercel API     │     │   綠界 ECPay    │
│  (GitHub Pages) │────▶│  (Serverless)   │────▶│   金流平台      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                               │                        │
                               │◀───── Webhook ────────┘
                               ▼
                        ┌─────────────────┐
                        │   Supabase      │
                        │   (資料庫)       │
                        └─────────────────┘
```

---

## 技術選型

### 後端：Vercel Serverless Functions

**為什麼選 Vercel？**
- 免費額度足夠初期使用（每月 100GB 頻寬、100 小時執行時間）
- 部署簡單，推 Git 自動部署
- 支援 Node.js / TypeScript
- 全球 CDN，速度快

**結構**
```
wish-pool-api/          # 獨立 repo
├── api/
│   ├── create-order.ts     # 建立訂單
│   ├── payment-notify.ts   # 接收綠界回調
│   ├── order-status.ts     # 查詢訂單狀態
│   └── wishes/
│       ├── create.ts       # 建立願望（付款後）
│       └── list.ts         # 取得願望列表
├── lib/
│   ├── ecpay.ts            # 綠界加密模組
│   ├── db.ts               # 資料庫連接
│   └── types.ts            # 型別定義
├── vercel.json
├── package.json
└── .env.local              # 環境變數（不進版控）
```

### 資料庫：Supabase

**為什麼選 Supabase？**
- 免費額度：500MB 儲存、50,000 月活用戶
- PostgreSQL 資料庫，功能完整
- 內建 Auth（未來可用）
- RESTful API 自動產生
- 台灣連線速度可接受（新加坡機房）

**資料表設計**
```sql
-- 訂單表
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_no VARCHAR(20) UNIQUE NOT NULL,      -- 訂單編號
  amount INTEGER NOT NULL,                    -- 金額（元）
  hours INTEGER NOT NULL,                     -- 購買時數
  status VARCHAR(20) DEFAULT 'pending',       -- pending/paid/failed/refunded
  customer_email VARCHAR(255),
  customer_name VARCHAR(100),
  wish_title VARCHAR(200),                    -- 願望標題（暫存）
  wish_content TEXT,                          -- 願望內容（暫存）
  wish_category VARCHAR(50),
  ecpay_trade_no VARCHAR(20),                 -- 綠界交易編號
  paid_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 願望表（付款成功後才建立）
CREATE TABLE wishes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(50),
  hours_purchased INTEGER,                    -- 購買時數
  hours_used INTEGER DEFAULT 0,               -- 已使用時數
  status VARCHAR(20) DEFAULT 'active',        -- active/matching/in_progress/completed
  contact_email VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_orders_order_no ON orders(order_no);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_wishes_status ON wishes(status);
```

---

## API 端點設計

### 1. 建立訂單 `POST /api/create-order`

**Request**
```json
{
  "hours": 10,
  "customerEmail": "user@example.com",
  "customerName": "王小明",
  "wishTitle": "幫我做一個網站",
  "wishContent": "需要一個形象網站...",
  "wishCategory": "網站開發"
}
```

**Response**
```json
{
  "success": true,
  "orderId": "uuid-xxx",
  "orderNo": "WP20240115001",
  "amount": 2000,
  "paymentUrl": "https://payment.ecpay.com.tw/...",
  "paymentHtml": "<form>...</form>"  // 或回傳表單 HTML
}
```

**處理流程**
1. 驗證輸入
2. 計算金額（時數 × 單價）
3. 產生訂單編號
4. 存入資料庫（狀態：pending）
5. 產生綠界加密資料
6. 回傳付款資訊

### 2. 綠界回調 `POST /api/payment-notify`

**綠界會 POST 以下資料：**
- MerchantID
- MerchantTradeNo（我們的訂單編號）
- TradeNo（綠界交易編號）
- RtnCode（1 = 成功）
- TradeAmt
- CheckMacValue（驗證碼）

**處理流程**
1. 驗證 CheckMacValue
2. 確認 RtnCode = 1
3. 更新訂單狀態為 paid
4. 建立願望記錄
5. 回傳 `1|OK`（綠界要求格式）

### 3. 查詢訂單 `GET /api/order-status?orderNo=WP20240115001`

**Response**
```json
{
  "orderNo": "WP20240115001",
  "status": "paid",
  "amount": 2000,
  "wishId": "uuid-xxx",  // 付款成功才有
  "paidAt": "2024-01-15T10:30:00Z"
}
```

### 4. 取得願望列表 `GET /api/wishes`

回傳已付款的願望列表（公開顯示）

### 5. 取得願望詳情 `GET /api/wishes/:id`

---

## 前端串接流程

### 使用者操作流程

```
1. 首頁許願池 → 點擊進入
        ↓
2. 填寫願望表單
   - 標題、內容、分類
   - Email（聯繫用）
        ↓
3. 選擇方案
   - 10 小時 / $2,000（新手價 $200/hr）
   - 20 小時 / $5,000（$250/hr）
   - 自訂時數
        ↓
4. 確認訂單 → 導向綠界付款頁
        ↓
5. 付款完成 → 返回成功頁面
        ↓
6. 願望刊登，等待媒合
```

### 前端新增頁面/元件

```
src/
├── views/
│   ├── CreateWishView.vue      # 修改：加入時數選擇
│   ├── CheckoutView.vue        # 新增：確認訂單頁
│   ├── PaymentSuccessView.vue  # 新增：付款成功頁
│   └── PaymentFailView.vue     # 新增：付款失敗頁
├── components/
│   └── PlanSelector.vue        # 新增：方案選擇元件
├── services/
│   └── api.ts                  # 新增：API 呼叫封裝
└── types/
    └── order.ts                # 新增：訂單相關型別
```

### API 服務封裝

```typescript
// src/services/api.ts
const API_BASE = import.meta.env.VITE_API_URL || 'https://wish-pool-api.vercel.app'

export const orderApi = {
  // 建立訂單
  async createOrder(data: CreateOrderRequest): Promise<CreateOrderResponse> {
    const res = await fetch(`${API_BASE}/api/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return res.json()
  },

  // 查詢訂單狀態
  async getOrderStatus(orderNo: string): Promise<OrderStatus> {
    const res = await fetch(`${API_BASE}/api/order-status?orderNo=${orderNo}`)
    return res.json()
  }
}

export const wishApi = {
  // 取得願望列表（已付款的）
  async getWishes(): Promise<Wish[]> {
    const res = await fetch(`${API_BASE}/api/wishes`)
    return res.json()
  }
}
```

---

## 綠界整合細節

### 測試環境

- 測試商店申請：https://vendor-stage.ecpay.com.tw/
- 測試信用卡號：4311-9522-2222-2222（有效期任意、安全碼任意）

### 必要參數

```
MerchantID: 測試商店編號
HashKey: 測試用 Key
HashIV: 測試用 IV
```

### 加密流程

```typescript
// lib/ecpay.ts 簡化示意
import crypto from 'crypto'

export function generateCheckMacValue(params: Record<string, string>, hashKey: string, hashIV: string) {
  // 1. 參數依照 A-Z 排序
  const sorted = Object.keys(params).sort().map(k => `${k}=${params[k]}`).join('&')

  // 2. 前後加上 HashKey 和 HashIV
  const raw = `HashKey=${hashKey}&${sorted}&HashIV=${hashIV}`

  // 3. URL Encode 後轉小寫
  const encoded = encodeURIComponent(raw).toLowerCase()

  // 4. SHA256 雜湊後轉大寫
  return crypto.createHash('sha256').update(encoded).digest('hex').toUpperCase()
}
```

---

## 定價方案

| 方案 | 時數 | 單價 | 總價 | 說明 |
|------|------|------|------|------|
| 新手體驗 | 10 hr | $200/hr | $2,000 | 首次許願優惠 |
| 標準方案 | 20 hr | $250/hr | $5,000 | 中型專案適用 |
| 進階方案 | 40 hr | $300/hr | $12,000 | 大型專案適用 |
| 自訂 | N hr | $300/hr | N × 300 | 彈性選擇 |

*實際定價可再調整

---

## 環境變數

### 後端 (.env.local)

```bash
# 綠界
ECPAY_MERCHANT_ID=商店編號
ECPAY_HASH_KEY=你的HashKey
ECPAY_HASH_IV=你的HashIV
ECPAY_PAYMENT_URL=https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5  # 測試
# ECPAY_PAYMENT_URL=https://payment.ecpay.com.tw/Cashier/AioCheckOut/V5      # 正式

# Supabase
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_KEY=你的service_key

# 應用
FRONTEND_URL=https://joechiboo.github.io/wish-pool
```

### 前端 (.env)

```bash
VITE_API_URL=https://wish-pool-api.vercel.app
```

---

## 部署步驟

### 1. 建立 Supabase 專案
1. 到 https://supabase.com 建立帳號
2. 新增專案（選新加坡區域）
3. 執行上面的 SQL 建立資料表
4. 取得 URL 和 Service Key

### 2. 建立後端 Repo 並部署到 Vercel
1. 新增 GitHub repo: `wish-pool-api`
2. 寫好 API 程式碼
3. 連結 Vercel，設定環境變數
4. 部署

### 3. 綠界商店申請
1. 註冊綠界帳號
2. 申請測試商店
3. 取得測試用 MerchantID、HashKey、HashIV
4. 設定回調網址：`https://wish-pool-api.vercel.app/api/payment-notify`

### 4. 前端串接
1. 安裝環境變數
2. 新增相關頁面和元件
3. 串接 API
4. 測試完整流程

---

## 時程估計

| 階段 | 內容 |
|------|------|
| Phase 1 | 後端 API 架構 + 綠界串接 |
| Phase 2 | 資料庫設計 + Supabase 設定 |
| Phase 3 | 前端頁面 + API 串接 |
| Phase 4 | 測試環境完整測試 |
| Phase 5 | 正式環境上線 |

---

## 安全注意事項

1. **HashKey / HashIV 絕對不能外洩**
   - 只放後端環境變數
   - 不進版控

2. **驗證所有回調**
   - 綠界 Webhook 要驗證 CheckMacValue
   - 避免假造付款通知

3. **HTTPS 必備**
   - Vercel 自動提供 SSL

4. **訂單狀態檢查**
   - 前端顯示願望前，確認訂單狀態是 paid

---

## 下一步行動

1. [ ] 註冊綠界帳號，申請測試商店
2. [ ] 註冊 Supabase，建立專案
3. [ ] 建立 wish-pool-api repo
4. [ ] 開始寫後端 API

---

*文檔版本：v1.0*
*最後更新：2024/01*
