import React from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  Package,
  RotateCcw,
  Info,
  Database,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export type PageId = 'dashboard' | 'sales' | 'products' | 'returns' | 'about';

interface SidebarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onOpenDataInspector: () => void;
  isSynthetic: boolean;
}

interface NavItem {
  id: PageId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    description: 'Executive overview & primary KPIs'
  },
  {
    id: 'sales',
    label: 'Sales Analysis',
    icon: TrendingUp,
    description: 'Revenue velocity & state performance'
  },
  {
    id: 'products',
    label: 'Product Analysis',
    icon: Package,
    description: 'Top SKUs & category margins'
  },
  {
    id: 'returns',
    label: 'Returns Analysis',
    icon: RotateCcw,
    description: 'Root cause & return rate metrics'
  },
  {
    id: 'about',
    label: 'About Project',
    icon: Info,
    description: 'Power BI architecture & portfolio info'
  }
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  collapsed,
  onToggleCollapse,
  onOpenDataInspector,
  isSynthetic
}) => {
  return (
    <aside
      className={`bg-slate-900 text-slate-300 flex flex-col justify-between transition-all duration-200 border-r border-slate-800 shrink-0 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div>
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800">
          {!collapsed ? (
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm">
                BI
              </div>
              <div className="truncate">
                <span className="font-bold text-sm tracking-tight text-white block truncate">
                  Executive BI
                </span>
                <span className="text-[10px] text-slate-400 block -mt-0.5 truncate">
                  Retail Sales & Returns
                </span>
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm mx-auto shadow-sm">
              BI
            </div>
          )}

          <button
            type="button"
            onClick={onToggleCollapse}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="hidden md:flex p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-2 space-y-1 mt-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                title={collapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/70'
                } ${collapsed ? 'justify-center px-0' : ''}`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {!collapsed && (
                  <span className="truncate whitespace-nowrap">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer / Data Adapter Info */}
      <div className="p-3 border-t border-slate-800">
        {!collapsed ? (
          <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/80">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-blue-400" />
                <span>Data Adapter</span>
              </span>
              <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-blue-900/60 text-blue-300 font-mono">
                {isSynthetic ? 'Synthetic' : 'Custom'}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 leading-tight mb-2.5">
              Microsoft Power BI Retail Data Model mapped to TypeScript.
            </p>
            <button
              type="button"
              onClick={onOpenDataInspector}
              className="w-full py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-medium rounded-lg transition-colors border border-slate-700 text-center block"
            >
              Inspect Data & DAX
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onOpenDataInspector}
            title="Inspect Data & DAX"
            className="w-full flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <Database className="w-4 h-4 text-blue-400" />
          </button>
        )}
      </div>
    </aside>
  );
};
