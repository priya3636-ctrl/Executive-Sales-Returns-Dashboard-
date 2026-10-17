# Executive Sales & Returns Analytics

> A modern, interactive web analytics platform based on a **Microsoft Power BI Retail Sales & Returns Dashboard**. Built for executive decision-making, portfolio presentation, GitHub, and LinkedIn.

---

## 📌 Project Overview

This project converts an enterprise-grade desktop **Microsoft Power BI Retail Sales & Returns Report** into a responsive, high-performance web application. 

While traditional Power BI reports require expensive per-user licensing, proprietary software viewers, or slow iframe embeds, this web application implements the exact business intelligence logic directly in **TypeScript**, visualizes trends using **Recharts**, and isolates data loading behind a modular **Data Adapter Architecture**.

### 💼 Portfolio Highlights & Business Context
- **Industry Vertical:** Omnichannel Retail (eCommerce & Brick-and-Mortar)
- **Primary Objective:** Provide C-suite and retail operations leaders with real-time visibility into gross sales momentum, geographical territory concentration, and root-cause return friction.
- **DAX-to-TypeScript Equivalence:** Direct algorithmic mapping of Power BI measures (`SUMX`, `DISTINCTCOUNT`, `DIVIDE`, and multi-table filter context).
- **Zero Confidential Leakage:** Shipped with a mathematically sound synthetic demonstration dataset adhering to realistic retail distributions.

---

## 🚀 Key Features

### 1. Executive KPI Strip
- **Total Gross Sales:** Realized and gross top-line revenue tracking with prior period comparative growth.
- **Distinct Total Orders:** Accurate order frequency count avoiding line-item duplication.
- **Return Rate (%):** Standardized order-basis return metric (`[Returned Orders] / [Total Orders] * 100`).
- **Average Order Value (AOV):** Mean transaction basket size (`[Total Sales] / [Total Orders]`).
- **Interactive DAX Tooltips:** Click the info icon on any KPI card to inspect its exact underlying DAX formula and mathematical definition.

### 2. Multi-Dimensional Interactive Visuals
- **Monthly Sales Trend:** Interactive line & area chart displaying revenue momentum, target comparisons, and monthly return rates.
- **Sales by State:** Horizontal ranked bar chart highlighting geographical sales concentration and state-level return rates.
- **Category Performance:** Comparative bar chart contrasting gross sales against refunded revenue across 5 retail departments.
- **Top 10 Products by Sales:** Ranked SKU leaderboard with pricing, unit volume, and return risk indicators.
- **Returns by Reason:** Donut chart classifying customer return root causes (Defective/Damaged, Sizing & Fit, Wrong Item, etc.).
- **Sales by Channel:** Direct side-by-side comparison of **Online** vs **Store** revenue share, AOV, and return rate variance.

### 3. Cross-Filtering & State Synchronization
- Filter dynamically across **Timeframe** (Full Year 2024, Q1–Q4, H1/H2), **State/Territory**, **Product Department**, **Sales Channel**, and **Search Query**.
- Selecting an individual state, category, or channel directly in any chart applies that slice globally across all KPI calculations and sibling visuals.
- Dedicated **Reset Filters** button with indicator count.

### 4. Enterprise Architecture & Data Adapter Layer
- **`IDataSourceAdapter` Contract:** Fully decoupled data layer located in `src/data/adapter.ts`.
- **Custom CSV Upload:** Ingest custom Power BI or Excel export CSVs directly in the browser sandbox.
- **Data Export:** Export active filtered summaries to clean CSV with a single click.

---

## 📐 Business Metric & DAX Definitions

| Metric | Business Definition | Power BI DAX Formulation | TypeScript Engine Implementation |
| :--- | :--- | :--- | :--- |
| **Total Sales** | Gross revenue before returns | `SUMX(Sales, Sales[Qty] * Sales[Price] * (1 - Sales[Discount]))` | `records.reduce((acc, r) => acc + r.salesAmount, 0)` |
| **Total Orders** | Distinct customer purchases | `DISTINCTCOUNT(Sales[OrderID])` | `new Set(records.map(r => r.orderId)).size` |
| **Return Rate** | % of orders resulting in a return | `DIVIDE(CALCULATE(DISTINCTCOUNT(Sales[OrderID]), Sales[IsReturned] = TRUE), DISTINCTCOUNT(Sales[OrderID]), 0) * 100` | `(returnedOrdersCount / totalOrders) * 100` |
| **AOV** | Average revenue per order | `DIVIDE([Total Sales], [Total Orders], 0)` | `totalSales / totalOrders` |
| **Net Sales** | Gross sales minus return value | `[Total Sales] - SUM(Sales[ReturnAmount])` | `totalSales - totalReturnAmount` |

> **Return Rate Definition Note:** In this dashboard model, Return Rate is measured on an **Order-Level Basis** (`Returned Orders / Total Orders`). A secondary operational metric, **Unit Return Rate** (`Returned Units / Total Units`), is also provided in the Returns Analysis view for warehouse restocking analysis.

---

## 🛠️ Tech Stack

- **Frontend Framework:** React 19 with TypeScript
- **Styling & Design System:** Tailwind CSS v4 (Executive dark navy slate `#0F172A`, primary blue `#2563EB`, return crimson `#EF4444`)
- **Data Visualization:** Recharts (SVG-based responsive charts)
- **Icons:** Lucide React
- **Build Tool:** Vite

---

## 💻 Local Setup & Development

### Prerequisites
- Node.js (version 18.x or 20.x recommended)
- npm or pnpm

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/executive-sales-returns-analytics.git
cd executive-sales-returns-analytics
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
The application will launch on `http://localhost:3000`.

### 4. Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

---

## 🌐 Deployment Instructions

This application is built as a static Single Page Application (SPA) and can be deployed with zero backend configuration to any modern hosting platform:

### Deploy to Vercel
1. Push your repository to GitHub.
2. Log into [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your repository.
4. Set Build Command: `npm run build` and Output Directory: `dist`.
5. Click **Deploy**.

### Deploy to Netlify
1. Connect your GitHub repository to [Netlify](https://www.netlify.com).
2. Set Build Command: `npm run build` and Publish Directory: `dist`.
3. Add a `_redirects` file with `/*  /index.html  200` to support client-side routing.
4. Click **Deploy Site**.

### Deploy to GitHub Pages
1. Install `gh-pages`: `npm install -D gh-pages`.
2. Add `"deploy": "gh-pages -d dist"` to `scripts` in `package.json`.
3. Run `npm run build && npm run deploy`.

---

## 🔒 Data Privacy & Synthetic Data Notice

- **Synthetic Demo Data:** The default dataset is programmatically generated via a deterministic pseudo-random model (`src/data/mockData.ts`) reflecting realistic retail distributions.
- **Confidentiality:** No real enterprise, customer, or confidential data from the author's internal Power BI datasets is embedded or uploaded.
- **Plugging in Real Data:** To connect your own verified dataset:
  1. Open the web app and click **Data & DAX Specs** > **Connect Custom Dataset**.
  2. Paste your CSV export from Power BI or Excel.
  3. Or implement the `IDataSourceAdapter` interface in `src/data/adapter.ts` to call your secure REST API endpoint.

---

## 👨‍💻 Author & Acknowledgements

Created as a Business Intelligence & Full-Stack Engineering project demonstrating the bridge between Microsoft Power BI dashboard design and modern web development.

- **LinkedIn:** [Connect on LinkedIn](https://www.linkedin.com)
- **GitHub:** [Follow on GitHub](https://github.com)
