import { useState } from 'react';
import DropdownRegionJob from './Dropdown/DropdownRegionJob';
import SelectListItem from './SelectListItem';
import { JOB_CATEGORIES, jobCategories } from '../data/jobCategoryOptions';
import Checkbox from './Checkbox';
import { useSearchParams } from 'react-router';
import Dropdown from './Dropdown/Dropdown';
import jobOffIcon from '../assets/icons/job-off.svg';
import jobOnIcon from '../assets/icons/job-on.svg';
import { applyJobSelections, getSelectedJobGroups } from '../utils/jobCategorySelection';

function JobCategoryFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [draftCategory, setDraftCategory] = useState('전체');
  const [draftSubcategories, setDraftSubcategories] = useState<string[]>([]);

  const appliedGroups = getSelectedJobGroups(searchParams);
  const appliedSubcategories = appliedGroups.flatMap((group) => group.selected);
  const isApplied = appliedSubcategories.length > 0;
  const appliedCategory = appliedGroups[0]?.name ?? '전체';
  const label = !isApplied
    ? '업직종'
    : appliedGroups.length === 1 && appliedSubcategories.length === appliedGroups[0].options.length
      ? `${appliedCategory} 전체`
      : `${appliedSubcategories[0]}${appliedSubcategories.length > 1 ? ` 외 ${appliedSubcategories.length - 1}` : ''}`;

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

  const isAllChecked =
    subcategories.length > 0 &&
    subcategories.every((subcategory) => draftSubcategories.includes(subcategory));

  function handleSubcategoryChange(subcategory: string, checked: boolean) {
    setDraftSubcategories((prev) =>
      checked ? [...new Set([...prev, subcategory])] : prev.filter((item) => item !== subcategory),
    );
  }

  function handleApply() {
    setSearchParams((prev) => applyJobSelections(prev, draftSubcategories));
    setIsOpen(false);
  }

  return (
    <Dropdown
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
                  if (category === '전체') setDraftSubcategories([]);
                }}
              />
            ))}
          </div>
        }
        rightContent={
          <div>
            {selectedCategory && (
              <>
                <div className="px-[8px] py-[10px]">
                  <Checkbox
                    label="전체"
                    checked={isAllChecked}
                    onChange={(checked) =>
                      setDraftSubcategories((prev) =>
                        checked
                          ? [...new Set([...prev, ...subcategories])]
                          : prev.filter((item) => !subcategories.includes(item)),
                      )
                    }
                  />
                </div>

                {subcategories.map((subcategory) => (
                  <div key={subcategory} className="px-[8px] py-[10px]">
                    <Checkbox
                      label={subcategory}
                      checked={draftSubcategories.includes(subcategory)}
                      onChange={(checked) => handleSubcategoryChange(subcategory, checked)}
                    />
                  </div>
                ))}
              </>
            )}
          </div>
        }
      />
    </Dropdown>
  );
}

export default JobCategoryFilter;
