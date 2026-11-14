import { JOB_CATEGORIES } from '../data/jobCategoryOptions.ts';

export const CATEGORY_PARAM = 'jobCategory';
export const SUBCATEGORY_PARAM = 'jobSubcategory';

export function getSelectedJobGroups(params: URLSearchParams) {
  const categories = params.getAll(CATEGORY_PARAM);
  const values = params.getAll(SUBCATEGORY_PARAM);
  return JOB_CATEGORIES.map((category) => ({
    name: category.name,
    options: category.subcategories.filter((item) => item !== '전체'),
  }))
    .map((category) => ({
      ...category,
      selected: category.options.filter(
        (item) =>
          categories.includes(category.name) && (values.includes('전체') || values.includes(item)),
      ),
    }))
    .filter((category) => category.selected.length > 0);
}

export function applyJobSelections(params: URLSearchParams, selections: string[]) {
  const next = new URLSearchParams(params);
  next.delete(CATEGORY_PARAM);
  next.delete(SUBCATEGORY_PARAM);
  for (const category of JOB_CATEGORIES) {
    const selected = category.subcategories.filter(
      (item) => item !== '전체' && selections.includes(item),
    );
    if (selected.length === 0) continue;
    next.append(CATEGORY_PARAM, category.name);
    selected.forEach((item) => next.append(SUBCATEGORY_PARAM, item));
  }
  return next;
}
