import { JOB_CATEGORIES } from '../data/jobCategoryOptions.ts';

export const CATEGORY_PARAM = 'jobCategory';
export const SUBCATEGORY_PARAM = 'jobSubcategory';

export function getCategoryOnlySelection(params: URLSearchParams) {
  const category = params.get(CATEGORY_PARAM);
  if (params.getAll(CATEGORY_PARAM).length !== 1) return null;
  if (params.getAll(SUBCATEGORY_PARAM).some(Boolean)) return null;
  return JOB_CATEGORIES.find(({ name }) => name === category)?.name ?? null;
}

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

export function applyJobSelections(
  params: URLSearchParams,
  categoryName: string,
  selections: string[],
) {
  const next = new URLSearchParams(params);

  next.delete(CATEGORY_PARAM);
  next.delete(SUBCATEGORY_PARAM);

  if (categoryName === '전체') {
    next.set(CATEGORY_PARAM, '');
    next.set(SUBCATEGORY_PARAM, '');
    return next;
  }

  if (selections.length === 0) {
    next.set(CATEGORY_PARAM, categoryName);
    next.set(SUBCATEGORY_PARAM, '');
    return next;
  }

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
