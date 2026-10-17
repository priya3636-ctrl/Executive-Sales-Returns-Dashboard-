import React from 'react';
import { AlertCircle, RotateCcw, Database, Loader2 } from 'lucide-react';

export const LoadingStateView: React.FC<{ message?: string }> = ({
  message = 'Calculating retail KPIs & aggregating multidimensional segments...'
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-xs flex flex-col items-center justify-center min-h-[360px]">
      <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-3" />
      <h4 className="text-sm font-semibold text-slate-800">Processing Analytics Model</h4>
      <p className="text-xs text-slate-500 mt-1 max-w-sm">{message}</p>
    </div>
  );
};

export const EmptyStateView: React.FC<{
  title?: string;
  description?: string;
  onResetFilters: () => void;
}> = ({
  title = 'No Matching Records Found',
  description = 'No transaction records match the current combination of state, date, category, and channel filters. Adjust or reset your filters to see data.',
  onResetFilters
}) => {
  return (
    <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center shadow-xs flex flex-col items-center justify-center min-h-[380px]">
      <div className="p-3 bg-slate-100 rounded-full text-slate-400 mb-3">
        <Database className="w-8 h-8" />
      </div>
      <h4 className="text-base font-semibold text-slate-800">{title}</h4>
      <p className="text-xs text-slate-500 mt-1.5 max-w-md leading-relaxed">
        {description}
      </p>
      <div className="mt-5">
        <button
          type="button"
          onClick={onResetFilters}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors shadow-xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Filters</span>
        </button>
      </div>
    </div>
  );
};

export const ErrorStateView: React.FC<{
  error: string;
  onRetry: () => void;
}> = ({ error, onRetry }) => {
  return (
    <div className="bg-rose-50/50 rounded-xl border border-rose-200 p-8 text-center shadow-xs flex flex-col items-center justify-center min-h-[300px]">
      <div className="p-3 bg-rose-100 rounded-full text-rose-600 mb-3">
        <AlertCircle className="w-7 h-7" />
      </div>
      <h4 className="text-base font-semibold text-rose-900">Dataset Adapter Error</h4>
      <p className="text-xs text-rose-700 mt-1 max-w-md font-mono">{error}</p>
      <div className="mt-4">
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-medium transition-colors"
        >
          <span>Retry Data Load</span>
        </button>
      </div>
    </div>
  );
};
