import React from 'react';
import { ChannelComparison } from '../../data/types';
import { formatCurrency, formatPercent } from '../../utils/formatters';
import { Globe, Store, ArrowUpRight } from 'lucide-react';

interface SalesByChannelChartProps {
  data: ChannelComparison[];
  onSelectChannel?: (channel: 'Online' | 'Store') => void;
  selectedChannel?: string;
}

export const SalesByChannelChart: React.FC<SalesByChannelChartProps> = ({
  data,
  onSelectChannel,
  selectedChannel
}) => {
  const online = data.find((d) => d.channel === 'Online') || {
    channel: 'Online' as const,
    sales: 0,
    orders: 0,
    salesSharePct: 0,
    aov: 0,
    returnCount: 0,
    returnRate: 0,
    returnAmount: 0
  };

  const store = data.find((d) => d.channel === 'Store') || {
    channel: 'Store' as const,
    sales: 0,
    orders: 0,
    salesSharePct: 0,
    aov: 0,
    returnCount: 0,
    returnRate: 0,
    returnAmount: 0
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 tracking-tight">
            Sales by Channel (Online vs Store)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Omnichannel volume distribution, basket values, and channel return friction
          </p>
        </div>
      </div>

      {/* Visual Channel Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-auto">
        {/* Online Card */}
        <div
          onClick={() => onSelectChannel && onSelectChannel('Online')}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${
            selectedChannel === 'Online'
              ? 'border-blue-500 bg-blue-50/40 shadow-xs ring-1 ring-blue-500'
              : 'border-slate-200 hover:border-blue-300 bg-slate-50/50'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold text-slate-900 text-sm">Online Channel</span>
                <p className="text-[11px] text-slate-500">eCommerce web & mobile</p>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400" />
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Gross Sales:</span>
              <span className="font-bold text-slate-900 text-base font-mono tabular-nums">
                {formatCurrency(online.sales)}
              </span>
            </div>

            {/* Proportion Bar */}
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, online.salesSharePct)}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1">
              <span>Channel Revenue Share:</span>
              <span className="font-semibold text-blue-700 font-mono">
                {formatPercent(online.salesSharePct)}
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1 border-t border-slate-200/60">
              <span>Orders:</span>
              <span className="font-medium text-slate-800 font-mono">
                {online.orders.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-600">
              <span>Average Order Value:</span>
              <span className="font-medium text-slate-800 font-mono">
                {formatCurrency(online.aov)}
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-600">
              <span>Return Rate:</span>
              <span
                className={`font-semibold font-mono ${
                  online.returnRate > 15 ? 'text-rose-600' : 'text-slate-800'
                }`}
              >
                {formatPercent(online.returnRate)}
              </span>
            </div>
          </div>
        </div>

        {/* Physical Store Card */}
        <div
          onClick={() => onSelectChannel && onSelectChannel('Store')}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${
            selectedChannel === 'Store'
              ? 'border-indigo-500 bg-indigo-50/40 shadow-xs ring-1 ring-indigo-500'
              : 'border-slate-200 hover:border-indigo-300 bg-slate-50/50'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-indigo-100 text-indigo-700">
                <Store className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold text-slate-900 text-sm">Retail Store</span>
                <p className="text-[11px] text-slate-500">Brick & mortar locations</p>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400" />
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Gross Sales:</span>
              <span className="font-bold text-slate-900 text-base font-mono tabular-nums">
                {formatCurrency(store.sales)}
              </span>
            </div>

            {/* Proportion Bar */}
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, store.salesSharePct)}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1">
              <span>Channel Revenue Share:</span>
              <span className="font-semibold text-indigo-700 font-mono">
                {formatPercent(store.salesSharePct)}
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1 border-t border-slate-200/60">
              <span>Orders:</span>
              <span className="font-medium text-slate-800 font-mono">
                {store.orders.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-600">
              <span>Average Order Value:</span>
              <span className="font-medium text-slate-800 font-mono">
                {formatCurrency(store.aov)}
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-600">
              <span>Return Rate:</span>
              <span
                className={`font-semibold font-mono ${
                  store.returnRate > 15 ? 'text-rose-600' : 'text-slate-800'
                }`}
              >
                {formatPercent(store.returnRate)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Click card to filter channel</span>
        <span className="text-slate-700 font-medium">
          Online Return Premium: +{(online.returnRate - store.returnRate).toFixed(1)}% vs Store
        </span>
      </div>
    </div>
  );
};
