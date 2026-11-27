import type { JobFilterOptions } from '../../apis/searchJobs.ts';
import type { ResumeRecommendationRequest, WorkPeriod } from '../../types/resumeRecommendation.ts';
import { readWorkCondition } from '../../utils/workConditionSelection.ts';
import { mapJobSearchParams } from './searchJobApiParams.ts';

const WORK_PERIOD_CODES: Record<string, WorkPeriod | undefined> = {
  '1일': 'ONE_DAY',
  '1주일이하': 'UNDER_ONE_WEEK',
  '1주일~1개월': 'ONE_WEEK_TO_ONE_MONTH',
  '1개월~3개월': 'ONE_TO_THREE_MONTHS',
  '3개월~6개월': 'THREE_TO_SIX_MONTHS',
  '6개월~1년': 'SIX_MONTHS_TO_ONE_YEAR',
  '1년이상': 'OVER_ONE_YEAR',
};

const DAYS_PER_WEEK: Partial<Record<string, number>> = {
  주1일: 1,
  주2일: 2,
  주3일: 3,
  주4일: 4,
  주5일: 5,
  주6일: 6,
};

export function mapResumeRecommendationParams(
  params: URLSearchParams,
  options?: JobFilterOptions,
  resumeId?: number,
): ResumeRecommendationRequest {
  const preparedFilters = options ? mapJobSearchParams(params, options) : undefined;

  const regionIds = preparedFilters?.params.getAll('regionIds').map(Number);
  const categoryCodes = preparedFilters?.params.getAll('categoryCodes');
  const workdays = preparedFilters?.params
    .getAll('workdays')
    .filter(
      (day) =>
        day === 'MON' ||
        day === 'TUE' ||
        day === 'WED' ||
        day === 'THU' ||
        day === 'FRI' ||
        day === 'SAT' ||
        day === 'SUN',
    );

  const workPeriod = WORK_PERIOD_CODES[params.get('period') ?? ''];
  const { workDays } = readWorkCondition(params);
  const daysPerWeek = DAYS_PER_WEEK[workDays];
  const selectedPayType = preparedFilters?.params.get('payType');

  const payType =
    selectedPayType === 'PER_TASK'
      ? 'PER_CASE'
      : selectedPayType === 'HOURLY' ||
          selectedPayType === 'DAILY' ||
          selectedPayType === 'WEEKLY' ||
          selectedPayType === 'MONTHLY' ||
          selectedPayType === 'YEARLY' ||
          selectedPayType === 'PER_CASE'
        ? selectedPayType
        : undefined;

  return {
    keyword: (params.get('keyword') ?? '').trim().slice(0, 30),
    resumeId,
    regionIds,
    categoryCodes,
    workdays,
    daysPerWeek,
    workPeriod,
    payType,
  };
}
