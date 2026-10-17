import React from 'react';
import { FilterState, ProductCategory, SalesChannel } from '../../data/types';
import { RotateCcw, Search, Calendar, MapPin, Tag, Store, Globe } from 'lucide-react';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onReset: () => void;
  availableStates: string[];
  totalRecordsCount: number;
  filteredRecordsCount: number;
}

const CATEGORIES: ProductCategory[] = [
  'Electronics',
  'Apparel & Footwear',
  'Home & Kitchen',
  'Sports & Outdoors',
  'Beauty & Personal Care'
];

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onReset,
  availableStates,
  totalRecordsCount,
  filteredRecordsCount
}) => {
  const isFiltered =
    filters.datePreset !== 'all' ||
    filters.state !== 'All' ||
    filters.category !== 'All' ||
    filters.channel !== 'All' ||
    filters.searchQuery.trim() !== '';

  const handlePresetChange = (preset: FilterState['datePreset']) => {
    onFilterChange({ ...filters, datePreset: preset });
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, state: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, category: e.target.value });
  };

  const handleChannelChange = (channel: 'All' | SalesChannel) => {
    onFilterChange({ ...filters, channel });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, searchQuery: e.target.value });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left Side: Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 flex-1">
          {/* Date Preset Filter */}
          <div className="relative">
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Timeframe</span>
            </label>
            <select
              value={filters.datePreset}
              onChange={(e) => handlePresetChange(e.target.value as FilterState['datePreset'])}
              className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
            >
              <option value="all">Full Year 2024 (Jan - Dec)</option>
              <option value="Q1">Q1 2024 (Jan - Mar)</option>
              <option value="Q2">Q2 2024 (Apr - Jun)</option>
              <option value="Q3">Q3 2024 (Jul - Sep)</option>
              <option value="Q4">Q4 2024 (Oct - Dec)</option>
              <option value="H1">H1 2024 (First Half)</option>
              <option value="H2">H2 2024 (Second Half)</option>
            </select>
          </div>

          {/* State Filter */}
          <div className="relative">
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>State / Region</span>
            </label>
            <select
              value={filters.state}
              onChange={handleStateChange}
              className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
            >
              <option value="All">All States ({availableStates.length})</option>
              {availableStates.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Product Category Filter */}
          <div className="relative">
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              <span>Product Category</span>
            </label>
            <select
              value={filters.category}
              onChange={handleCategoryChange}
              className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
            >
              <option value="All">All Categories (5)</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Channel Segmented Control */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Store className="w-3.5 h-3.5 text-slate-400" />
              <span>Sales Channel</span>
            </label>
            <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                type="button"
                onClick={() => handleChannelChange('All')}
                className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${
                  filters.channel === 'All'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => handleChannelChange('Online')}
                className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all flex items-center justify-center gap-1 ${
                  filters.channel === 'Online'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Globe className="w-3 h-3" />
                <span>Online</span>
              </button>
              <button
                type="button"
                onClick={() => handleChannelChange('Store')}
                className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all flex items-center justify-center gap-1 ${
                  filters.channel === 'Store'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Store className="w-3 h-3" />
                <span>Store</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Search and Reset */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-2.5 pt-2 lg:pt-0 lg:border-l lg:border-slate-200 lg:pl-4">
          {/* Quick Search */}
          <div className="relative min-w-[200px]">
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Search Records</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Product, SKU, Order..."
                value={filters.searchQuery}
                onChange={handleSearchChange}
                className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg pl-8 pr-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Reset Filters CTA */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onReset}
              disabled={!isFiltered}
              className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                isFiltered
                  ? 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 cursor-pointer shadow-xs'
                  : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed opacity-60'
              }`}
              title={isFiltered ? 'Reset all filters to default' : 'No filters applied'}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter status strip */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span>Active Dataset Scope:</span>
          <span className="font-semibold text-slate-800 tabular-nums">
            {filteredRecordsCount.toLocaleString()} of {totalRecordsCount.toLocaleString()} transactions
          </span>
          {isFiltered && (
            <span className="text-blue-600 font-medium">
              ({Math.round((filteredRecordsCount / totalRecordsCount) * 100)}% subset)
            </span>
          )}
        </div>

        {isFiltered && (
          <div className="flex items-center gap-2 text-[11px] text-slate-600">
            <span>Filters:</span>
            {filters.datePreset !== 'all' && (
              <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                {filters.datePreset}
              </span>
            )}
            {filters.state !== 'All' && (
              <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                {filters.state}
              </span>
            )}
            {filters.category !== 'All' && (
              <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                {filters.category}
              </span>
            )}
            {filters.channel !== 'All' && (
              <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                {filters.channel}
              </span>
            )}
            {filters.searchQuery.trim() && (
              <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                &ldquo;{filters.searchQuery}&rdquo;
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
