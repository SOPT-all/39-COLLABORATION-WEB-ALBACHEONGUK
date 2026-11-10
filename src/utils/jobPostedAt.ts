import { parseCalendarDate } from './jobDate.ts';

const DAY_MS = 24 * 60 * 60 * 1000;
const KST_OFFSET_MS = 9 * 60 * 60 * 1000;

// 달력 날짜 또는 시간대가 명시된 등록 시각을 받아 KST 날짜로 비교합니다.
export function getJobPostedAt(postedAt: string, now: Date): string {
  let postedDay = parseCalendarDate(postedAt);
  if (postedDay === null && /^\d{4}-\d{2}-\d{2}T.*(?:Z|[+-]\d{2}:\d{2})$/.test(postedAt)) {
    const datePart = postedAt.slice(0, 10);
    const timestamp = Date.parse(postedAt);
    if (parseCalendarDate(datePart) !== null && Number.isFinite(timestamp)) {
      postedDay = Math.floor((timestamp + KST_OFFSET_MS) / DAY_MS);
    }
  }
  if (postedDay === null || !Number.isFinite(now.getTime())) return '등록일 확인';
  const today = Math.floor((now.getTime() + KST_OFFSET_MS) / DAY_MS);
  const days = today - postedDay;
  if (days < 0) return '등록일 확인';
  if (days === 0) return '오늘';
  if (days < 31) return `${days}일 전`;
  const postedDate = new Date(postedDay * DAY_MS);
  const todayDate = new Date(today * DAY_MS);
  let months =
    (todayDate.getUTCFullYear() - postedDate.getUTCFullYear()) * 12 +
    todayDate.getUTCMonth() -
    postedDate.getUTCMonth();
  if (todayDate.getUTCDate() < postedDate.getUTCDate()) months -= 1;
  if (months < 12) return `${Math.max(1, months)}달 전`;
  return `${Math.floor(months / 12)}년 전`;
}
