import type { JobFilterOptions } from '../../apis/searchJobs.ts';
import {
  getCategoryOnlySelection,
  getSelectedJobGroups,
} from '../../utils/jobCategorySelection.ts';
import { readRegionSelection } from '../../utils/regionSelection.ts';
import { readWorkCondition } from '../../utils/workConditionSelection.ts';
import { readResultToolbar } from './searchResultOptions.ts';

const CATEGORY_ALIASES: Partial<Record<string, string>> = {
  커피전문점: '카페',
  '베이커리·도넛·떡': '베이커리',
};

export function mapJobSearchParams(input: URLSearchParams, options: JobFilterOptions) {
  const params = new URLSearchParams();
  const unsupported: string[] = [];
  const keyword = input.get('keyword')?.trim().slice(0, 30);
  if (keyword) params.set('keyword', keyword);
  const { sort, pageSize } = readResultToolbar(input);
  const page = Number(input.get('page'));
  params.set('sort', sort === 'latest' ? 'PUBLISHED_DESC' : 'ACCURACY');
  params.set('size', String(pageSize));
  params.set('page', String(Number.isSafeInteger(page) && page > 0 ? page : 1));
  params.set('ongoing', String(input.get('activeOnly') === 'true'));

  const { sido, guguns } = readRegionSelection(input);
  if (sido) {
    const parent = options.regions.find((item) => !item.parentCode && item.name === sido);
    if (!parent) unsupported.push(sido);
    else if (input.getAll('gugun').includes('전체')) params.append('regionIds', parent.code);
    else {
      for (const name of guguns) {
        const district = options.regions.find(
          (item) => item.parentCode === parent.code && item.name === name,
        );
        if (district) params.append('regionIds', district.code);
        else unsupported.push(name);
      }
    }
  }

  const category = getCategoryOnlySelection(input);
  if (category) {
    const parent = options.categories.find((item) => !item.parentCode && item.name === category);
    if (parent) params.append('categoryCodes', parent.code);
    else unsupported.push(category);
  }
  for (const group of getSelectedJobGroups(input)) {
    const parent = options.categories.find((item) => !item.parentCode && item.name === group.name);
    for (const name of group.selected) {
      const serverName = CATEGORY_ALIASES[name] ?? name;
      const child =
        parent &&
        options.categories.find(
          (item) => item.parentCode === parent.code && item.name === serverName,
        );
      if (child) params.append('categoryCodes', child.code);
      else unsupported.push(name);
    }
  }

  const work = readWorkCondition(input);
  for (const day of work.days) {
    const option = options.workdays.find(({ name }) => name === day + '요일' || name === day);
    if (option) params.append('workdays', option.code);
    else unsupported.push(day + '요일');
  }
  if (work.period !== '전체') unsupported.push('근무기간 ' + work.period);
  if (work.workDays !== '전체') unsupported.push('근무일수 ' + work.workDays);

  const pay = input.get('pay');
  if (pay && pay !== '전체') {
    const option = options.payConditions.find(({ name }) => name === pay);
    if (option) params.set('payType', option.code);
    else unsupported.push(pay);
  }
  return { params, unsupported };
}
