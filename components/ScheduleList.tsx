
import React from 'react';
import { ScheduleItem } from '../types';

interface ScheduleListProps {
  items: ScheduleItem[];
  dailyBudget: number;
  onUpdateItems: (items: ScheduleItem[]) => void;
  onUpdateBudget: (budget: number) => void;
}

const ScheduleList: React.FC<ScheduleListProps> = ({ items, dailyBudget, onUpdateItems, onUpdateBudget }) => {
  const addItem = () => {
    const newItem: ScheduleItem = {
      id: Math.random().toString(36).substr(2, 9),
      time: '09:00',
      title: '',
      estimatedCost: 0,
    };
    onUpdateItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    onUpdateItems(items.filter((item) => item.id !== id));
  };

  const handleChange = (id: string, field: keyof ScheduleItem, value: any) => {
    onUpdateItems(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const spent = items.reduce((sum, item) => sum + Number(item.estimatedCost || 0), 0);
  const remaining = dailyBudget - spent;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800">タイムライン & 金額</h3>
        </div>
        <div className="flex items-center space-x-3 bg-slate-100 p-2 rounded-xl">
          <label className="text-xs font-bold text-slate-500 uppercase ml-2">1日の予算:</label>
          <div className="flex items-center">
            <span className="text-slate-400 font-bold mr-1">¥</span>
            <input
              type="number"
              value={dailyBudget}
              onChange={(e) => onUpdateBudget(Number(e.target.value))}
              className="w-32 bg-transparent font-bold text-slate-800 focus:outline-none border-b border-slate-300 focus:border-indigo-500"
              placeholder="予算を入力"
            />
          </div>
        </div>
      </div>

      <div className="max-h-[500px] overflow-y-auto space-y-3 pr-2">
        {items.length === 0 ? (
          <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
            <i className="fas fa-calendar-plus text-3xl mb-3 opacity-20"></i>
            <p>予定と金額を入力してください</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 group bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
              <input
                type="time"
                value={item.time}
                onChange={(e) => handleChange(item.id, 'time', e.target.value)}
                className="bg-slate-50 font-bold text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-100 rounded-lg px-2 py-1"
              />
              <input
                type="text"
                placeholder="予定の内容"
                value={item.title}
                onChange={(e) => handleChange(item.id, 'title', e.target.value)}
                className="flex-grow bg-transparent border-b border-transparent focus:border-indigo-300 focus:outline-none text-slate-800 font-medium"
              />
              <div className="flex items-center bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">
                <span className="text-slate-400 font-bold mr-1 text-xs">¥</span>
                <input
                  type="number"
                  placeholder="0"
                  value={item.estimatedCost || ''}
                  onChange={(e) => handleChange(item.id, 'estimatedCost', Number(e.target.value))}
                  className="w-24 bg-transparent text-right focus:outline-none text-slate-800 font-bold"
                />
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-slate-300 hover:text-red-500 transition-colors p-2"
              >
                <i className="fas fa-trash-can text-sm"></i>
              </button>
            </div>
          ))
        )}
        <button
          onClick={addItem}
          className="w-full py-4 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all font-bold"
        >
          <i className="fas fa-plus mr-2"></i> 項目を追加する
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-100">
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">使用額合計</p>
          <p className="text-2xl font-black text-slate-800">¥{spent.toLocaleString()}</p>
        </div>
        <div className={`p-4 rounded-2xl border ${remaining >= 0 ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">残額</p>
          <p className={`text-2xl font-black ${remaining >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
            ¥{remaining.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScheduleList;
