
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { DayPlan } from '../types';

interface BudgetChartProps {
  days: DayPlan[];
}

const BudgetChart: React.FC<BudgetChartProps> = ({ days }) => {
  const data = days.map(day => ({
    name: day.label,
    total: day.items.reduce((sum, item) => sum + (item.estimatedCost || 0), 0)
  }));

  const totalAllDays = data.reduce((sum, d) => sum + d.total, 0);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider">総予算サマリー</h3>
          <p className="text-3xl font-black text-slate-800">¥{totalAllDays.toLocaleString()}</p>
        </div>
        <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold">
          5 Days Total
        </div>
      </div>
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }}
            />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
            />
            <Bar dataKey="total" radius={[6, 6, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#4f46e5' : '#818cf8'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BudgetChart;
