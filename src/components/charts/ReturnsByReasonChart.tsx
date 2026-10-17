import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip
} from 'recharts';
import { ReturnReasonDistribution } from '../../data/types';
import { formatCurrency, formatPercent } from '../../utils/formatters';

interface ReturnsByReasonChartProps {
  data: ReturnReasonDistribution[];
}

const COLORS = [
  '#dc2626', // Red - Defective/Damaged
  '#ea580c', // Orange - Sizing & Fit
  '#d97706', // Amber - Wrong Item
  '#4f46e5', // Indigo - Item Not as Described
  '#0284c7', // Sky - Arrived Too Late
  '#64748b'  // Slate - Changed Mind
];

export const ReturnsByReasonChart: React.FC<ReturnsByReasonChartProps> = ({ data }) => {
  const totalReturnCount = data.reduce((acc, curr) => acc + curr.count, 0);
  const totalReturnAmount = data.reduce((acc, curr) => acc + curr.amount, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item: ReturnReasonDistribution = payload[0].payload;
      return (
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-lg text-xs">
          <div className="font-semibold text-slate-800 border-b border-slate-100 pb-1 mb-2">
            {item.reason}
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-500">Return Incidents:</span>
              <span className="font-semibold text-slate-900 tabular-nums">
                {item.count.toLocaleString()} orders
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-500">Share of Returns:</span>
              <span className="font-semibold text-rose-600 tabular-nums">
                {formatPercent(item.percentage)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 pt-1 border-t border-slate-100">
              <span className="text-slate-500">Refund Amount:</span>
              <span className="font-mono text-slate-700 tabular-nums">
                {formatCurrency(item.amount)}
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 tracking-tight">
            Returns by Reason
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Root cause classification of customer returns and concessions
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-500">Total Refunded: </span>
          <span className="text-xs font-semibold text-rose-600 font-mono tabular-nums">
            {formatCurrency(totalReturnAmount)}
          </span>
        </div>
      </div>

      {/* Doughnut Chart Canvas */}
      <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4 py-2">
        {/* Donut graphic */}
        <div className="md:col-span-6 h-60 w-full relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<CustomTooltip />} />
              <Pie
                data={data}
                dataKey="count"
                nameKey="reason"
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={2}
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-reason-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="#ffffff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Centered Donut Summary */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl font-bold text-slate-900 tabular-nums font-mono">
              {totalReturnCount}
            </span>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">
              Returns
            </span>
          </div>
        </div>

        {/* Legend list */}
        <div className="md:col-span-6 space-y-2 text-xs">
          {data.map((item, idx) => (
            <div
              key={item.reason}
              className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-2 truncate pr-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                />
                <span className="text-slate-700 truncate" title={item.reason}>
                  {item.reason}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-slate-400 font-mono text-[11px] tabular-nums">
                  {item.count}
                </span>
                <span className="font-semibold text-slate-900 font-mono text-xs tabular-nums w-12 text-right">
                  {formatPercent(item.percentage)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-2 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Dominant issue: {data[0]?.reason}</span>
        <span className="text-rose-600 font-medium">{formatPercent(data[0]?.percentage || 0)}</span>
      </div>
    </div>
  );
};
