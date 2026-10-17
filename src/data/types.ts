export type SalesChannel = 'Online' | 'Store';

export type ProductCategory = 
  | 'Electronics'
  | 'Apparel & Footwear'
  | 'Home & Kitchen'
  | 'Sports & Outdoors'
  | 'Beauty & Personal Care';

export type ReturnReason =
  | 'Defective / Damaged Item'
  | 'Sizing & Fit Issue'
  | 'Wrong Item Shipped'
  | 'Item Not as Described'
  | 'Arrived Too Late'
  | 'Changed Mind / Buyer Remorse';

export interface TransactionRecord {
  id: string;
  orderId: string;
  date: string; // ISO format: YYYY-MM-DD
  year: number;
  month: number; // 1-12
  monthName: string; // 'Jan', 'Feb', etc.
  quarter: string; // 'Q1', 'Q2', 'Q3', 'Q4'
  customerId: string;
  customerSegment: 'Consumer' | 'Corporate' | 'Small Business';
  state: string;
  region: 'West' | 'East' | 'Central' | 'South';
  channel: SalesChannel;
  category: ProductCategory;
  subCategory: string;
  productSku: string;
  productName: string;
  unitPrice: number;
  quantity: number;
  discount: number; // 0.0 - 0.3
  salesAmount: number; // unitPrice * quantity * (1 - discount)
  costAmount: number;
  isReturned: boolean;
  returnReason: ReturnReason | null;
  returnQuantity: number;
  returnAmount: number;
  profitAmount: number;
}

export interface FilterState {
  datePreset: 'all' | '2024' | 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'H1' | 'H2';
  startDate: string;
  endDate: string;
  state: string;
  category: string;
  channel: 'All' | SalesChannel;
  searchQuery: string;
}

export interface KPISummary {
  totalSales: number;
  totalOrders: number;
  totalUnitsSold: number;
  averageOrderValue: number;
  returnedOrdersCount: number;
  totalReturnUnits: number;
  totalReturnAmount: number;
  returnRate: number; // Returned Orders / Total Orders * 100
  unitReturnRate: number; // Returned Units / Total Units * 100
  netSales: number; // totalSales - totalReturnAmount
  totalProfit: number;
  profitMargin: number; // totalProfit / totalSales * 100
  priorPeriodGrowth: {
    salesGrowthPct: number;
    ordersGrowthPct: number;
    returnRateDelta: number;
    aovGrowthPct: number;
  };
}

export interface MonthlyTrend {
  monthKey: string; // '2024-01'
  monthName: string; // 'Jan'
  fullMonth: string; // 'January 2024'
  sales: number;
  netSales: number;
  orders: number;
  returnAmount: number;
  returnedOrders: number;
  returnRate: number;
  targetSales: number;
}

export interface StateSales {
  state: string;
  region: string;
  sales: number;
  orders: number;
  returnAmount: number;
  returnRate: number;
  salesSharePct: number;
}

export interface CategorySales {
  category: ProductCategory;
  sales: number;
  orders: number;
  unitsSold: number;
  returnAmount: number;
  returnCount: number;
  returnRate: number;
  profit: number;
  profitMargin: number;
}

export interface TopProduct {
  sku: string;
  name: string;
  category: ProductCategory;
  unitPrice: number;
  unitsSold: number;
  sales: number;
  returnCount: number;
  returnRate: number;
}

export interface ReturnReasonDistribution {
  reason: ReturnReason;
  count: number;
  percentage: number;
  amount: number;
}

export interface ChannelComparison {
  channel: SalesChannel;
  sales: number;
  orders: number;
  salesSharePct: number;
  aov: number;
  returnCount: number;
  returnRate: number;
  returnAmount: number;
}
