import { parseCalendarDate } from './jobDate.ts';

// 마감 상태는 서버의 isClosed를 사용하고, 여기서는 날짜 문구만 만듭니다.
export function getJobDeadlineText(deadlineDate: string | null | undefined): string {
  if (deadlineDate === null) return '상시모집';
  if (typeof deadlineDate !== 'string' || parseCalendarDate(deadlineDate) === null) {
    return '마감일 확인';
  }
  return `${deadlineDate.replaceAll('-', '.')} 마감`;
}
