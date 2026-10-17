import React from 'react';
import {
  KPISummary,
  MonthlyTrend,
  StateSales,
  CategorySales,
  TopProduct,
  ReturnReasonDistribution,
  ChannelComparison,
  FilterState
} from '../data/types';
import { KPICard } from '../components/common/KPICard';
import { FilterBar } from '../components/filters/FilterBar';
import { MonthlySalesTrendChart } from '../components/charts/MonthlyTrendChart';
import { SalesByStateChart } from '../components/charts/SalesByStateChart';
import { CategoryComparisonChart } from '../components/charts/CategoryPerformanceChart';
import { TopProductsChart } from '../components/charts/TopProductsChart';
import { ReturnsByReasonChart } from '../components/charts/ReturnsByReasonChart';
import { SalesByChannelChart } from '../components/charts/ChannelComparisonChart';
import { EmptyStateView } from '../components/common/StateViews';
import { formatCurrency, formatNumber, formatPercent } from '../utils/formatters';

interface DashboardOverviewProps {
  kpis: KPISummary;
  monthlyTrend: MonthlyTrend[];
  salesByState: StateSales[];
  salesByCategory: CategorySales[];
  topProducts: TopProduct[];
  returnsByReason: ReturnReasonDistribution[];
  salesByChannel: ChannelComparison[];
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onResetFilters: () => void;
  availableStates: string[];
  totalRecordsCount: number;
  filteredRecordsCount: number;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  kpis,
  monthlyTrend,
  salesByState,
  salesByCategory,
  topProducts,
  returnsByReason,
  salesByChannel,
  filters,
  onFilterChange,
  onResetFilters,
  availableStates,
  totalRecordsCount,
  filteredRecordsCount
}) => {
  if (filteredRecordsCount === 0) {
    return (
      <div className="space-y-6">
        <FilterBar
          filters={filters}
          onFilterChange={onFilterChange}
          onReset={onResetFilters}
          availableStates={availableStates}
          totalRecordsCount={totalRecordsCount}
          filteredRecordsCount={filteredRecordsCount}
        />
        <EmptyStateView onResetFilters={onResetFilters} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 1. Top Filters Bar */}
      <FilterBar
        filters={filters}
        onFilterChange={onFilterChange}
        onReset={onResetFilters}
        availableStates={availableStates}
        totalRecordsCount={totalRecordsCount}
        filteredRecordsCount={filteredRecordsCount}
      />

      {/* 2. Executive 4-KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Sales */}
        <KPICard
          id="totalSales"
          title="Total Gross Sales"
          value={formatCurrency(kpis.totalSales)}
          subtitle={`Net Sales: ${formatCurrency(kpis.netSales)}`}
          trend={{
            value: `+${kpis.priorPeriodGrowth.salesGrowthPct}%`,
            isUp: true,
            isPositiveGood: true,
            text: 'Growth vs previous comparative cycle'
          }}
          accentColor="blue"
        />

        {/* Total Orders */}
        <KPICard
          id="totalOrders"
          title="Distinct Total Orders"
          value={formatNumber(kpis.totalOrders)}
          subtitle={`${formatNumber(kpis.totalUnitsSold)} total units fulfilled`}
          trend={{
            value: `+${kpis.priorPeriodGrowth.ordersGrowthPct}%`,
            isUp: true,
            isPositiveGood: true,
            text: 'Transaction frequency growth'
          }}
          accentColor="indigo"
        />

        {/* Return Rate */}
        <KPICard
          id="returnRate"
          title="Return Rate (%)"
          value={formatPercent(kpis.returnRate)}
          subtitle={`${kpis.returnedOrdersCount} returned orders`}
          trend={{
            value: `${kpis.priorPeriodGrowth.returnRateDelta}%`,
            isUp: false,
            isPositiveGood: true,
            text: 'Return rate contraction (favorable quality trend)'
          }}
          accentColor="rose"
        />

        {/* Average Order Value */}
        <KPICard
          id="averageOrderValue"
          title="Average Order Value"
          value={formatCurrency(kpis.averageOrderValue)}
          subtitle={`Profit Margin: ${formatPercent(kpis.profitMargin)}`}
          trend={{
            value: `+${kpis.priorPeriodGrowth.aovGrowthPct}%`,
            isUp: true,
            isPositiveGood: true,
            text: 'Basket expansion vs prior period'
          }}
          accentColor="emerald"
        />
      </div>

      {/* 3. Primary Charts Grid: Row 1 (Monthly Trend & State Breakdown) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <MonthlySalesTrendChart data={monthlyTrend} />
        </div>
        <div className="lg:col-span-5">
          <SalesByStateChart
            data={salesByState}
            selectedState={filters.state}
            onSelectState={(state) => onFilterChange({ ...filters, state })}
          />
        </div>
      </div>

      {/* 4. Primary Charts Grid: Row 2 (Category Comparison & Top 10 Products) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <CategoryComparisonChart
            data={salesByCategory}
            selectedCategory={filters.category}
            onSelectCategory={(category) => onFilterChange({ ...filters, category })}
          />
        </div>
        <div className="lg:col-span-6">
          <TopProductsChart data={topProducts} />
        </div>
      </div>

      {/* 5. Primary Charts Grid: Row 3 (Returns by Reason & Sales by Channel) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <ReturnsByReasonChart data={returnsByReason} />
        </div>
        <div className="lg:col-span-6">
          <SalesByChannelChart
            data={salesByChannel}
            selectedChannel={filters.channel}
            onSelectChannel={(channel) => onFilterChange({ ...filters, channel })}
          />
        </div>
      </div>
    </div>
  );
};
