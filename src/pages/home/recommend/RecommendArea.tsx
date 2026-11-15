import { useState } from 'react';

import regionRecommendTitle from '../../../assets/text/recommend/region-recommend.svg';
import targetRecommendTitle from '../../../assets/text/recommend/target-recommend.svg';
import themeRecommendTitle from '../../../assets/text/recommend/theme-recommend.svg';
import SelectChip from '../../../components/SelectChip.tsx';

import RecommendSection from './RecommendSection.tsx';
import RegionChipSlider from './RegionChipSlider.tsx';
import { REGION_OPTIONS, TARGET_OPTIONS, THEME_OPTIONS } from './recommendChips.ts';
import type { ChipOption } from './recommendChips.ts';
import {
  REGION_RECOMMEND_JOBS,
  TARGET_RECOMMEND_JOBS,
  THEME_RECOMMEND_JOBS,
} from './recommendJobs.ts';

type IconChipGroupProps = {
  options: ChipOption[];
  selectedLabel: string;
  onSelect: (label: string) => void;
};

function IconChipGroup({ options, selectedLabel, onSelect }: IconChipGroupProps) {
  return (
    <div className="flex items-center gap-5">
      {options.map((option) => (
        <SelectChip
          key={option.label}
          label={option.label}
          icon={option.icon}
          isSelected={selectedLabel === option.label}
          onSelect={() => onSelect(option.label)}
        />
      ))}
    </div>
  );
}

function RecommendArea() {
  const [selectedRegion, setSelectedRegion] = useState(REGION_OPTIONS[0].label);
  const [selectedTheme, setSelectedTheme] = useState(THEME_OPTIONS[0].label);
  const [selectedTarget, setSelectedTarget] = useState(TARGET_OPTIONS[0].label);

  return (
    <div className="flex flex-col">
      <RecommendSection
        title="지역별 추천 알바"
        titleImage={regionRecommendTitle}
        description="원하는 지역의 알바를 바로 찾아보세요!"
        spacingClassName="gap-[27px] pt-[60px] pb-[60px]"
        chips={
          <RegionChipSlider
            options={REGION_OPTIONS}
            selectedLabel={selectedRegion}
            onSelect={setSelectedRegion}
          />
        }
        jobs={REGION_RECOMMEND_JOBS}
      />
      <RecommendSection
        title="테마별 추천 알바"
        titleImage={themeRecommendTitle}
        description="인기있는 테마로 알바를 찾아보세요!"
        spacingClassName="gap-6 pt-12 pb-[60px]"
        chips={
          <IconChipGroup
            options={THEME_OPTIONS}
            selectedLabel={selectedTheme}
            onSelect={setSelectedTheme}
          />
        }
        jobs={THEME_RECOMMEND_JOBS}
      />
      <RecommendSection
        title="대상별 추천 알바"
        titleImage={targetRecommendTitle}
        description="나에게 딱 맞는 알바를 찾아보세요!"
        spacingClassName="gap-6 pt-12 pb-[124px]"
        chips={
          <IconChipGroup
            options={TARGET_OPTIONS}
            selectedLabel={selectedTarget}
            onSelect={setSelectedTarget}
          />
        }
        jobs={TARGET_RECOMMEND_JOBS}
      />
    </div>
  );
}

export default RecommendArea;
