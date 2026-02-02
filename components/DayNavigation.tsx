
import React from 'react';

interface DayNavigationProps {
  days: { id: number; label: string }[];
  activeDayId: number;
  onSelect: (id: number) => void;
}

const DayNavigation: React.FC<DayNavigationProps> = ({ days, activeDayId, onSelect }) => {
  return (
    <div className="flex space-x-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
      {days.map((day) => (
        <button
          key={day.id}
          onClick={() => onSelect(day.id)}
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex-shrink-0 ${
            activeDayId === day.id
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          {day.label}
        </button>
      ))}
    </div>
  );
};

export default DayNavigation;
