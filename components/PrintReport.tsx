
import React from 'react';
import { AppState } from '../types';

interface PrintReportProps {
  state: AppState;
}

const PrintReport: React.FC<PrintReportProps> = ({ state }) => {
  const grandTotalSpent = state.days.reduce((sum, day) => {
    return sum + day.items.reduce((s, item) => s + (item.estimatedCost || 0), 0);
  }, 0);
  const grandTotalRemaining = state.overallBudget - grandTotalSpent;

  return (
    <div className="print-only print-container text-slate-900">
      <div className="text-center mb-10 border-b-4 border-indigo-600 pb-8">
        <h1 className="text-4xl font-black mb-2 tracking-tight">5-Day Planner & Budget Report</h1>
        <p className="text-slate-500 font-medium">作成日: {new Date().toLocaleDateString('ja-JP')}</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-12">
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">5日間設定予算</h2>
          <p className="text-3xl font-black text-slate-800">¥{state.overallBudget.toLocaleString()}</p>
        </div>
        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 text-center">
          <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">総支出額</h2>
          <p className="text-3xl font-black text-indigo-600">¥{grandTotalSpent.toLocaleString()}</p>
        </div>
        <div className={`p-6 rounded-2xl border text-center ${grandTotalRemaining >= 0 ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">総残額</h2>
          <p className={`text-3xl font-black ${grandTotalRemaining >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
            ¥{grandTotalRemaining.toLocaleString()}
          </p>
        </div>
      </div>

      {state.days.map((day, index) => {
        const daySpent = day.items.reduce((sum, item) => sum + (item.estimatedCost || 0), 0);
        const dayRemaining = day.dailyBudget - daySpent;
        return (
          <div key={day.id} className={`mb-16 ${index < 4 ? 'page-break' : ''}`}>
            <div className="flex justify-between items-end mb-6 border-b-2 border-slate-900 pb-2">
              <h2 className="text-3xl font-black">{day.label}</h2>
              <div className="text-right flex space-x-6">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block">日別目安予算</span>
                  <span className="font-bold">¥{day.dailyBudget.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block">この日の支出</span>
                  <span className="font-bold text-indigo-600">¥{daySpent.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {day.items.length > 0 ? (
              <table className="w-full mb-8 text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 uppercase text-[10px] font-black tracking-widest">
                    <th className="p-4 border border-slate-200 w-24">時刻</th>
                    <th className="p-4 border border-slate-200">予定内容</th>
                    <th className="p-4 border border-slate-200 text-right w-40">金額</th>
                  </tr>
                </thead>
                <tbody>
                  {day.items.map((item) => (
                    <tr key={item.id} className="border-b border-slate-100">
                      <td className="p-4 font-mono text-sm border border-slate-200 bg-slate-50">{item.time}</td>
                      <td className="p-4 text-sm border border-slate-200 font-medium">{item.title}</td>
                      <td className="p-4 text-right text-sm font-bold border border-slate-200">¥{Number(item.estimatedCost).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-slate-400 italic mb-8 border p-4 rounded-lg bg-slate-50">予定データが入力されていません。</p>
            )}

            {day.notes && (
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">備考・メモ</h3>
                <p className="text-slate-800 whitespace-pre-wrap leading-relaxed text-sm">{day.notes}</p>
              </div>
            )}
          </div>
        );
      })}

      <footer className="mt-20 text-center text-slate-300 text-[10px] border-t border-slate-100 pt-8 uppercase tracking-[0.2em]">
        <p>&copy; {new Date().getFullYear()} 5-Day Planner & Budget Pro - Finance Tracking System</p>
      </footer>
    </div>
  );
};

export default PrintReport;
