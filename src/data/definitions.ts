export interface MetricDefinition {
  name: string;
  shortCode: string;
  description: string;
  formulaDescription: string;
  daxFormula: string;
  typescriptImplementation: string;
  industryBenchmark?: string;
  interpretation: string;
}

export const METRIC_DEFINITIONS: Record<string, MetricDefinition> = {
  totalSales: {
    name: 'Total Sales (Gross Revenue)',
    shortCode: 'Total Sales',
    description: 'The sum of all sales revenue across filtered transactions before returns and refunds.',
    formulaDescription: 'SUM( UnitPrice * Quantity * (1 - Discount) )',
    daxFormula: 'Total Sales = SUMX(Sales, Sales[Quantity] * Sales[UnitPrice] * (1 - Sales[Discount]))',
    typescriptImplementation: 'records.reduce((acc, row) => acc + row.salesAmount, 0)',
    interpretation: 'Measures overall top-line financial volume generated through online and retail store channels.'
  },
  totalOrders: {
    name: 'Total Orders',
    shortCode: 'Orders',
    description: 'The distinct count of unique Order IDs recorded within the active date and filter boundary.',
    formulaDescription: 'DISTINCTCOUNT( Order_ID )',
    daxFormula: 'Total Orders = DISTINCTCOUNT(Sales[OrderID])',
    typescriptImplementation: 'new Set(records.map(r => r.orderId)).size',
    interpretation: 'Quantifies transaction frequency and unique buying events rather than raw line items.'
  },
  returnRate: {
    name: 'Return Rate (Order Basis)',
    shortCode: 'Return Rate',
    description: 'The percentage of distinct orders that incurred a return or refund action.',
    formulaDescription: '(Distinct Returned Orders / Distinct Total Orders) * 100',
    daxFormula: `Return Rate = 
DIVIDE(
    CALCULATE(DISTINCTCOUNT(Sales[OrderID]), Sales[IsReturned] = TRUE),
    DISTINCTCOUNT(Sales[OrderID]),
    0
) * 100`,
    typescriptImplementation: `(returnedOrdersCount / totalOrders) * 100`,
    industryBenchmark: 'Typically 15% - 25% for omnichannel retail; online apparel averages 20-30%, electronics 8-12%.',
    interpretation: 'Primary risk and quality indicator. A sudden spike in Return Rate signals product quality, sizing mismatch, or shipping logistics friction.'
  },
  unitReturnRate: {
    name: 'Return Rate (Unit Basis)',
    shortCode: 'Unit Return %',
    description: 'The percentage of individual physical units sold that were returned by customers.',
    formulaDescription: '(Total Returned Units / Total Units Sold) * 100',
    daxFormula: 'Unit Return Rate = DIVIDE(SUM(Sales[ReturnQuantity]), SUM(Sales[Quantity]), 0) * 100',
    typescriptImplementation: '(totalReturnUnits / totalUnitsSold) * 100',
    interpretation: 'Secondary operational metric used by inventory and logistics managers to forecast restocking and refurbishment volume.'
  },
  averageOrderValue: {
    name: 'Average Order Value (AOV)',
    shortCode: 'AOV',
    description: 'The average gross revenue generated per distinct customer transaction.',
    formulaDescription: 'Total Sales / Distinct Total Orders',
    daxFormula: 'Average Order Value = DIVIDE([Total Sales], [Total Orders], 0)',
    typescriptImplementation: 'totalOrders > 0 ? totalSales / totalOrders : 0',
    industryBenchmark: 'Retail benchmark ranges from $80 to $220 depending on product catalog price points.',
    interpretation: 'Indicates customer basket size, bundling effectiveness, and checkout pricing health.'
  },
  netSales: {
    name: 'Net Sales',
    shortCode: 'Net Sales',
    description: 'Gross Sales minus total monetary value of refunded/returned items.',
    formulaDescription: 'Total Sales - Total Return Amount',
    daxFormula: 'Net Sales = [Total Sales] - SUM(Sales[ReturnAmount])',
    typescriptImplementation: 'totalSales - totalReturnAmount',
    interpretation: 'The true realized revenue retained by the retailer after all return concessions are processed.'
  }
};
