import DropdownActions from './DropdownActions.tsx';
import { useState } from 'react';
import DropdownPanel from './DropdownPanel';
import Radio from '../Radio';
import { PAY_TYPES } from '../../data/payTypes';

type DropdownMoneyProps = {
  appliedPay: string;
  onCancel: () => void;
  onApply: (pay: string) => void;
};

function DropdownMoney({ appliedPay, onCancel, onApply }: DropdownMoneyProps) {
  const [draftPay, setDraftPay] = useState(appliedPay);

  return (
    <DropdownPanel variant="money">
      <div className="grid grid-cols-2 p-[12px]">
        {PAY_TYPES.map((pay) => (
          <div
            key={pay}
            className={`flex items-center py-[10px] px-[8px]
                ${pay === '전체' ? 'col-span-2' : ''}`}
          >
            <Radio
              label={pay}
              name="salary-type"
              checked={draftPay === pay}
              onChange={() => setDraftPay(pay)}
            />
          </div>
        ))}
      </div>

      <DropdownActions onCancel={onCancel} onApply={() => onApply(draftPay)} />
    </DropdownPanel>
  );
}

export default DropdownMoney;
