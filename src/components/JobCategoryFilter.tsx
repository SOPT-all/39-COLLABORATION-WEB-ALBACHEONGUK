import { useState } from 'react';
import DropdownRegionJob from './Dropdown/DropdownRegionJob';
import SelectListItem from './SelectListItem';
import { JOB_CATEGORIES, jobCategories } from '../data/jobCategoryOptions';
import Checkbox from './Checkbox';
import { useFilterParams } from '../hooks/useFilterParams.ts';
import type { FilterParams } from '../hooks/useFilterParams.ts';
import Dropdown from './Dropdown/Dropdown';
import jobOffIcon from '../assets/icons/job-off.svg';
import jobOnIcon from '../assets/icons/job-on.svg';
import {
  applyJobSelections,
  getSelectedJobGroups,
  getCategoryOnlySelection,
} from '../utils/jobCategorySelection';

function JobCategoryFilter({
  width,
  overlay,
  filterParams,
}: { width?: number; overlay?: boolean; filterParams?: FilterParams } = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useFilterParams(filterParams);
  const [draftCategory, setDraftCategory] = useState('전체');
  const [draftSubcategories, setDraftSubcategories] = useState<string[]>([]);

  const appliedGroups = getSelectedJobGroups(searchParams);
  const appliedSubcategories = appliedGroups.flatMap((group) => group.selected);

  const categoryOnly = getCategoryOnlySelection(searchParams);
  const isCategoryAllApplied = categoryOnly !== null;
  const isApplied = isCategoryAllApplied || appliedSubcategories.length > 0;
  const appliedCategory = categoryOnly ?? appliedGroups[0]?.name ?? '전체';

  const label = !isApplied
    ? '업직종'
    : isCategoryAllApplied
      ? `${appliedCategory} 전체`
      : appliedGroups.length === 1 &&
          appliedSubcategories.length === appliedGroups[0].options.length
        ? `${appliedCategory} 전체`
        : `${appliedSubcategories[0]}${
            appliedSubcategories.length > 1 ? ` 외 ${appliedSubcategories.length - 1}` : ''
          }`;

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) {
      setDraftCategory(appliedCategory);
      setDraftSubcategories([...appliedSubcategories]);
    }
    setIsOpen(nextOpen);
  }

  const selectedCategory = JOB_CATEGORIES.find((category) => category.name === draftCategory);

  const subcategories: string[] = (selectedCategory?.subcategories ?? []).filter(
    (subcategory) => subcategory !== '전체',
  );

  function handleSubcategoryChange(subcategory: string, checked: boolean) {
    setDraftSubcategories((prev) =>
      checked ? [...new Set([...prev, subcategory])] : prev.filter((item) => item !== subcategory),
    );
  }

  function handleApply() {
    setSearchParams((prev) => applyJobSelections(prev, draftCategory, draftSubcategories));

    setIsOpen(false);
  }

  return (
    <Dropdown
      width={width}
      overlay={overlay}
      label={label}
      icon={jobOffIcon}
      appliedIcon={jobOnIcon}
      isApplied={isApplied}
      open={isOpen}
      onOpenChange={handleOpenChange}
    >
      <DropdownRegionJob
        onCancel={() => setIsOpen(false)}
        onApply={handleApply}
        leftTitle="업직종"
        rightTitle="세부 업직종"
        leftContent={
          <div>
            {jobCategories.map((category) => (
              <SelectListItem
                key={category}
                label={category}
                isSelected={draftCategory === category}
                onSelect={() => {
                  setDraftCategory(category);

                  if (category === '전체') {
                    setDraftSubcategories([]);
                  }
                }}
              />
            ))}
          </div>
        }
        rightContent={
          <div>
            {subcategories.map((subcategory) => (
              <div key={subcategory} className="px-[8px] py-[10px]">
                <Checkbox
                  label={subcategory}
                  checked={draftSubcategories.includes(subcategory)}
                  onChange={(checked) => handleSubcategoryChange(subcategory, checked)}
                />
              </div>
            ))}
          </div>
        }
      />
    </Dropdown>
  );
}

export default JobCategoryFilter;
