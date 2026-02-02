
export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  estimatedCost: number;
}

export interface DayPlan {
  id: number;
  label: string;
  items: ScheduleItem[];
  notes: string;
  dailyBudget: number; // 1日の予算
}

export interface AppState {
  days: DayPlan[];
  activeDayId: number;
}
