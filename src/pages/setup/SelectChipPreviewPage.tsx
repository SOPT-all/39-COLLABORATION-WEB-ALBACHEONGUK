import { useState } from 'react';

import SelectChip from '../../components/SelectChip.tsx';
import { REGION_OPTIONS, TARGET_OPTIONS, THEME_OPTIONS } from '../home/recommend/recommendChips.ts';
import type { ChipOption } from '../home/recommend/recommendChips.ts';

type ChipGroupPreviewProps = {
  title: string;
  options: ChipOption[];
};

function ChipGroupPreview({ title, options }: ChipGroupPreviewProps) {
  const [selectedLabel, setSelectedLabel] = useState(options[0].label);

  return (
    <div className="mb-10">
      <h2 className="text-title-18sb mb-1">{title}</h2>
      <p className="text-body-14r text-alba-gray-500 mb-4">선택: {selectedLabel}</p>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <SelectChip
            key={option.label}
            label={option.label}
            icon={option.icon}
            isSelected={selectedLabel === option.label}
            onSelect={() => setSelectedLabel(option.label)}
          />
        ))}
      </div>
    </div>
  );
}

function SelectChipPreviewPage() {
  return (
    <section aria-label="선택 칩 미리보기">
      <h1 className="text-display-24sb mb-2">선택 칩 미리보기</h1>
      <p className="text-body-14r text-alba-gray-500 mb-8">
        칩을 누르면 선택 상태가 바뀌고, 마우스를 올리면 hover 상태를 확인할 수 있습니다. 개발용
        화면입니다.
      </p>
      <ChipGroupPreview title="지역" options={REGION_OPTIONS} />
      <ChipGroupPreview title="테마" options={THEME_OPTIONS} />
      <ChipGroupPreview title="대상" options={TARGET_OPTIONS} />
    </section>
  );
}

export default SelectChipPreviewPage;
