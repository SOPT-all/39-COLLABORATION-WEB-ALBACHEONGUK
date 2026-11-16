import type { FilterTag } from '../../components/FilterTags.tsx';
import { PAY_TYPES } from '../../data/payTypes.ts';
import { ALL_GUGUN, REGION_PARAM, REGIONS } from '../../data/regions.ts';
import {
  applyJobSelections,
  CATEGORY_PARAM,
  getCategoryOnlySelection,
  getSelectedJobGroups,
  SUBCATEGORY_PARAM,
} from '../../utils/jobCategorySelection.ts';
import {
  getRegionLabel,
  readRegionSelection,
  writeRegionSelection,
} from '../../utils/regionSelection.ts';
import { readWorkCondition } from '../../utils/workConditionSelection.ts';

const FILTER_KEYS = {
  region: [REGION_PARAM.SIDO, REGION_PARAM.GUGUN],
  occupation: [CATEGORY_PARAM, SUBCATEGORY_PARAM],
  duration: ['period'],
  days: ['days'],
  workDays: ['workDays'],
  pay: ['pay'],
} satisfies Record<FilterTag['kind'], string[]>;

export function getSearchFilterTags(params: URLSearchParams): FilterTag[] {
  const tags: FilterTag[] = [];
  const region = readRegionSelection(params);
  if (region.sido) {
    if (region.guguns.length === REGIONS[region.sido].length) {
      tags.push({ kind: 'region', id: ALL_GUGUN, label: getRegionLabel(region) });
    } else {
      for (const district of region.guguns) {
        tags.push({ kind: 'region', id: district, label: district });
      }
    }
  }

  const groups = getSelectedJobGroups(params);
  for (const group of groups) {
    for (const name of group.selected) {
      tags.push({ kind: 'occupation', id: name, label: name });
    }
  }
  const category = getCategoryOnlySelection(params);
  if (category) {
    tags.push({ kind: 'occupation', id: category, label: category + ' 전체' });
  }

  const work = readWorkCondition(params);
  if (work.period !== '전체') tags.push({ kind: 'duration', id: work.period, label: work.period });
  for (const day of work.days) tags.push({ kind: 'days', id: day, label: day });
  if (work.workDays !== '전체')
    tags.push({ kind: 'workDays', id: work.workDays, label: work.workDays });

  const pay = params.get('pay');
  if (pay && pay !== '전체' && PAY_TYPES.includes(pay))
    tags.push({ kind: 'pay', id: pay, label: pay });
  return tags;
}

export function removeSearchFilterTag(params: URLSearchParams, tag: FilterTag) {
  const next = new URLSearchParams(params);
  next.delete('page');

  if (tag.kind === 'region' && tag.id !== ALL_GUGUN) {
    const { sido, guguns } = readRegionSelection(next);
    return writeRegionSelection(next, { sido, guguns: guguns.filter((name) => name !== tag.id) });
  }

  if (tag.kind === 'occupation') {
    const groups = getSelectedJobGroups(next);
    const remaining = groups.flatMap(({ selected }) => selected.filter((name) => name !== tag.id));
    if (remaining.length > 0) return applyJobSelections(next, groups[0].name, remaining);
  }

  if (tag.kind === 'days') {
    next.delete('days', tag.id);
  } else {
    FILTER_KEYS[tag.kind].forEach((key) => next.delete(key));
  }
  return next;
}

export function readSearchFilters(params: URLSearchParams) {
  const filters = new URLSearchParams();
  for (const key of Object.values(FILTER_KEYS).flat()) {
    for (const value of params.getAll(key)) filters.append(key, value);
  }
  return filters;
}

export function resetSearchFilters(params: URLSearchParams) {
  const next = new URLSearchParams(params);
  next.delete('page');
  Object.values(FILTER_KEYS)
    .flat()
    .forEach((key) => next.delete(key));
  return next;
}
