import { useState } from 'react';
import Dropdown from './Dropdown/Dropdown';
import DropdownPeriod from './Dropdown/DropdownPeriod';
import periodOffIcon from '../assets/icons/period-off.svg';
import periodOnIcon from '../assets/icons/period_on.svg';
import { useSearchParams } from 'react-router';
import { readWorkCondition, writeWorkCondition } from '../utils/workConditionSelection.ts';
import type { WorkCondition } from '../utils/workConditionSelection.ts';

function WorkConditionFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const appliedCondition = readWorkCondition(searchParams);

  const selectedLabels = [
    ...(appliedCondition.period !== '전체' ? [appliedCondition.period] : []),
    ...appliedCondition.days,
    ...(appliedCondition.workDays !== '전체' ? [appliedCondition.workDays] : []),
  ];

  const hasAppliedCondition = selectedLabels.length > 0;

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
    setSearchParams((params) => writeWorkCondition(params, condition));
    setIsOpen(false);
  }

  return (
    <Dropdown
      label={buttonLabel}
      icon={periodOffIcon}
      open={isOpen}
      appliedIcon={periodOnIcon}
      isApplied={hasAppliedCondition}
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
