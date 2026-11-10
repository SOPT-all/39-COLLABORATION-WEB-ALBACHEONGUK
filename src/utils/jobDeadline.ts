const DAY_MS = 24 * 60 * 60 * 1000;
const KST_OFFSET_MS = 9 * 60 * 60 * 1000;

export type JobDeadline = {
  status: 'open' | 'urgent' | 'today' | 'closed' | 'always' | 'unknown';
  label: string;
  dateText: string;
  description: string;
  daysRemaining: number | null;
};

export function parseCalendarDate(value: string): number | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;

  const [, yearText, monthText, dayText] = match;
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const date = new Date(0);
  date.setUTCFullYear(year, month - 1, day);
  date.setUTCHours(0, 0, 0, 0);

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }
  return date.getTime() / DAY_MS;
}

// deadlineDate는 KST 달력 날짜(YYYY-MM-DD), null은 명시적인 상시모집입니다.
// API가 시각 문자열을 주면 API 연결 계층에서 먼저 이 날짜 형식으로 변환합니다.
export function getJobDeadline(
  deadlineDate: string | null | undefined,
  isRecruitmentClosed: boolean,
  now: Date,
): JobDeadline {
  const deadlineDay = typeof deadlineDate === 'string' ? parseCalendarDate(deadlineDate) : null;
  const dateText =
    deadlineDay !== null ? `${deadlineDate?.replaceAll('-', '.')} 마감` : '마감일 확인';

  if (isRecruitmentClosed) {
    return {
      status: 'closed',
      label: '마감',
      dateText,
      description: '채용 완료로 마감된 공고',
      daysRemaining: null,
    };
  }
  if (deadlineDate === null) {
    return {
      status: 'always',
      label: '상시모집',
      dateText: '상시모집',
      description: '상시모집 공고',
      daysRemaining: null,
    };
  }
  if (deadlineDay === null || !Number.isFinite(now.getTime())) {
    return {
      status: 'unknown',
      label: '마감일 확인',
      dateText,
      description: '마감일 정보 확인 필요',
      daysRemaining: null,
    };
  }

  const todayKst = Math.floor((now.getTime() + KST_OFFSET_MS) / DAY_MS);
  const daysRemaining = deadlineDay - todayKst;
  const status =
    daysRemaining < 0
      ? 'closed'
      : daysRemaining === 0
        ? 'today'
        : daysRemaining <= 3
          ? 'urgent'
          : 'open';
  const label = daysRemaining < 0 ? '마감' : daysRemaining === 0 ? 'D-Day' : `D-${daysRemaining}`;
  return { status, label, dateText, description: `${dateText}, ${label}`, daysRemaining };
}

export function getMillisecondsUntilNextKstDay(now: Date): number {
  return DAY_MS - ((now.getTime() + KST_OFFSET_MS) % DAY_MS);
}
