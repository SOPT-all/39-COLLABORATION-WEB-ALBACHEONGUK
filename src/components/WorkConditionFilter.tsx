import { useState } from 'react';
import type { WorkCondition } from './Dropdown/DropdownPeriod';
import Dropdown from './Dropdown/Dropdown';
import DropdownPeriod from './Dropdown/DropdownPeriod';
import periodOffIcon from '../assets/icons/period-off.svg';
import periodOnIcon from '../assets/icons/period_on.svg';
import { useSearchParams } from 'react-router';
import { periods, days, workDays } from '../data/workConditionOptions';

function WorkConditionFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const periodFromUrl = searchParams.get('period') ?? '전체';
  const workDaysFromUrl = searchParams.get('workDays') ?? '전체';
  const daysFromUrl = searchParams.getAll('days');

  const appliedCondition: WorkCondition = {
    period: periods.includes(periodFromUrl) ? periodFromUrl : '전체',
    days: days.filter((day) => day !== '전체' && daysFromUrl.includes(day)),
    workDays: workDays.includes(workDaysFromUrl) ? workDaysFromUrl : '전체',
  };

  const selectedLabels = [
    ...(appliedCondition.period !== '전체' ? [appliedCondition.period] : []),
    ...appliedCondition.days,
    ...(appliedCondition.workDays !== '전체' ? [appliedCondition.workDays] : []),
  ];

  const buttonLabel =
    selectedLabels.length === 0
      ? '근무시간'
      : selectedLabels.length === 1
        ? selectedLabels[0]
        : `${selectedLabels[0]} 외 ${selectedLabels.length - 1}`;

  function handleCancel() {
    setIsOpen(false);
  }

  function handleApply(condition: WorkCondition) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      if (condition.period === '전체') {
        next.delete('period');
      } else {
        next.set('period', condition.period);
      }

      next.delete('days');

      condition.days.forEach((day) => {
        next.append('days', day);
      });

      if (condition.workDays === '전체') {
        next.delete('workDays');
      } else {
        next.set('workDays', condition.workDays);
      }

      return next;
    });
    setIsOpen(false);
  }

  return (
    <Dropdown
      label={buttonLabel}
      icon={periodOffIcon}
      open={isOpen}
      appliedIcon={periodOnIcon}
      isApplied={
        appliedCondition.period !== '전체' ||
        appliedCondition.days.length > 0 ||
        appliedCondition.workDays !== '전체'
      }
      onOpenChange={setIsOpen}
    >
      <DropdownPeriod
        appliedCondition={appliedCondition}
        onCancel={handleCancel}
        onApply={handleApply}
      />
    </Dropdown>
  );
}

export default WorkConditionFilter;
