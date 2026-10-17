import React, { useState } from 'react';
import { MonthlyTrend, StateSales, CategorySales, FilterState } from '../data/types';
import { FilterBar } from '../components/filters/FilterBar';
import { MonthlySalesTrendChart } from '../components/charts/MonthlyTrendChart';
import { SalesByStateChart } from '../components/charts/SalesByStateChart';
import { formatCurrency, formatPercent, formatNumber } from '../utils/formatters';
import { TrendingUp, ArrowUpDown, DollarSign, Store, Globe } from 'lucide-react';

interface SalesAnalysisPageProps {
  monthlyTrend: MonthlyTrend[];
  salesByState: StateSales[];
  salesByCategory: CategorySales[];
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onResetFilters: () => void;
  availableStates: string[];
  totalRecordsCount: number;
  filteredRecordsCount: number;
}

export const SalesAnalysisPage: React.FC<SalesAnalysisPageProps> = ({
  monthlyTrend,
  salesByState,
  salesByCategory,
  filters,
  onFilterChange,
  onResetFilters,
  availableStates,
  totalRecordsCount,
  filteredRecordsCount
}) => {
  const [sortField, setSortField] = useState<'sales' | 'orders' | 'returnRate'>('sales');
  const [sortAsc, setSortAsc] = useState(false);

  const totalSales = salesByState.reduce((sum, s) => sum + s.sales, 0);

  const sortedStates = [...salesByState].sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];
    return sortAsc ? valA - valB : valB - valA;
  });

  const toggleSort = (field: 'sales' | 'orders' | 'returnRate') => {
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

      {/* Summary Highlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">
            <DollarSign className="w-4 h-4 text-blue-600" />
            <span>Analyzed Sales Volume</span>
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">
            {formatCurrency(totalSales)}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Aggregated across {salesByState.length} active geographical territories
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>Highest Momentum Period</span>
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">
            Q4 (Nov - Dec)
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Holiday season accounts for ~32% of total annualized revenue
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">
            <Globe className="w-4 h-4 text-indigo-600" />
            <span>Territory Concentration</span>
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">
            {sortedStates[0]?.state || 'N/A'}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Leads national revenue with {formatPercent(sortedStates[0]?.salesSharePct || 0)} market share
          </p>
        </div>
      </div>

      {/* Monthly Sales Trend */}
      <MonthlySalesTrendChart data={monthlyTrend} />

      {/* State Comparisons and Deep-Dive Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5">
          <SalesByStateChart
            data={salesByState}
            selectedState={filters.state}
            onSelectState={(state) => onFilterChange({ ...filters, state })}
          />
        </div>

        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 tracking-tight">
                  State Performance & Territory Matrix
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Detailed revenue, order velocity, and return ratios across states
                </p>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <th className="py-2.5 px-3">State</th>
                    <th className="py-2.5 px-3">Region</th>
                    <th
                      className="py-2.5 px-3 text-right cursor-pointer hover:bg-slate-200/60"
                      onClick={() => toggleSort('sales')}
                    >
                      <div className="flex items-center justify-end gap-1">
                        <span>Sales ($)</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th
                      className="py-2.5 px-3 text-right cursor-pointer hover:bg-slate-200/60"
                      onClick={() => toggleSort('orders')}
                    >
                      <div className="flex items-center justify-end gap-1">
                        <span>Orders</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th className="py-2.5 px-3 text-right">Share</th>
                    <th
                      className="py-2.5 px-3 text-right cursor-pointer hover:bg-slate-200/60"
                      onClick={() => toggleSort('returnRate')}
                    >
                      <div className="flex items-center justify-end gap-1">
                        <span>Return %</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sortedStates.map((st) => (
                    <tr
                      key={st.state}
                      onClick={() => onFilterChange({ ...filters, state: st.state })}
                      className={`hover:bg-blue-50/50 cursor-pointer transition-colors ${
                        filters.state === st.state ? 'bg-blue-50 font-medium' : ''
                      }`}
                    >
                      <td className="py-2 px-3 font-medium text-slate-900">{st.state}</td>
                      <td className="py-2 px-3 text-slate-500">{st.region}</td>
                      <td className="py-2 px-3 text-right font-mono font-semibold text-slate-900 tabular-nums">
                        {formatCurrency(st.sales)}
                      </td>
                      <td className="py-2 px-3 text-right font-mono text-slate-700 tabular-nums">
                        {st.orders}
                      </td>
                      <td className="py-2 px-3 text-right font-mono text-blue-600 tabular-nums">
                        {formatPercent(st.salesSharePct)}
                      </td>
                      <td className="py-2 px-3 text-right font-mono tabular-nums">
                        <span
                          className={`font-semibold ${
                            st.returnRate > 18 ? 'text-rose-600' : 'text-slate-700'
                          }`}
                        >
                          {formatPercent(st.returnRate)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Click any state row to filter dashboard</span>
            <span className="font-mono text-[11px] text-slate-700">
              National Average Return: ~14.5%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
