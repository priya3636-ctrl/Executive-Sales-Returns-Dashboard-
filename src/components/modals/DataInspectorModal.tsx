import React, { useState } from 'react';
import { TransactionRecord } from '../../data/types';
import { METRIC_DEFINITIONS } from '../../data/definitions';
import { formatCurrency, formatPercent } from '../../utils/formatters';
import { X, Download, Code2, Table, Layers, CheckCircle2, UploadCloud } from 'lucide-react';

interface DataInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  records: TransactionRecord[];
  onExportCsv: () => void;
  onUploadCsv?: (csvText: string) => void;
  isSynthetic: boolean;
}

export const DataInspectorModal: React.FC<DataInspectorModalProps> = ({
  isOpen,
  onClose,
  records,
  onExportCsv,
  onUploadCsv,
  isSynthetic
}) => {
  const [activeTab, setActiveTab] = useState<'adapter' | 'dax' | 'records' | 'upload'>('adapter');
  const [uploadText, setUploadText] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleUploadSubmit = () => {
    if (uploadText.trim() && onUploadCsv) {
      onUploadCsv(uploadText);
      setUploadSuccess(true);
      setTimeout(() => {
        setUploadSuccess(false);
        setActiveTab('records');
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">
                Data Adapter Architecture & DAX Calculation Engine
              </h3>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                {isSynthetic ? 'Synthetic Demo Mode' : 'Custom Dataset Active'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Inspect model specifications, DAX-to-TypeScript formulas, sample records, and data adapter hooks
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 px-6 bg-white gap-6 text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('adapter')}
            className={`py-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'adapter'
                ? 'border-blue-600 text-blue-600 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Adapter Architecture</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('dax')}
            className={`py-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'dax'
                ? 'border-blue-600 text-blue-600 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>DAX Measure Specifications</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('records')}
            className={`py-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'records'
                ? 'border-blue-600 text-blue-600 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>Sample Records ({records.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`py-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'upload'
                ? 'border-blue-600 text-blue-600 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Connect Custom Dataset</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 text-slate-700 text-xs">
          {activeTab === 'adapter' && (
            <div className="space-y-4">
              <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-4">
                <h4 className="font-semibold text-blue-950 text-sm mb-1">
                  Decoupled Data Adapter Layer (`src/data/adapter.ts`)
                </h4>
                <p className="text-slate-600 text-xs leading-relaxed">
                  This application strictly separates the UI visualization layer from the data source via the
                  <code className="text-blue-700 bg-blue-100/60 px-1 py-0.5 rounded mx-1 font-mono">IDataSourceAdapter</code>
                  interface. You can switch between this synthetic demonstration dataset, a live REST API, or an authorized Power BI dataset without altering any chart component.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                  <h5 className="font-semibold text-slate-900 mb-2">1. Synthetic Demo Adapter</h5>
                  <ul className="space-y-1.5 text-slate-600">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Realistic 2024 retail transactions spanning all 12 months</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Deterministic PRNG ensures consistent, repeatable metrics</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Zero private or confidential company data exposed</span>
                    </li>
                  </ul>
                </div>

                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                  <h5 className="font-semibold text-slate-900 mb-2">2. Connecting Your Real Dataset</h5>
                  <ul className="space-y-1.5 text-slate-600">
                    <li className="flex items-start gap-1.5">
                      <span className="font-mono text-blue-600 font-bold">A.</span>
                      <span>Paste or upload your CSV in the &ldquo;Connect Custom Dataset&rdquo; tab</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="font-mono text-blue-600 font-bold">B.</span>
                      <span>Or implement <code className="font-mono text-[11px]">IDataSourceAdapter</code> to query an Express backend proxy</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="font-mono text-blue-600 font-bold">C.</span>
                      <span>Power BI REST API / Azure Analysis Services export compatible</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-[11px] overflow-x-auto leading-relaxed">
                <div className="text-slate-400">// Interface Contract (TypeScript)</div>
                <div>export interface IDataSourceAdapter &#123;</div>
                <div className="pl-4">loadRecords(): Promise&lt;TransactionRecord[]&gt;;</div>
                <div className="pl-4">applyFilters(records: TransactionRecord[], filters: FilterState): TransactionRecord[];</div>
                <div className="pl-4">calculateKPIs(records: TransactionRecord[]): KPISummary;</div>
                <div className="pl-4">getMonthlyTrend(records: TransactionRecord[]): MonthlyTrend[];</div>
                <div className="pl-4">getSalesByState(records: TransactionRecord[]): StateSales[];</div>
                <div className="pl-4">getSalesByCategory(records: TransactionRecord[]): CategorySales[];</div>
                <div className="pl-4">getReturnsByReason(records: TransactionRecord[]): ReturnReasonDistribution[];</div>
                <div>&#125;</div>
              </div>
            </div>
          )}

          {activeTab === 'dax' && (
            <div className="space-y-4">
              <p className="text-slate-600">
                Below are the exact Power BI DAX calculations modeled in this web app, showing both the Power BI DAX measure and its TypeScript client-side equivalent.
              </p>

              <div className="space-y-3">
                {Object.values(METRIC_DEFINITIONS).map((m) => (
                  <div key={m.name} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-semibold text-slate-900 text-xs">{m.name}</span>
                      <span className="text-[11px] font-mono text-blue-600">{m.formulaDescription}</span>
                    </div>
                    <p className="text-slate-500 text-[11px] mb-2">{m.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[10.5px]">
                      <div className="bg-slate-900 text-emerald-400 p-2.5 rounded font-mono overflow-x-auto">
                        <div className="text-slate-500 mb-1">// Power BI DAX Measure</div>
                        <pre className="whitespace-pre">{m.daxFormula}</pre>
                      </div>
                      <div className="bg-slate-900 text-blue-300 p-2.5 rounded font-mono overflow-x-auto">
                        <div className="text-slate-500 mb-1">// TypeScript Engine Equivalence</div>
                        <pre className="whitespace-pre">{m.typescriptImplementation}</pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'records' && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-slate-500">
                  Showing first 25 of {records.length.toLocaleString()} active filtered records
                </span>
                <button
                  type="button"
                  onClick={onExportCsv}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Clean CSV</span>
                </button>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                      <th className="py-2.5 px-3">Order ID</th>
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3">State</th>
                      <th className="py-2.5 px-3">Channel</th>
                      <th className="py-2.5 px-3">Category</th>
                      <th className="py-2.5 px-3">Product Name</th>
                      <th className="py-2.5 px-3 text-right">Sales ($)</th>
                      <th className="py-2.5 px-3 text-center">Returned?</th>
                      <th className="py-2.5 px-3">Return Reason</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {records.slice(0, 25).map((r) => (
                      <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-2 px-3 font-mono text-[11px] text-slate-600">{r.orderId}</td>
                        <td className="py-2 px-3 text-slate-600 whitespace-nowrap">{r.date}</td>
                        <td className="py-2 px-3 font-medium text-slate-800">{r.state}</td>
                        <td className="py-2 px-3">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                              r.channel === 'Online'
                                ? 'bg-blue-50 text-blue-700'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {r.channel}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-slate-600 truncate max-w-[120px]">{r.category}</td>
                        <td className="py-2 px-3 text-slate-800 font-medium truncate max-w-[160px]" title={r.productName}>
                          {r.productName}
                        </td>
                        <td className="py-2 px-3 text-right font-mono font-medium text-slate-900 tabular-nums">
                          {formatCurrency(r.salesAmount)}
                        </td>
                        <td className="py-2 px-3 text-center">
                          {r.isReturned ? (
                            <span className="text-rose-600 font-bold font-mono">YES</span>
                          ) : (
                            <span className="text-slate-400 font-mono">No</span>
                          )}
                        </td>
                        <td className="py-2 px-3 text-[11px] text-slate-600 truncate max-w-[150px]">
                          {r.returnReason || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="space-y-4">
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                <h4 className="font-semibold text-slate-900 text-sm mb-1">
                  Custom CSV Dataset Ingestion
                </h4>
                <p className="text-slate-600 text-xs leading-relaxed">
                  You can connect your own exported Power BI or Excel dataset. Paste CSV text below with columns:
                  <code className="text-blue-700 font-mono text-[11px] bg-blue-50 px-1 py-0.5 rounded ml-1">
                    OrderID, Date, State, Channel, Category, ProductName, UnitPrice, Quantity, Discount, IsReturned, ReturnReason
                  </code>
                </p>
              </div>

              <div>
                <textarea
                  rows={8}
                  placeholder={`OrderID,Date,State,Channel,Category,ProductName,UnitPrice,Quantity,Discount,IsReturned,ReturnReason\nORD-901,2024-03-12,California,Online,Electronics,4K Smart TV,799.99,1,0.05,FALSE,\nORD-902,2024-03-13,Texas,Store,Apparel & Footwear,Trail Runner Shoes,155.00,2,0.10,TRUE,Sizing & Fit Issue`}
                  value={uploadText}
                  onChange={(e) => setUploadText(e.target.value)}
                  className="w-full font-mono text-xs p-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  Data is processed strictly in your local browser sandbox.
                </span>
                <button
                  type="button"
                  onClick={handleUploadSubmit}
                  disabled={!uploadText.trim()}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    uploadText.trim()
                      ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer shadow-xs'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {uploadSuccess ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      <span>Dataset Ingested!</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>Apply Custom CSV Dataset</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>Retail Analytics DAX Specification Model</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
