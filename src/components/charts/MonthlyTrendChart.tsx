import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import { MonthlyTrend } from '../../data/types';
import { formatCurrency, formatPercent } from '../../utils/formatters';

interface MonthlySalesTrendChartProps {
  data: MonthlyTrend[];
}

export const MonthlySalesTrendChart: React.FC<MonthlySalesTrendChartProps> = ({ data }) => {
  const [viewMode, setViewMode] = useState<'sales-returns' | 'sales-target' | 'return-rate'>('sales-returns');

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const row = data.find((d) => d.monthName === label);
      return (
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-lg text-xs">
          <div className="font-semibold text-slate-800 border-b border-slate-100 pb-1 mb-2">
            {row?.fullMonth || label}
          </div>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <div key={`item-${index}`} className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span
                    className="w-2 h-2 rounded-full inline-block"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span>{entry.name}:</span>
                </span>
                <span className="font-semibold text-slate-900 tabular-nums font-mono">
                  {entry.name.includes('Rate')
                    ? formatPercent(entry.value)
                    : formatCurrency(entry.value)}
                </span>
              </div>
            ))}
            {row && (
              <div className="pt-1.5 mt-1 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Orders Processed:</span>
                <span className="font-medium text-slate-700 tabular-nums">{row.orders}</span>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 tracking-tight">
            Monthly Sales & Trend Analysis
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Revenue momentum, refund deductions, and volume tracking throughout fiscal year
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode('sales-returns')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
              viewMode === 'sales-returns'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sales & Returns
          </button>
          <button
            type="button"
            onClick={() => setViewMode('sales-target')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
              viewMode === 'sales-target'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Vs Target Plan
          </button>
          <button
            type="button"
            onClick={() => setViewMode('return-rate')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
              viewMode === 'return-rate'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Return Rate %
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="returnsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="monthName"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <YAxis
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) =>
                viewMode === 'return-rate' ? `${v}%` : formatCurrency(v, true)
              }
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: '11px', paddingBottom: '10px' }}
            />

            {viewMode === 'sales-returns' && (
              <>
                <Area
                  type="monotone"
                  dataKey="sales"
                  name="Gross Sales"
                  stroke="#2563eb"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#salesGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="returnAmount"
                  name="Return Amount"
                  stroke="#ef4444"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#returnsGradient)"
                />
                <Line
                  type="monotone"
                  dataKey="netSales"
                  name="Net Sales"
                  stroke="#059669"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  dot={false}
                />
              </>
            )}

            {viewMode === 'sales-target' && (
              <>
                <Area
                  type="monotone"
                  dataKey="sales"
                  name="Actual Gross Sales"
                  stroke="#2563eb"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#salesGradient)"
                />
                <Line
                  type="monotone"
                  dataKey="targetSales"
                  name="Planned Target"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 3, fill: '#f59e0b' }}
                />
              </>
            )}

            {viewMode === 'return-rate' && (
              <Line
                type="monotone"
                dataKey="returnRate"
                name="Return Rate (%)"
                stroke="#dc2626"
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#dc2626' }}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Full fiscal calendar view</span>
        <span className="font-mono text-[11px] text-slate-600">Updated from filtered records</span>
      </div>
    </div>
  );
};
