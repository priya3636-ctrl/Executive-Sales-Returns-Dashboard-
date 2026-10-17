import React from 'react';
import {
  FileCode2,
  BookOpen,
  CheckCircle2,
  Terminal,
  ShieldCheck,
  Github,
  Linkedin,
  Layers,
  Cpu,
  BarChart3,
  ExternalLink
} from 'lucide-react';
import { METRIC_DEFINITIONS } from '../data/definitions';

export const AboutProjectPage: React.FC<{ onOpenDataInspector: () => void }> = ({
  onOpenDataInspector
}) => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Hero Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
          <div>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-1">
              Portfolio & Academic Project
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Executive Sales & Returns Analytics
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
              A high-performance modern web application replicating and expanding upon an enterprise
              Microsoft Power BI Retail Sales & Returns Dashboard model. Built for executive decision-making,
              portfolio presentation, GitHub, and LinkedIn.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onOpenDataInspector}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs flex items-center gap-2"
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span>Inspect DAX & Adapter</span>
            </button>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">
              Architecture
            </span>
            <div className="font-bold text-slate-900 text-sm">Decoupled Adapter</div>
            <p className="text-[11px] text-slate-600 mt-1">
              Data layer isolated behind TypeScript contracts for pluggable data sources.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">
              BI Equivalence
            </span>
            <div className="font-bold text-slate-900 text-sm">Power BI DAX Mapped</div>
            <p className="text-[11px] text-slate-600 mt-1">
              Calculates Total Sales, Distinct Orders, Return Rate, and AOV consistently.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">
              Privacy First
            </span>
            <div className="font-bold text-slate-900 text-sm">Synthetic Demo Data</div>
            <p className="text-[11px] text-slate-600 mt-1">
              No private customer or company credentials exposed in public repos.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">
              Portability
            </span>
            <div className="font-bold text-slate-900 text-sm">Zero-Server Static</div>
            <p className="text-[11px] text-slate-600 mt-1">
              Deployable directly to Vercel, Netlify, GitHub Pages, or Cloud Run.
            </p>
          </div>
        </div>
      </div>

      {/* Project Objective & Background */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <span>Project Objective & Scope</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          The goal of this project was to take a desktop-bound <strong>Microsoft Power BI Retail Sales & Returns Report</strong>
          and translate it into an accessible, interactive, responsive executive web application. While Power BI is powerful
          within enterprise intranets, web deployments often encounter licensing barriers, slow iframe embeds, and limited customization.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          This implementation solves those friction points by implementing the exact business intelligence logic directly in TypeScript,
          pairing it with Recharts for responsive SVG graphics, and structuring a modular Data Adapter layer that easily integrates
          with live database APIs, CSV file drops, or Power BI REST exports.
        </p>
      </div>

      {/* Power BI DAX vs Web Implementation Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-600" />
          <span>Power BI to Web Component Mapping</span>
        </h3>
        <div className="border border-slate-200 rounded-xl overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <th className="py-2.5 px-3">Power BI Visual / Feature</th>
                <th className="py-2.5 px-3">Web Architecture Equivalent</th>
                <th className="py-2.5 px-3">Underlying DAX / Logic</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-800">KPI Card Strip</td>
                <td className="py-2.5 px-3 font-mono text-[11px] text-blue-600">KPICard.tsx</td>
                <td className="py-2.5 px-3 font-mono text-[11px] text-slate-700">
                  SUMX, DISTINCTCOUNT, DIVIDE
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-800">Monthly Sales Line Chart</td>
                <td className="py-2.5 px-3 font-mono text-[11px] text-blue-600">MonthlyTrendChart.tsx (Recharts Composed)</td>
                <td className="py-2.5 px-3 font-mono text-[11px] text-slate-700">
                  CALCULATE([Sales], DATESYTD)
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-800">Sales by State Bar Visual</td>
                <td className="py-2.5 px-3 font-mono text-[11px] text-blue-600">SalesByStateChart.tsx (Horizontal Bar)</td>
                <td className="py-2.5 px-3 font-mono text-[11px] text-slate-700">
                  SUMMARIZE(Geography, [Sales], [ReturnRate])
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-800">Returns by Reason Donut</td>
                <td className="py-2.5 px-3 font-mono text-[11px] text-blue-600">ReturnsByReasonChart.tsx (Recharts Pie)</td>
                <td className="py-2.5 px-3 font-mono text-[11px] text-slate-700">
                  COUNTROWS(FILTER(Sales, IsReturned))
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-800">Slicers (Date, State, Category)</td>
                <td className="py-2.5 px-3 font-mono text-[11px] text-blue-600">FilterBar.tsx (State Reducer Hook)</td>
                <td className="py-2.5 px-3 font-mono text-[11px] text-slate-700">
                  Filter Context & Evaluation Context
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Tech Stack & Tools */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Cpu className="w-4 h-4 text-blue-600" />
          <span>Technology Stack & Design Choices</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
            <span className="font-semibold text-slate-900 block mb-0.5">React 19 & TypeScript</span>
            <p className="text-slate-500 text-[11px]">
              Strongly typed domain models, zero runtime casting errors, and fast component re-renders.
            </p>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
            <span className="font-semibold text-slate-900 block mb-0.5">Tailwind CSS v4</span>
            <p className="text-slate-500 text-[11px]">
              Strict enterprise palette (#0F172A slate, #2563EB primary blue, #EF4444 return crimson).
            </p>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
            <span className="font-semibold text-slate-900 block mb-0.5">Recharts 2.x</span>
            <p className="text-slate-500 text-[11px]">
              Declarative, responsive SVG charting engine with smooth tooltips and tabular legends.
            </p>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
            <span className="font-semibold text-slate-900 block mb-0.5">Lucide React</span>
            <p className="text-slate-500 text-[11px]">
              Clean, uniform vector iconography adhering to modern UI affordance guidelines.
            </p>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
            <span className="font-semibold text-slate-900 block mb-0.5">Tabular Numerals</span>
            <p className="text-slate-500 text-[11px]">
              JetBrains Mono & tabular-nums styling ensuring numerical digits align vertically without jitter.
            </p>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
            <span className="font-semibold text-slate-900 block mb-0.5">Data Adapter Pattern</span>
            <p className="text-slate-500 text-[11px]">
              Object-oriented interface isolation making dataset connection straightforward.
            </p>
          </div>
        </div>
      </div>

      {/* Learning Outcomes */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-blue-600" />
          <span>Key Learning Outcomes</span>
        </h3>
        <div className="space-y-2 text-xs sm:text-sm text-slate-600">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>DAX to Code Translation:</strong> Mastered the translation of complex multi-table evaluation context and row context into declarative client-side filtering algorithms.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Cross-Filter Synchronization:</strong> Designed state management such that selecting a slice in one visual (e.g., clicking California or Online) instantly filters all sibling charts and KPI aggregations.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Retail Domain Understanding:</strong> Deepened practical comprehension of omni-channel retail metrics (Gross Sales, Net Sales, Return Rate, Basket Size / AOV, and Reverse Logistics cost factors).
            </span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Data Privacy & Security:</strong> Engineered synthetic demo data generators with authentic distribution curves to share code publicly on GitHub without exposing confidential business data.
            </span>
          </div>
        </div>
      </div>

      {/* Synthetic Data & Privacy Statement */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 text-xs text-amber-900 space-y-2">
        <div className="flex items-center gap-2 font-bold text-sm text-amber-950">
          <ShieldCheck className="w-4 h-4 text-amber-700" />
          <span>Notice Regarding Demo Data & Privacy</span>
        </div>
        <p className="leading-relaxed">
          The records displayed across this application are generated via a deterministic mathematical pseudo-random algorithm designed to mirror typical omnichannel retail patterns (e.g. Q4 seasonality, online sizing return friction, and product category margins).
        </p>
        <p className="leading-relaxed">
          <strong>No proprietary, confidential, or customer PII from real enterprise datasets is bundled with or exposed by this application.</strong> To view analytics against real datasets, developers can implement the <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">IDataSourceAdapter</code> interface or upload their authorized CSV via the Data & DAX Specs panel.
        </p>
      </div>
    </div>
  );
};
