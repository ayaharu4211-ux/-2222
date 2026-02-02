
import React, { useState } from 'react';
import { AppState, DayPlan, ScheduleItem } from './types';
import { DEFAULT_STATE } from './constants';
import DayNavigation from './components/DayNavigation';
import ScheduleList from './components/ScheduleList';
import BudgetChart from './components/BudgetChart';
import PrintReport from './components/PrintReport';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(DEFAULT_STATE);

  const activeDay = state.days.find((d) => d.id === state.activeDayId) || state.days[0];

  const updateDayPlan = (dayId: number, updates: Partial<DayPlan>) => {
    setState((prev) => ({
      ...prev,
      days: prev.days.map((d) => (d.id === dayId ? { ...d, ...updates } : d)),
    }));
  };

  const handleDaySelect = (id: number) => {
    setState((prev) => ({ ...prev, activeDayId: id }));
  };

  const handleOverallBudgetChange = (value: number) => {
    setState((prev) => ({ ...prev, overallBudget: value }));
  };

  const handlePrint = () => {
    window.print();
  };

  // 全体の合計計算
  const grandTotalSpent = state.days.reduce((sum, day) => {
    return sum + day.items.reduce((s, item) => s + (item.estimatedCost || 0), 0);
  }, 0);
  
  // 残額の計算: 設定した総予算 - 全支出合計
  const grandTotalRemaining = state.overallBudget - grandTotalSpent;

  return (
    <div className="min-h-screen pb-20 px-4 md:px-8 max-w-7xl mx-auto pt-8">
      {/* PDF Report (Hidden in UI) */}
      <PrintReport state={state} />

      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4 no-print">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            5-Day <span className="text-indigo-600">Planner</span>
          </h1>
          <p className="text-slate-500 font-medium italic">予定と金額を正確にトラッキング</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handlePrint}
            className="flex items-center justify-center space-x-2 bg-indigo-600 text-white px-8 py-3 rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 font-bold"
          >
            <i className="fas fa-file-pdf"></i>
            <span>PDFレポートを出力</span>
          </button>
        </div>
      </header>

      {/* Total Summary Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 no-print">
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between ring-2 ring-transparent hover:ring-indigo-100 transition-all">
          <div className="flex items-center space-x-3 w-full">
            <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
              <i className="fas fa-wallet"></i>
            </div>
            <div className="flex-grow">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">5日間総予算 (入力可)</p>
              <div className="flex items-center">
                <span className="text-slate-400 font-bold mr-1">¥</span>
                <input
                  type="number"
                  value={state.overallBudget || ''}
                  onChange={(e) => handleOverallBudgetChange(Number(e.target.value))}
                  placeholder="予算を入力"
                  className="text-xl font-black text-slate-800 bg-transparent focus:outline-none w-full border-b border-transparent focus:border-indigo-300"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
              <i className="fas fa-receipt"></i>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">5日間総支出額</p>
              <p className="text-xl font-black text-slate-800">¥{grandTotalSpent.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className={`p-5 rounded-3xl shadow-sm border flex items-center justify-between ${grandTotalRemaining >= 0 ? 'bg-white border-slate-100' : 'bg-red-50 border-red-100'}`}>
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${grandTotalRemaining >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
              <i className={`fas ${grandTotalRemaining >= 0 ? 'fa-scale-balanced' : 'fa-triangle-exclamation'}`}></i>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">全体残額</p>
              <p className={`text-xl font-black ${grandTotalRemaining >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                ¥{grandTotalRemaining.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 no-print">
        
        {/* Left Section: Timeline Editor (Larger) */}
        <div className="lg:col-span-9 space-y-6">
          <DayNavigation 
            days={state.days} 
            activeDayId={state.activeDayId} 
            onSelect={handleDaySelect} 
          />

          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <ScheduleList 
              items={activeDay.items} 
              dailyBudget={activeDay.dailyBudget}
              onUpdateItems={(items) => updateDayPlan(activeDay.id, { items })} 
              onUpdateBudget={(dailyBudget) => updateDayPlan(activeDay.id, { dailyBudget })}
            />
          </div>
        </div>

        {/* Right Section: Notes & Chart (Smaller) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col h-[350px]">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
              <i className="fas fa-sticky-note text-amber-400 mr-2"></i> 備考メモ
            </h3>
            <textarea
              placeholder="詳細メモ..."
              value={activeDay.notes}
              onChange={(e) => updateDayPlan(activeDay.id, { notes: e.target.value })}
              className="flex-grow w-full bg-slate-50 rounded-2xl p-4 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 resize-none border border-slate-100 text-sm leading-relaxed"
            />
          </div>
          
          <div className="hidden md:block">
             <BudgetChart days={state.days} />
          </div>
        </div>
      </div>

      {/* Mobile Day Navigation */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center bg-white/90 backdrop-blur-md shadow-2xl rounded-full px-4 py-3 border border-slate-200 space-x-4 z-50 lg:hidden no-print">
        {state.days.map(d => (
          <button 
            key={d.id}
            onClick={() => handleDaySelect(d.id)}
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
              state.activeDayId === d.id ? 'bg-indigo-600 text-white' : 'text-slate-400'
            }`}
          >
            {d.id}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
