
import { AppState } from './types';

export const DEFAULT_STATE: AppState = {
  activeDayId: 1,
  days: Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    label: `Day ${i + 1}`,
    items: [],
    notes: "",
    dailyBudget: 0
  }))
};

export const COLORS = {
  primary: '#4f46e5',
  secondary: '#10b981',
  accent: '#f59e0b',
};
