import {
  TransactionRecord,
  FilterState,
  KPISummary,
  MonthlyTrend,
  StateSales,
  CategorySales,
  TopProduct,
  ReturnReasonDistribution,
  ChannelComparison,
  SalesChannel,
  ProductCategory,
  ReturnReason
} from './types';
import { SYNTHETIC_DATASET } from './mockData';

/**
 * Interface representing the Data Adapter layer.
 * Any custom enterprise data source (REST API, Cloud SQL, Power BI REST endpoint,
 * or user-provided CSV upload) can implement this contract.
 */
export interface IDataSourceAdapter {
  id: string;
  name: string;
  isSynthetic: boolean;
  loadRecords(): Promise<TransactionRecord[]>;
  applyFilters(records: TransactionRecord[], filters: FilterState): TransactionRecord[];
  calculateKPIs(records: TransactionRecord[]): KPISummary;
  getMonthlyTrend(records: TransactionRecord[]): MonthlyTrend[];
  getSalesByState(records: TransactionRecord[], limit?: number): StateSales[];
  getSalesByCategory(records: TransactionRecord[]): CategorySales[];
  getTopProducts(records: TransactionRecord[], limit?: number): TopProduct[];
  getReturnsByReason(records: TransactionRecord[]): ReturnReasonDistribution[];
  getSalesByChannel(records: TransactionRecord[]): ChannelComparison[];
  exportSummaryCsv(records: TransactionRecord[]): string;
}

/**
 * Standard Implementation: Synthetic Demonstration Data Adapter
 * Provides mathematically sound aggregations directly mirroring Microsoft Power BI DAX patterns.
 */
export class SyntheticDemoDataAdapter implements IDataSourceAdapter {
  public readonly id = 'synthetic-demo';
  public readonly name = 'Synthetic Demo Adapter (Retail Power BI Template)';
  public readonly isSynthetic = true;

  private recordsCache: TransactionRecord[] = [...SYNTHETIC_DATASET];

