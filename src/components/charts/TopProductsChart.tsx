import React from 'react';
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
import { TopProduct } from '../../data/types';
import { formatCurrency, formatPercent } from '../../utils/formatters';

interface TopProductsChartProps {
  data: TopProduct[];
}

export const TopProductsChart: React.FC<TopProductsChartProps> = ({ data }) => {
  const top10 = data.slice(0, 10);

  // Truncate long product names for Y-axis display
  const chartData = top10.map((item, idx) => ({
    ...item,
    rank: idx + 1,
    displayName: item.name.length > 22 ? `${item.name.substring(0, 20)}...` : item.name
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item: TopProduct = payload[0].payload;
      return (
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-lg text-xs max-w-xs">
          <div className="font-semibold text-slate-800 border-b border-slate-100 pb-1 mb-2">
            {item.name}
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-500">SKU / Code:</span>
              <span className="font-mono text-slate-700">{item.sku}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-500">Category:</span>
              <span className="text-slate-800 font-medium">{item.category}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-500">Gross Sales:</span>
              <span className="font-semibold text-blue-600 tabular-nums font-mono">
                {formatCurrency(item.sales)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-500">Units Sold:</span>
              <span className="font-medium text-slate-800 tabular-nums">
                {item.unitsSold.toLocaleString()} units
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-500">Unit Price:</span>
              <span className="font-mono text-slate-700 tabular-nums">
                {formatCurrency(item.unitPrice)}
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

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 tracking-tight">
            Top 10 Products by Sales
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Ranked SKU performance, volume contribution, and quality health
          </p>
        </div>
      </div>

      {/* Bar Chart Canvas */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
            <XAxis
              type="number"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#e2e8f0' }}
              tickFormatter={(v) => formatCurrency(v, true)}
            />
            <YAxis
              type="category"
              dataKey="displayName"
              stroke="#475569"
              fontSize={10.5}
              tickLine={false}
              axisLine={false}
              width={140}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="sales" radius={[0, 4, 4, 0]}>
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-top-${index}`}
                  fill={index === 0 ? '#1e3a8a' : index < 3 ? '#2563eb' : '#60a5fa'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Ranked by gross sales volume</span>
        <span className="font-mono text-[11px] text-slate-700">
          #1: {chartData[0]?.name.substring(0, 18)}...
        </span>
      </div>
    </div>
  );
};
