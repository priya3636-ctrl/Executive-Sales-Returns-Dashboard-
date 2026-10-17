import React, { useState } from 'react';
import { HelpCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { METRIC_DEFINITIONS } from '../../data/definitions';

interface KPICardProps {
  id: 'totalSales' | 'totalOrders' | 'returnRate' | 'averageOrderValue';
  title: string;
  value: string;
  subtitle: string;
  trend?: {
    value: string;
    isPositiveGood?: boolean;
    isUp?: boolean;
    isNeutral?: boolean;
    text: string;
  };
  accentColor?: 'blue' | 'indigo' | 'rose' | 'emerald';
}

export const KPICard: React.FC<KPICardProps> = ({
  id,
  title,
  value,
  subtitle,
  trend,
  accentColor = 'blue'
}) => {
  const [showFormula, setShowFormula] = useState(false);
  const metricDef = METRIC_DEFINITIONS[id];

  const accentBorderMap = {
    blue: 'hover:border-blue-300',
    indigo: 'hover:border-indigo-300',
    rose: 'hover:border-rose-300',
    emerald: 'hover:border-emerald-300'
  };

  const getTrendColor = () => {
    if (!trend) return '';
    if (trend.isNeutral) return 'text-slate-500 bg-slate-50';
    const isGood = trend.isPositiveGood ? trend.isUp : !trend.isUp;
    return isGood ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50';
  };

  return (
    <div
      className={`relative bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs transition-all duration-150 ${accentBorderMap[accentColor]} flex flex-col justify-between`}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {title}
        </span>
        <button
          type="button"
          onClick={() => setShowFormula(!showFormula)}
          title="View DAX & Metric Definition"
          className="text-slate-400 hover:text-slate-600 transition-colors p-0.5 rounded focus:outline-none"
        >
          <HelpCircle className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Metric Value */}
      <div className="mt-2.5 mb-1">
        <div className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 tabular-nums">
          {value}
        </div>
      </div>

      {/* Context & Trend */}
      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-slate-500 truncate max-w-[170px]" title={subtitle}>
          {subtitle}
        </span>

        {trend && (
          <div
            className={`flex items-center gap-1 font-medium px-1.5 py-0.5 rounded ${getTrendColor()}`}
            title={trend.text}
          >
            {trend.isNeutral ? (
              <Minus className="w-3 h-3" />
            ) : trend.isUp ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <span className="tabular-nums">{trend.value}</span>
          </div>
        )}
      </div>

      {/* Slide-down definition overlay */}
      {showFormula && metricDef && (
        <div className="absolute inset-0 z-20 bg-slate-900/95 text-white p-4 rounded-xl flex flex-col justify-between text-xs backdrop-blur-xs">
          <div>
            <div className="flex items-center justify-between border-b border-slate-700 pb-1.5 mb-2">
              <span className="font-semibold text-blue-400">{metricDef.name}</span>
              <button
                type="button"
                onClick={() => setShowFormula(false)}
                className="text-slate-400 hover:text-white px-1 font-mono text-sm"
              >
                ×
              </button>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed mb-2">
              {metricDef.description}
            </p>
            <div className="bg-slate-950/70 p-2 rounded border border-slate-800 font-mono text-[10px] text-emerald-400 overflow-x-auto whitespace-pre">
              {metricDef.daxFormula}
            </div>
          </div>
          <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-800 flex justify-between items-center">
            <span>DAX Measure Equivalence</span>
            <span className="text-blue-300 font-mono">Power BI Retail Model</span>
          </div>
        </div>
      )}
    </div>
  );
};