  public async loadRecords(): Promise<TransactionRecord[]> {
    // Mimic micro-delay for realistic async data fetch
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.recordsCache]);
      }, 60);
    });
  }

  public setCustomRecords(newRecords: TransactionRecord[]) {
    this.recordsCache = [...newRecords];
  }

  /**
   * Applies multidimensional filters across dates, state, category, channel, and query.
   */
  public applyFilters(records: TransactionRecord[], filters: FilterState): TransactionRecord[] {
    return records.filter((r) => {
      // Date filter
      if (filters.datePreset !== 'all') {
        if (filters.datePreset === 'Q1' && r.quarter !== 'Q1') return false;
        if (filters.datePreset === 'Q2' && r.quarter !== 'Q2') return false;
        if (filters.datePreset === 'Q3' && r.quarter !== 'Q3') return false;
        if (filters.datePreset === 'Q4' && r.quarter !== 'Q4') return false;
        if (filters.datePreset === 'H1' && (r.quarter !== 'Q1' && r.quarter !== 'Q2')) return false;
        if (filters.datePreset === 'H2' && (r.quarter !== 'Q3' && r.quarter !== 'Q4')) return false;
      }

      if (filters.startDate && r.date < filters.startDate) return false;
      if (filters.endDate && r.date > filters.endDate) return false;

      // State filter
      if (filters.state !== 'All' && r.state !== filters.state) return false;

      // Category filter
      if (filters.category !== 'All' && r.category !== filters.category) return false;

      // Channel filter
      if (filters.channel !== 'All' && r.channel !== filters.channel) return false;

      // Search Query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase().trim();
        const matchesProduct = r.productName.toLowerCase().includes(query);
        const matchesSku = r.productSku.toLowerCase().includes(query);
        const matchesOrder = r.orderId.toLowerCase().includes(query);
        const matchesCustomer = r.customerId.toLowerCase().includes(query);
        if (!matchesProduct && !matchesSku && !matchesOrder && !matchesCustomer) {
          return false;
        }
      }

      return true;
    });
  }

  /**
   * Calculates consistent Power BI-equivalent Executive KPIs:
   * 1. Total Sales = SUM(Sales[SalesAmount])
   * 2. Total Orders = DISTINCTCOUNT(Sales[OrderID])
   * 3. Return Rate (%) = (DISTINCTCOUNT(Returned OrderIDs) / DISTINCTCOUNT(Total OrderIDs)) * 100
   * 4. Average Order Value (AOV) = Total Sales / Distinct Total Orders
   */
  public calculateKPIs(records: TransactionRecord[]): KPISummary {
    if (records.length === 0) {
      return {
        totalSales: 0,
        totalOrders: 0,
        totalUnitsSold: 0,
        averageOrderValue: 0,
        returnedOrdersCount: 0,
        totalReturnUnits: 0,
        totalReturnAmount: 0,
        returnRate: 0,
        unitReturnRate: 0,
        netSales: 0,
        totalProfit: 0,
        profitMargin: 0,
        priorPeriodGrowth: {
          salesGrowthPct: 0,
          ordersGrowthPct: 0,
          returnRateDelta: 0,
          aovGrowthPct: 0
        }
      };
    }

    let totalSales = 0;
    let totalUnitsSold = 0;
    let totalReturnUnits = 0;
    let totalReturnAmount = 0;
    let totalProfit = 0;

    const allOrderIds = new Set<string>();
    const returnedOrderIds = new Set<string>();

    for (const r of records) {
      totalSales += r.salesAmount;
      totalUnitsSold += r.quantity;
      totalProfit += r.profitAmount;
      allOrderIds.add(r.orderId);

      if (r.isReturned) {
        returnedOrderIds.add(r.orderId);
        totalReturnUnits += r.returnQuantity;
        totalReturnAmount += r.returnAmount;
      }
    }

    const totalOrders = allOrderIds.size;
    const returnedOrdersCount = returnedOrderIds.size;
    const returnRate = totalOrders > 0 ? (returnedOrdersCount / totalOrders) * 100 : 0;
    const unitReturnRate = totalUnitsSold > 0 ? (totalReturnUnits / totalUnitsSold) * 100 : 0;
    const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;
    const netSales = totalSales - totalReturnAmount;
    const profitMargin = totalSales > 0 ? (totalProfit / totalSales) * 100 : 0;

    // Benchmark comparison (simulated prior period comparison for executive context)
    // Positive sales growth +8.4%, orders +6.2%, return rate -0.8% improvement
    return {
      totalSales: Math.round(totalSales * 100) / 100,
      totalOrders,
      totalUnitsSold,
      averageOrderValue: Math.round(averageOrderValue * 100) / 100,
      returnedOrdersCount,
      totalReturnUnits,
      totalReturnAmount: Math.round(totalReturnAmount * 100) / 100,
      returnRate: Math.round(returnRate * 10) / 10,
      unitReturnRate: Math.round(unitReturnRate * 10) / 10,
      netSales: Math.round(netSales * 100) / 100,
      totalProfit: Math.round(totalProfit * 100) / 100,
      profitMargin: Math.round(profitMargin * 10) / 10,
      priorPeriodGrowth: {
        salesGrowthPct: 8.4,
        ordersGrowthPct: 6.2,
        returnRateDelta: -0.9,
        aovGrowthPct: 2.1
      }
    };
  }

  /**
   * Monthly Sales Trend with Sales, Returns, Net Sales, and Target Sales.
   */
  public getMonthlyTrend(records: TransactionRecord[]): MonthlyTrend[] {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Group by month
    const monthMap = new Map<number, {
      sales: number;
      returnAmount: number;
      orderIds: Set<string>;
      returnedOrderIds: Set<string>;
    }>();

    for (let m = 1; m <= 12; m++) {
      monthMap.set(m, {
        sales: 0,
        returnAmount: 0,
        orderIds: new Set(),
        returnedOrderIds: new Set()
      });
    }

    for (const r of records) {
      const entry = monthMap.get(r.month);
      if (entry) {
        entry.sales += r.salesAmount;
        entry.orderIds.add(r.orderId);
        if (r.isReturned) {
          entry.returnAmount += r.returnAmount;
          entry.returnedOrderIds.add(r.orderId);
        }
      }
    }

    // Convert to trend array with dynamic target
    return Array.from(monthMap.entries()).map(([monthNum, data]) => {
      const monthIdx = monthNum - 1;
      const monthName = months[monthIdx];
      const orders = data.orderIds.size;
      const returnedOrders = data.returnedOrderIds.size;
      const returnRate = orders > 0 ? (returnedOrders / orders) * 100 : 0;
      const netSales = Math.max(0, data.sales - data.returnAmount);
      
      // Target is estimated at ~92% of expected seasonal plan
      const targetSales = Math.round(data.sales * 0.94);

      return {
        monthKey: `2024-${monthNum < 10 ? '0' + monthNum : monthNum}`,
        monthName,
        fullMonth: `${monthName} 2024`,
        sales: Math.round(data.sales),
        netSales: Math.round(netSales),
        orders,
        returnAmount: Math.round(data.returnAmount),
        returnedOrders,
        returnRate: Math.round(returnRate * 10) / 10,
        targetSales
      };
    });
  }

  /**
   * Sales by State sorted descending by gross revenue.
   */
  public getSalesByState(records: TransactionRecord[], limit = 10): StateSales[] {
    const stateMap = new Map<string, {
      region: string;
      sales: number;
      orderIds: Set<string>;
      returnedOrderIds: Set<string>;
      returnAmount: number;
    }>();

    let totalGlobalSales = 0;

    for (const r of records) {
      totalGlobalSales += r.salesAmount;
      if (!stateMap.has(r.state)) {
        stateMap.set(r.state, {
          region: r.region,
          sales: 0,
          orderIds: new Set(),
          returnedOrderIds: new Set(),
          returnAmount: 0
        });
      }
      const st = stateMap.get(r.state)!;
      st.sales += r.salesAmount;
      st.orderIds.add(r.orderId);
      if (r.isReturned) {
        st.returnedOrderIds.add(r.orderId);
        st.returnAmount += r.returnAmount;
      }
    }

    const stateList: StateSales[] = Array.from(stateMap.entries()).map(([state, data]) => {
      const orders = data.orderIds.size;
      const returnedOrders = data.returnedOrderIds.size;
      const returnRate = orders > 0 ? (returnedOrders / orders) * 100 : 0;
      const salesSharePct = totalGlobalSales > 0 ? (data.sales / totalGlobalSales) * 100 : 0;

      return {
        state,
        region: data.region,
        sales: Math.round(data.sales),
        orders,
        returnAmount: Math.round(data.returnAmount),
        returnRate: Math.round(returnRate * 10) / 10,
        salesSharePct: Math.round(salesSharePct * 10) / 10
      };
    });

    stateList.sort((a, b) => b.sales - a.sales);
    return limit ? stateList.slice(0, limit) : stateList;
  }

  /**
   * Sales by Product Category comparison chart.
   */
  public getSalesByCategory(records: TransactionRecord[]): CategorySales[] {
    const catMap = new Map<ProductCategory, {
      sales: number;
      orderIds: Set<string>;
      unitsSold: number;
      returnAmount: number;
      returnCount: number;
      profit: number;
    }>();

    for (const r of records) {
      if (!catMap.has(r.category)) {
        catMap.set(r.category, {
          sales: 0,
          orderIds: new Set(),
          unitsSold: 0,
          returnAmount: 0,
          returnCount: 0,
          profit: 0
        });
      }
      const c = catMap.get(r.category)!;
      c.sales += r.salesAmount;
      c.orderIds.add(r.orderId);
      c.unitsSold += r.quantity;
      c.profit += r.profitAmount;
      if (r.isReturned) {
        c.returnAmount += r.returnAmount;
        c.returnCount += 1;
      }
    }

    const categories: ProductCategory[] = [
      'Electronics',
      'Apparel & Footwear',
      'Home & Kitchen',
      'Sports & Outdoors',
      'Beauty & Personal Care'
    ];

    return categories.map((cat) => {
      const data = catMap.get(cat) || {
        sales: 0,
        orderIds: new Set<string>(),
        unitsSold: 0,
        returnAmount: 0,
        returnCount: 0,
        profit: 0
      };

      const orders = data.orderIds.size;
      const returnRate = orders > 0 ? (data.returnCount / orders) * 100 : 0;
      const profitMargin = data.sales > 0 ? (data.profit / data.sales) * 100 : 0;

      return {
        category: cat,
        sales: Math.round(data.sales),
        orders,
        unitsSold: data.unitsSold,
        returnAmount: Math.round(data.returnAmount),
        returnCount: data.returnCount,
        returnRate: Math.round(returnRate * 10) / 10,
        profit: Math.round(data.profit),
        profitMargin: Math.round(profitMargin * 10) / 10
      };
    });
  }

  /**
   * Top Products ranked by Gross Sales.
   */
  public getTopProducts(records: TransactionRecord[], limit = 10): TopProduct[] {
    const prodMap = new Map<string, {
      name: string;
      category: ProductCategory;
      unitPrice: number;
      unitsSold: number;
      sales: number;
      returnCount: number;
    }>();

    for (const r of records) {
      if (!prodMap.has(r.productSku)) {
        prodMap.set(r.productSku, {
          name: r.productName,
          category: r.category,
          unitPrice: r.unitPrice,
          unitsSold: 0,
          sales: 0,
          returnCount: 0
        });
      }
      const p = prodMap.get(r.productSku)!;
      p.unitsSold += r.quantity;
      p.sales += r.salesAmount;
      if (r.isReturned) {
        p.returnCount += 1;
      }
    }

    const productList: TopProduct[] = Array.from(prodMap.entries()).map(([sku, data]) => {
      const returnRate = data.unitsSold > 0 ? (data.returnCount / data.unitsSold) * 100 : 0;
      return {
        sku,
        name: data.name,
        category: data.category,
        unitPrice: data.unitPrice,
        unitsSold: data.unitsSold,
        sales: Math.round(data.sales),
        returnCount: data.returnCount,
        returnRate: Math.round(returnRate * 10) / 10
      };
    });

    productList.sort((a, b) => b.sales - a.sales);
    return productList.slice(0, limit);
  }

  /**
   * Returns by Reason for Donut Chart.
   */
  public getReturnsByReason(records: TransactionRecord[]): ReturnReasonDistribution[] {
    const reasonMap = new Map<ReturnReason, { count: number; amount: number }>();
    const reasons: ReturnReason[] = [
      'Defective / Damaged Item',
      'Sizing & Fit Issue',
      'Wrong Item Shipped',
      'Item Not as Described',
      'Arrived Too Late',
      'Changed Mind / Buyer Remorse'
    ];

    for (const r of reasons) {
      reasonMap.set(r, { count: 0, amount: 0 });
    }

    let totalReturnedOrders = 0;

    for (const r of records) {
      if (r.isReturned && r.returnReason) {
        totalReturnedOrders++;
        const curr = reasonMap.get(r.returnReason);
        if (curr) {
          curr.count += 1;
          curr.amount += r.returnAmount;
        }
      }
    }

    return reasons
      .map((reason) => {
        const item = reasonMap.get(reason)!;
        const percentage = totalReturnedOrders > 0 ? (item.count / totalReturnedOrders) * 100 : 0;
        return {
          reason,
          count: item.count,
          percentage: Math.round(percentage * 10) / 10,
          amount: Math.round(item.amount)
        };
      })
      .sort((a, b) => b.count - a.count);
  }

  /**
   * Sales by Channel (Online vs Store).
   */
  public getSalesByChannel(records: TransactionRecord[]): ChannelComparison[] {
    const channelMap = new Map<SalesChannel, {
      sales: number;
      orderIds: Set<string>;
      returnedOrderIds: Set<string>;
      returnAmount: number;
    }>();

    channelMap.set('Online', { sales: 0, orderIds: new Set(), returnedOrderIds: new Set(), returnAmount: 0 });
    channelMap.set('Store', { sales: 0, orderIds: new Set(), returnedOrderIds: new Set(), returnAmount: 0 });

    let totalSales = 0;

    for (const r of records) {
      totalSales += r.salesAmount;
      const c = channelMap.get(r.channel)!;
      c.sales += r.salesAmount;
      c.orderIds.add(r.orderId);
      if (r.isReturned) {
        c.returnedOrderIds.add(r.orderId);
        c.returnAmount += r.returnAmount;
      }
    }

    const channels: SalesChannel[] = ['Online', 'Store'];
    return channels.map((channel) => {
      const data = channelMap.get(channel)!;
      const orders = data.orderIds.size;
      const returnedOrders = data.returnedOrderIds.size;
      const salesSharePct = totalSales > 0 ? (data.sales / totalSales) * 100 : 0;
      const aov = orders > 0 ? data.sales / orders : 0;
      const returnRate = orders > 0 ? (returnedOrders / orders) * 100 : 0;

      return {
        channel,
        sales: Math.round(data.sales),
        orders,
        salesSharePct: Math.round(salesSharePct * 10) / 10,
        aov: Math.round(aov * 100) / 100,
        returnCount: returnedOrders,
        returnRate: Math.round(returnRate * 10) / 10,
        returnAmount: Math.round(data.returnAmount)
      };
    });
  }

  /**
   * Generates a clean CSV string of the filtered dataset for user export.
   */
  public exportSummaryCsv(records: TransactionRecord[]): string {
    const headers = [
      'TransactionID',
      'OrderID',
      'Date',
      'Quarter',
      'CustomerSegment',
      'State',
      'Region',
      'Channel',
      'Category',
      'SubCategory',
      'ProductSKU',
      'ProductName',
      'UnitPrice',
      'Quantity',
      'Discount',
      'SalesAmount',
      'IsReturned',
      'ReturnReason',
      'ReturnAmount'
    ];

    const rows = records.map((r) => [
      r.id,
      r.orderId,
      r.date,
      r.quarter,
      r.customerSegment,
      `"${r.state}"`,
      r.region,
      r.channel,
      `"${r.category}"`,
      `"${r.subCategory}"`,
      r.productSku,
      `"${r.productName.replace(/"/g, '""')}"`,
      r.unitPrice.toFixed(2),
      r.quantity,
      r.discount.toFixed(2),
      r.salesAmount.toFixed(2),
      r.isReturned ? 'TRUE' : 'FALSE',
      r.returnReason ? `"${r.returnReason}"` : '',
      r.returnAmount.toFixed(2)
    ]);

    return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
  }
}

// Singleton adapter instance
export const defaultDataAdapter = new SyntheticDemoDataAdapter();
