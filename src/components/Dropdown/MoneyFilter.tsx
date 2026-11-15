import { useState } from 'react';
import Dropdown from './Dropdown';
import DropdownMoney from './DropdownMoney';
import { useSearchParams } from 'react-router';
import moneyOffIcon from '../../assets/icons/money-off.svg';
import moneyOnIcon from '../../assets/icons/money-on.svg';
import { PAY_TYPES } from '../../data/payTypes';

function MoneyFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const pay = searchParams.get('pay');
  const appliedPay = pay && PAY_TYPES.includes(pay) ? pay : '전체';

  function handleCancel() {
    setIsOpen(false);
  }

  function handleApply(pay: string) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      if (pay === '전체') {
        next.delete('pay');
      } else {
        next.set('pay', pay);
      }

      return next;
    });
    setIsOpen(false);
  }

  return (
    <Dropdown
      label={appliedPay === '전체' ? '급여조건' : appliedPay}
      icon={moneyOffIcon}
      appliedIcon={moneyOnIcon}
      isApplied={appliedPay !== '전체'}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DropdownMoney appliedPay={appliedPay} onCancel={handleCancel} onApply={handleApply} />
    </Dropdown>
  );
}

export default MoneyFilter;
