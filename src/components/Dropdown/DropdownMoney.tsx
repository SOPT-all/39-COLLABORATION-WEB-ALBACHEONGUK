import { useState } from 'react';
import DropdownPanel from './DropdownPanel';
import Radio from '../Radio';
import RectButton from '../RectButton';
import TextImage from '../TextImage';
import applyText from '../../assets/text/button/apply.svg';
import cancelText from '../../assets/text/button/cancel.svg';
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

      <div className="flex h-[87px] items-center justify-center gap-[4px] shrink-0 border-t border-alba-gray-300 py-[20px]">
        <div className="w-[148px]">
          <RectButton variant="secondary" isFullWidth onClick={onCancel}>
            <TextImage src={cancelText} label="취소" width={29} height={24} />
          </RectButton>
        </div>

        <div className="w-[148px]">
          <RectButton variant="primary" isFullWidth onClick={() => onApply(draftPay)}>
            <TextImage src={applyText} label="적용" width={29} height={24} />
          </RectButton>
        </div>
      </div>
    </DropdownPanel>
  );
}

export default DropdownMoney;
