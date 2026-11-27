export const PAY_TYPES: string[] = ['전체', '건별', '시급', '일급', '주급', '월급', '연봉'];

export const PAY_LABELS: Partial<Record<string, string>> = {
  HOURLY: '시급',
  DAILY: '일급',
  WEEKLY: '주급',
  MONTHLY: '월급',
  YEARLY: '연봉',
  PER_TASK: '건별',
  PER_CASE: '건별',
};
