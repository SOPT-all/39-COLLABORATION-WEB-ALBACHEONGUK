import { useState } from 'react';

import chevronLeftIcon from '../../../assets/icons/recommend/chevron-left.svg';
import chevronRightIcon from '../../../assets/icons/recommend/chevron-right.svg';
import SelectChip from '../../../components/SelectChip.tsx';

import type { ChipOption } from './recommendChips.ts';

const FIRST_PAGE_CHIP_COUNT = 11;

type RegionChipSliderProps = {
  options: ChipOption[];
  selectedLabel: string;
  onSelect: (label: string) => void;
};

function RegionChipSlider({ options, selectedLabel, onSelect }: RegionChipSliderProps) {
  const [isSecondPage, setIsSecondPage] = useState(false);
  const pages = [options.slice(0, FIRST_PAGE_CHIP_COUNT), options.slice(FIRST_PAGE_CHIP_COUNT)];

  return (
    <div className="flex items-center gap-[5px]">
      <div className="h-[50px] w-[1157px] shrink-0 overflow-clip">
        <div className={`flex w-max gap-5 ${isSecondPage ? '-translate-x-[1177px]' : ''}`}>
          {pages.map((pageOptions, pageIndex) => (
            <div
              key={pageIndex}
              className="flex gap-5"
              inert={pageIndex !== (isSecondPage ? 1 : 0)}
            >
              {pageOptions.map((option) => (
                <SelectChip
                  key={option.label}
                  label={option.label}
                  isSelected={selectedLabel === option.label}
                  onSelect={() => onSelect(option.label)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        aria-label={isSecondPage ? '이전 지역 보기' : '다음 지역 보기'}
        onClick={() => setIsSecondPage((prev) => !prev)}
        className="bg-alba-white focus-visible:outline-alba-blue-600 flex h-[50px] w-10 shrink-0 cursor-pointer items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <img
          src={isSecondPage ? chevronLeftIcon : chevronRightIcon}
          alt=""
          width={10}
          height={24}
        />
      </button>
    </div>
  );
}

export default RegionChipSlider;
