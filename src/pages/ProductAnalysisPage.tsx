import React, { useState } from 'react';
import { TopProduct, CategorySales, FilterState } from '../data/types';
import { FilterBar } from '../components/filters/FilterBar';
import { TopProductsChart } from '../components/charts/TopProductsChart';
import { CategoryComparisonChart } from '../components/charts/CategoryPerformanceChart';
import { formatCurrency, formatPercent, formatNumber } from '../utils/formatters';
import { Package, ArrowUpDown, Tag, DollarSign, AlertTriangle } from 'lucide-react';

interface ProductAnalysisPageProps {
  topProducts: TopProduct[];
  salesByCategory: CategorySales[];
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onResetFilters: () => void;
  availableStates: string[];
  totalRecordsCount: number;
  filteredRecordsCount: number;
}

export const ProductAnalysisPage: React.FC<ProductAnalysisPageProps> = ({
  topProducts,
  salesByCategory,
  filters,
  onFilterChange,
  onResetFilters,
  availableStates,
  totalRecordsCount,
  filteredRecordsCount
}) => {
  const [sortField, setSortField] = useState<'sales' | 'unitsSold' | 'unitPrice' | 'returnRate'>('sales');
  const [sortAsc, setSortAsc] = useState(false);

  const sortedProducts = [...topProducts].sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];
    return sortAsc ? valA - valB : valB - valA;
  });

  const toggleSort = (field: 'sales' | 'unitsSold' | 'unitPrice' | 'returnRate') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

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

      {/* Category Performance Matrix Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {salesByCategory.map((cat) => (
          <div
            key={cat.category}
            onClick={() => onFilterChange({ ...filters, category: cat.category })}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              filters.category === cat.category
                ? 'border-blue-500 bg-blue-50/50 shadow-xs ring-1 ring-blue-500'
                : 'border-slate-200 hover:border-blue-300 bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-slate-800 truncate" title={cat.category}>
                {cat.category}
              </span>
              <Tag className="w-3 h-3 text-slate-400 shrink-0" />
            </div>
            <div className="text-lg font-bold text-slate-900 font-mono tabular-nums">
              {formatCurrency(cat.sales)}
            </div>
            <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Return Rate:</span>
              <span
                className={`font-semibold font-mono tabular-nums ${
                  cat.returnRate > 20 ? 'text-rose-600' : 'text-slate-700'
                }`}
              >
                {formatPercent(cat.returnRate)}
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
              <span>Profit Margin:</span>
              <span className="font-medium text-emerald-600 font-mono tabular-nums">
                {formatPercent(cat.profitMargin)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <TopProductsChart data={topProducts} />
        </div>
        <div className="lg:col-span-6">
          <CategoryComparisonChart
            data={salesByCategory}
            selectedCategory={filters.category}
            onSelectCategory={(category) => onFilterChange({ ...filters, category })}
          />
        </div>
      </div>

      {/* Top Products Detailed Leaderboard Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 tracking-tight">
              Product Catalog Performance & Return Risk Matrix
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Ranked analysis of sales revenue, unit volume, retail pricing, and return vulnerability
            </p>
          </div>
        </div>

        <div className="border border-slate-200 rounded-xl overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <th className="py-2.5 px-3">Rank</th>
                <th className="py-2.5 px-3">SKU</th>
                <th className="py-2.5 px-3">Product Name</th>
                <th className="py-2.5 px-3">Category</th>
                <th
                  className="py-2.5 px-3 text-right cursor-pointer hover:bg-slate-200/60"
                  onClick={() => toggleSort('unitPrice')}
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Unit Price</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  className="py-2.5 px-3 text-right cursor-pointer hover:bg-slate-200/60"
                  onClick={() => toggleSort('unitsSold')}
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Units Sold</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  className="py-2.5 px-3 text-right cursor-pointer hover:bg-slate-200/60"
                  onClick={() => toggleSort('sales')}
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Gross Sales</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  className="py-2.5 px-3 text-right cursor-pointer hover:bg-slate-200/60"
                  onClick={() => toggleSort('returnRate')}
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Return Rate</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedProducts.map((p, idx) => (
                <tr key={p.sku} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-medium text-slate-500">{idx + 1}</td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-slate-600">{p.sku}</td>
                  <td className="py-2.5 px-3 font-medium text-slate-900">{p.name}</td>
                  <td className="py-2.5 px-3 text-slate-600">{p.category}</td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-700 tabular-nums">
                    {formatCurrency(p.unitPrice)}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-700 tabular-nums">
                    {formatNumber(p.unitsSold)}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-semibold text-slate-900 tabular-nums">
                    {formatCurrency(p.sales)}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono tabular-nums">
                    <span
                      className={`font-semibold ${
                        p.returnRate > 20
                          ? 'text-rose-600 font-bold'
                          : p.returnRate > 12
                          ? 'text-amber-600'
                          : 'text-slate-700'
                      }`}
                    >
                      {formatPercent(p.returnRate)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
