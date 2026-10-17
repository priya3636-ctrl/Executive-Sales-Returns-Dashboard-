import React from 'react';
import { PageId } from './Sidebar';
import { Menu, Download, Code2, ShieldAlert } from 'lucide-react';

interface HeaderProps {
  currentPage: PageId;
  onOpenMobileMenu: () => void;
  onOpenDataInspector: () => void;
  onExportCsv: () => void;
  isSynthetic: boolean;
}

const PAGE_TITLES: Record<PageId, { title: string; subtitle: string }> = {
  dashboard: {
    title: 'Executive Sales & Returns Dashboard',
    subtitle: 'Strategic retail performance, omnichannel revenue & return rate diagnostics'
  },
  sales: {
    title: 'Sales & Revenue Analysis',
    subtitle: 'Deep-dive into monthly velocity, seasonal distribution, and state performance'
  },
  products: {
    title: 'Product & Catalog Analysis',
    subtitle: 'Top performing SKUs, department profit margins, and return concentration'
  },
  returns: {
    title: 'Returns & Refund Diagnostics',
    subtitle: 'Root cause classification, return rates by category, and mitigation insights'
  },
  about: {
    title: 'About This Project',
    subtitle: 'Power BI to Modern Web Analytics portfolio documentation & technical architecture'
  }
};

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onOpenMobileMenu,
  onOpenDataInspector,
  onExportCsv,
  isSynthetic
}) => {
  const current = PAGE_TITLES[currentPage];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-6 py-3.5 shadow-2xs">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Titles */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="md:hidden p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-tight">
                {current.title}
              </h1>
              {isSynthetic && (
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-medium text-amber-800 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded">
                  <ShieldAlert className="w-3 h-3 text-amber-600" />
                  <span>Synthetic Demo Data</span>
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 hidden sm:block mt-0.5">
              {current.subtitle}
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenDataInspector}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 transition-colors shadow-xs"
            title="Inspect Data Adapter & Power BI DAX Formulas"
          >
            <Code2 className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Data & DAX Specs</span>
          </button>

          <button
            type="button"
            onClick={onExportCsv}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-xs font-semibold text-white transition-colors shadow-xs"
            title="Download active filtered summary as CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>
    </header>
  );
};
