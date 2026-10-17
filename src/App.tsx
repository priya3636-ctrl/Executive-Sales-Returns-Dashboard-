import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  TransactionRecord,
  FilterState,
  KPISummary,
  MonthlyTrend,
  StateSales,
  CategorySales,
  TopProduct,
  ReturnReasonDistribution,
  ChannelComparison,
  ProductCategory,
  SalesChannel,
  ReturnReason
} from './data/types';
import { defaultDataAdapter } from './data/adapter';
import { Sidebar, PageId } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardOverview } from './pages/DashboardOverview';
import { SalesAnalysisPage } from './pages/SalesAnalysisPage';
import { ProductAnalysisPage } from './pages/ProductAnalysisPage';
import { ReturnsAnalysisPage } from './pages/ReturnsAnalysisPage';
import { AboutProjectPage } from './pages/AboutProjectPage';
import { DataInspectorModal } from './components/modals/DataInspectorModal';
import { LoadingStateView, ErrorStateView } from './components/common/StateViews';
import { X } from 'lucide-react';

const INITIAL_FILTERS: FilterState = {
  datePreset: 'all',
  startDate: '',
  endDate: '',
  state: 'All',
  category: 'All',
  channel: 'All',
  searchQuery: ''
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dataInspectorOpen, setDataInspectorOpen] = useState(false);

  // Data & loading state
  const [allRecords, setAllRecords] = useState<TransactionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSynthetic, setIsSynthetic] = useState(defaultDataAdapter.isSynthetic);

  // Active filters
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  // Load initial dataset
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const records = await defaultDataAdapter.loadRecords();
      setAllRecords(records);
    } catch (err: any) {
      setError(err?.message || 'Failed to initialize dataset');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Extract available distinct states from current records
  const availableStates = useMemo(() => {
    const set = new Set<string>();
    allRecords.forEach((r) => set.add(r.state));
    return Array.from(set).sort();
  }, [allRecords]);

  // Filtered dataset computed via data adapter
  const filteredRecords = useMemo(() => {
    return defaultDataAdapter.applyFilters(allRecords, filters);
  }, [allRecords, filters]);

  // Power BI equivalent aggregated metrics computed via Data Adapter
  const kpis: KPISummary = useMemo(() => {
    return defaultDataAdapter.calculateKPIs(filteredRecords);
  }, [filteredRecords]);

  const monthlyTrend: MonthlyTrend[] = useMemo(() => {
    return defaultDataAdapter.getMonthlyTrend(filteredRecords);
  }, [filteredRecords]);

  const salesByState: StateSales[] = useMemo(() => {
    return defaultDataAdapter.getSalesByState(filteredRecords, 10);
  }, [filteredRecords]);

  const salesByCategory: CategorySales[] = useMemo(() => {
    return defaultDataAdapter.getSalesByCategory(filteredRecords);
  }, [filteredRecords]);

  const topProducts: TopProduct[] = useMemo(() => {
    return defaultDataAdapter.getTopProducts(filteredRecords, 10);
  }, [filteredRecords]);

  const returnsByReason: ReturnReasonDistribution[] = useMemo(() => {
    return defaultDataAdapter.getReturnsByReason(filteredRecords);
  }, [filteredRecords]);

  const salesByChannel: ChannelComparison[] = useMemo(() => {
    return defaultDataAdapter.getSalesByChannel(filteredRecords);
  }, [filteredRecords]);

  // Handlers
  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const handleExportCsv = () => {
    const csvContent = defaultDataAdapter.exportSummaryCsv(filteredRecords);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Executive_Sales_Returns_Summary_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleUploadCustomCsv = (csvText: string) => {
    try {
      const lines = csvText.trim().split('\n');
      if (lines.length < 2) return;

      const newRecords: TransactionRecord[] = [];
      const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());

      for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(',').map((val) => val.trim().replace(/^"|"$/g, ''));
        if (row.length < 6) continue;

        const orderId = row[0] || `ORD-CUSTOM-${i}`;
        const date = row[1] || '2024-06-15';
        const state = row[2] || 'California';
        const channel: SalesChannel = row[3]?.toLowerCase() === 'online' ? 'Online' : 'Store';
        const category = (row[4] as ProductCategory) || 'Electronics';
        const productName = row[5] || `Product Item ${i}`;
        const unitPrice = parseFloat(row[6]) || 120;
        const quantity = parseInt(row[7], 10) || 1;
        const discount = parseFloat(row[8]) || 0;
        const isReturned = row[9]?.toLowerCase() === 'true' || row[9] === '1';
        const returnReason = (row[10] as ReturnReason) || (isReturned ? 'Defective / Damaged Item' : null);

        const salesAmount = Math.round(unitPrice * quantity * (1 - discount) * 100) / 100;
        const dateParts = date.split('-');
        const monthNum = parseInt(dateParts[1], 10) || 6;
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthName = monthNames[monthNum - 1] || 'Jun';
        const quarter = monthNum <= 3 ? 'Q1' : monthNum <= 6 ? 'Q2' : monthNum <= 9 ? 'Q3' : 'Q4';

        newRecords.push({
          id: `TXN-CUSTOM-${i}`,
          orderId,
          date,
          year: parseInt(dateParts[0], 10) || 2024,
          month: monthNum,
          monthName,
          quarter,
          customerId: `CUST-${1000 + i}`,
          customerSegment: 'Consumer',
          state,
          region: 'West',
          channel,
          category,
          subCategory: 'Custom',
          productSku: `SKU-${100 + i}`,
          productName,
          unitPrice,
          quantity,
          discount,
          salesAmount,
          costAmount: salesAmount * 0.55,
          isReturned,
          returnReason,
          returnQuantity: isReturned ? quantity : 0,
          returnAmount: isReturned ? salesAmount : 0,
          profitAmount: isReturned ? 0 : salesAmount * 0.45
        });
      }

      if (newRecords.length > 0) {
        defaultDataAdapter.setCustomRecords(newRecords);
        setAllRecords(newRecords);
        setIsSynthetic(false);
      }
    } catch (e) {
      console.error('Failed to parse uploaded CSV:', e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased">
      <div className="flex flex-1 relative overflow-x-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden md:flex">
          <Sidebar
            currentPage={currentPage}
            onNavigate={(p) => setCurrentPage(p)}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            onOpenDataInspector={() => setDataInspectorOpen(true)}
            isSynthetic={isSynthetic}
          />
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative w-64 max-w-[80%] bg-slate-900 h-full flex flex-col z-10 shadow-xl">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between text-white">
                <span className="font-bold text-sm">Executive BI Navigation</span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <Sidebar
                  currentPage={currentPage}
                  onNavigate={(p) => {
                    setCurrentPage(p);
                    setMobileMenuOpen(false);
                  }}
                  collapsed={false}
                  onToggleCollapse={() => {}}
                  onOpenDataInspector={() => {
                    setMobileMenuOpen(false);
                    setDataInspectorOpen(true);
                  }}
                  isSynthetic={isSynthetic}
                />
              </div>
            </div>
          </div>
        )}

        {/* Main Application Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <Header
            currentPage={currentPage}
            onOpenMobileMenu={() => setMobileMenuOpen(true)}
            onOpenDataInspector={() => setDataInspectorOpen(true)}
            onExportCsv={handleExportCsv}
            isSynthetic={isSynthetic}
          />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {loading ? (
              <LoadingStateView />
            ) : error ? (
              <ErrorStateView error={error} onRetry={loadData} />
            ) : (
              <>
                {currentPage === 'dashboard' && (
                  <DashboardOverview
                    kpis={kpis}
                    monthlyTrend={monthlyTrend}
                    salesByState={salesByState}
                    salesByCategory={salesByCategory}
                    topProducts={topProducts}
                    returnsByReason={returnsByReason}
                    salesByChannel={salesByChannel}
                    filters={filters}
                    onFilterChange={setFilters}
                    onResetFilters={handleResetFilters}
                    availableStates={availableStates}
                    totalRecordsCount={allRecords.length}
                    filteredRecordsCount={filteredRecords.length}
                  />
                )}

                {currentPage === 'sales' && (
                  <SalesAnalysisPage
                    monthlyTrend={monthlyTrend}
                    salesByState={salesByState}
                    salesByCategory={salesByCategory}
                    filters={filters}
                    onFilterChange={setFilters}
                    onResetFilters={handleResetFilters}
                    availableStates={availableStates}
                    totalRecordsCount={allRecords.length}
                    filteredRecordsCount={filteredRecords.length}
                  />
                )}

                {currentPage === 'products' && (
                  <ProductAnalysisPage
                    topProducts={topProducts}
                    salesByCategory={salesByCategory}
                    filters={filters}
                    onFilterChange={setFilters}
                    onResetFilters={handleResetFilters}
                    availableStates={availableStates}
                    totalRecordsCount={allRecords.length}
                    filteredRecordsCount={filteredRecords.length}
                  />
                )}

                {currentPage === 'returns' && (
                  <ReturnsAnalysisPage
                    returnsByReason={returnsByReason}
                    salesByCategory={salesByCategory}
                    salesByChannel={salesByChannel}
                    kpis={kpis}
                    filters={filters}
                    onFilterChange={setFilters}
                    onResetFilters={handleResetFilters}
                    availableStates={availableStates}
                    totalRecordsCount={allRecords.length}
                    filteredRecordsCount={filteredRecords.length}
                  />
                )}

                {currentPage === 'about' && (
                  <AboutProjectPage
                    onOpenDataInspector={() => setDataInspectorOpen(true)}
                  />
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* Data Inspector & DAX Specs Modal */}
      <DataInspectorModal
        isOpen={dataInspectorOpen}
        onClose={() => setDataInspectorOpen(false)}
        records={filteredRecords}
        onExportCsv={handleExportCsv}
        onUploadCsv={handleUploadCustomCsv}
        isSynthetic={isSynthetic}
      />
    </div>
  );
}
