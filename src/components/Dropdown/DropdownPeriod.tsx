import { useState } from 'react';
import Radio from '../Radio';
import DropdownPanel from './DropdownPanel';
import type { ReactNode } from 'react';
import Checkbox from '../Checkbox';
import RectButton from '../RectButton';
import TextImage from '../TextImage';
import cancelText from '../../assets/text/button/cancel.svg';
import applyText from '../../assets/text/button/apply.svg';
import { periods, days, workDays } from '../../data/workConditionOptions';

type FilterSectionProps = {
  title: string;
  children: ReactNode;
  isFirst?: boolean;
};

export type WorkCondition = {
  period: string;
  days: string[];
  workDays: string;
};

type DropdownPeriodProps = {
  appliedCondition: WorkCondition;
  onCancel: () => void;
  onApply: (condition: WorkCondition) => void;
};

function FilterSection({ title, children, isFirst = false }: FilterSectionProps) {
  return (
    <section>
      <h2
        className={`py-[12px] border-alba-gray-300 bg-alba-gray-200 text-center text-body-16b ${
          isFirst ? 'border-b' : 'border-y'
        }`}
      >
        {title}
      </h2>

      <div className="grid grid-cols-2 p-[12px]">{children}</div>
    </section>
  );
}

function DropdownPeriod({ appliedCondition, onCancel, onApply }: DropdownPeriodProps) {
  const [draftPeriod, setDraftPeriod] = useState(appliedCondition.period);
  const [draftWorkDays, setDraftWorkDays] = useState(appliedCondition.workDays);
  const [draftDays, setDraftDays] = useState<string[]>(appliedCondition.days);

  function handleDayChange(day: string, checked: boolean) {
    if (day === '전체') {
      setDraftDays([]);
      return;
    }
    if (checked) {
      setDraftDays((prev) => [...prev, day]);
    } else {
      setDraftDays((prev) => prev.filter((selectedDay) => selectedDay !== day));
    }
  }

  return (
    <DropdownPanel variant="period">
      <div className="h-[420px] shrink-0 overflow-y-auto dropdown-scroll">
        <FilterSection title="근무기간" isFirst>
          {periods.map((period) => (
            <div key={period} className="flex items-center py-[10px] px-[8px] gap-[8px]">
              <Radio
                label={period}
                name="work-period"
                checked={draftPeriod === period}
                onChange={() => setDraftPeriod(period)}
              />
            </div>
          ))}
        </FilterSection>

        <FilterSection title="근무요일">
          {days.map((day) => (
            <div key={day} className="flex items-center py-[10px] px-[8px] gap-[8px]">
              <Checkbox
                label={day}
                checked={day === '전체' ? draftDays.length === 0 : draftDays.includes(day)}
                onChange={(checked) => handleDayChange(day, checked)}
              />
            </div>
          ))}
        </FilterSection>

        <FilterSection title="근무일수">
          {workDays.map((workday) => (
            <div
              key={workday}
              className={`flex items-center py-[10px] px-[8px] gap-[8px] ${
                workday === '전체' ? 'col-span-2' : ''
              }`}
            >
              <Radio
                label={workday}
                name="work-days"
                checked={draftWorkDays === workday}
                onChange={() => setDraftWorkDays(workday)}
              />
            </div>
          ))}
        </FilterSection>
      </div>

      <div className="flex items-center justify-center gap-[4px] h-[87px] shrink-0 py-[20px] border-t border-t-alba-gray-300">
        <div className="w-[148px]">
          <RectButton variant="secondary" isFullWidth onClick={onCancel}>
            <TextImage src={cancelText} label="취소" width={29} height={24} />
          </RectButton>
        </div>

        <div className="w-[148px]">
          <RectButton
            variant="primary"
            isFullWidth
            onClick={() =>
              onApply({
                period: draftPeriod,
                days: draftDays,
                workDays: draftWorkDays,
              })
            }
          >
            <TextImage src={applyText} label="적용" width={29} height={24} />
          </RectButton>
        </div>
      </div>
    </DropdownPanel>
  );
}

export default DropdownPeriod;
