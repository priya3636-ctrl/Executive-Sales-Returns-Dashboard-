import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell
} from 'recharts';
import { StateSales } from '../../data/types';
import { formatCurrency, formatPercent } from '../../utils/formatters';

interface SalesByStateChartProps {
  data: StateSales[];
  onSelectState?: (state: string) => void;
  selectedState?: string;
}

export const SalesByStateChart: React.FC<SalesByStateChartProps> = ({
  data,
  onSelectState,
  selectedState
}) => {
  const [metricView, setMetricView] = useState<'sales' | 'returnRate'>('sales');

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item: StateSales = payload[0].payload;
      return (
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-lg text-xs">
          <div className="font-semibold text-slate-800 border-b border-slate-100 pb-1 mb-2 flex items-center justify-between">
            <span>{item.state}</span>
            <span className="text-slate-500 font-normal">Region: {item.region}</span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-500">Gross Sales:</span>
              <span className="font-semibold text-slate-900 tabular-nums font-mono">
                {formatCurrency(item.sales)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-500">National Share:</span>
              <span className="font-medium text-blue-600 tabular-nums">
                {formatPercent(item.salesSharePct)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-500">Orders Count:</span>
              <span className="font-medium text-slate-700 tabular-nums">
                {item.orders.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 pt-1 border-t border-slate-100">
              <span className="text-slate-500">Return Rate:</span>
              <span
                className={`font-semibold tabular-nums ${
                  item.returnRate > 18 ? 'text-rose-600' : 'text-slate-700'
                }`}
              >
                {formatPercent(item.returnRate)}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Sort descending by selected metric
  const sortedData = [...data].sort((a, b) => {
    return metricView === 'sales' ? b.sales - a.sales : b.returnRate - a.returnRate;
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 tracking-tight">
            Sales by State (Top Territories)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Geographic revenue concentration and state-level return propensity
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setMetricView('sales')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
              metricView === 'sales'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            By Sales ($)
          </button>
          <button
            type="button"
            onClick={() => setMetricView('returnRate')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
              metricView === 'returnRate'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            By Return Rate (%)
          </button>
        </div>
      </div>

      {/* Horizontal Bar Chart Canvas */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={sortedData}
            margin={{ top: 5, right: 30, left: 35, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
            <XAxis
              type="number"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#e2e8f0' }}
              tickFormatter={(v) =>
                metricView === 'sales' ? formatCurrency(v, true) : `${v}%`
              }
            />
            <YAxis
              type="category"
              dataKey="state"
              stroke="#475569"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              width={75}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey={metricView === 'sales' ? 'sales' : 'returnRate'}
              radius={[0, 4, 4, 0]}
              onClick={(entry: any) => onSelectState && onSelectState(entry?.state || entry?.payload?.state)}
              className="cursor-pointer"
            >
              {sortedData.map((entry, index) => {
                const isSelected = selectedState === entry.state;
                if (metricView === 'returnRate') {
                  const color = entry.returnRate > 18 ? '#ef4444' : '#64748b';
                  return <Cell key={`cell-${index}`} fill={color} />;
                }
                const color = isSelected
                  ? '#1d4ed8'
                  : index === 0
                  ? '#1e40af'
                  : index < 3
                  ? '#2563eb'
                  : '#3b82f6';
                return <Cell key={`cell-${index}`} fill={color} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Click bar to filter by state</span>
        <span className="font-medium text-slate-700">
          Top State: {sortedData[0]?.state} ({formatCurrency(sortedData[0]?.sales || 0)})
        </span>
      </div>
    </div>
  );
};
