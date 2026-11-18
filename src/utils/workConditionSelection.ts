import { days, periods, workDays } from '../data/workConditionOptions.ts';

export type WorkCondition = {
  period: string;
  days: string[];
  workDays: string;
};

const ALL = '전체';
const PERIOD = 'period';
const DAYS = 'days';
const WORK_DAYS = 'workDays';

function readOption(value: string | null, options: string[]) {
  return value !== null && options.includes(value) ? value : ALL;
}

export function readWorkCondition(params: URLSearchParams): WorkCondition {
  const selectedDays = params.getAll(DAYS);
  return {
    period: readOption(params.get(PERIOD), periods),
    days: days.filter((day) => day !== ALL && selectedDays.includes(day)),
    workDays: readOption(params.get(WORK_DAYS), workDays),
  };
}

export function writeWorkCondition(params: URLSearchParams, condition: WorkCondition) {
  const next = new URLSearchParams(params);
  next.set(PERIOD, condition.period === ALL ? '' : condition.period);
  next.set(WORK_DAYS, condition.workDays === ALL ? '' : condition.workDays);
  next.delete(DAYS);

  if (condition.days.length === 0) next.set(DAYS, '');
  else condition.days.forEach((day) => next.append(DAYS, day));

  return next;
}

export function matchesWorkCondition(
  condition: WorkCondition,
  job: { period: string; days: string[] },
) {
  if (condition.period !== '전체' && job.period.replaceAll(' ', '') !== condition.period) {
    return false;
  }

  if (condition.workDays === '전체') {
    return condition.days.length === 0 || condition.days.some((day) => job.days.includes(day));
  }

  if (condition.workDays !== '주' + job.days.length + '일') return false;
  if (condition.days.length === 0) return true;
  const [shorter, longer] =
    condition.days.length <= job.days.length
      ? [condition.days, job.days]
      : [job.days, condition.days];
  return shorter.every((day) => longer.includes(day));
}
