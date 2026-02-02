
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
  dailyBudget: number; // 1日の目安予算（オプション）
}

export interface AppState {
  days: DayPlan[];
  activeDayId: number;
  overallBudget: number; // 5日間の総予算
}
