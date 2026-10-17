import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import { CategorySales } from '../../data/types';
import { formatCurrency, formatPercent } from '../../utils/formatters';

interface CategoryComparisonChartProps {
  data: CategorySales[];
  onSelectCategory?: (category: string) => void;
  selectedCategory?: string;
}

export const CategoryComparisonChart: React.FC<CategoryComparisonChartProps> = ({
  data,
  onSelectCategory,
  selectedCategory
}) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const item = data.find((c) => c.category === label);
      return (
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-lg text-xs">
          <div className="font-semibold text-slate-800 border-b border-slate-100 pb-1 mb-2">
            {label}
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-500">Gross Sales:</span>
              <span className="font-semibold text-blue-600 tabular-nums font-mono">
                {formatCurrency(item?.sales || 0)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-500">Refunded / Returned:</span>
              <span className="font-semibold text-rose-600 tabular-nums font-mono">
                {formatCurrency(item?.returnAmount || 0)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-500">Return Rate:</span>
              <span className="font-medium text-slate-700 tabular-nums">
                {formatPercent(item?.returnRate || 0)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 pt-1 border-t border-slate-100">
              <span className="text-slate-500">Units Sold:</span>
              <span className="font-medium text-slate-700 tabular-nums">
                {item?.unitsSold.toLocaleString()} units
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
            Sales & Returns by Product Category
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Gross sales comparison against return volume across all retail departments
          </p>
        </div>
      </div>

      {/* Bar Chart Canvas */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 25 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="category"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#e2e8f0' }}
              interval={0}
              angle={-15}
              textAnchor="end"
              height={35}
            />
            <YAxis
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => formatCurrency(v, true)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: '11px', paddingBottom: '10px' }}
            />
            <Bar
              dataKey="sales"
              name="Gross Sales"
              fill="#2563eb"
              radius={[4, 4, 0, 0]}
              onClick={(entry: any) => onSelectCategory && onSelectCategory(entry?.category || entry?.payload?.category)}
              className="cursor-pointer"
            />
            <Bar
              dataKey="returnAmount"
              name="Refunds / Returns"
              fill="#ef4444"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Click bar to filter category</span>
        {selectedCategory && selectedCategory !== 'All' ? (
          <span className="font-semibold text-blue-600">Filtered: {selectedCategory}</span>
        ) : (
          <span className="text-slate-600 font-mono text-[11px]">All 5 Departments</span>
        )}
      </div>
    </div>
  );
};
