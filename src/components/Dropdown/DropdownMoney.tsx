import DropdownPanel from './DropdownPanel';
import radioIcon from '../../assets/icons/radio-off.svg';

function DropdownMoney() {
  const payTypes = ['전체', '건별', '시급', '일급', '주급', '월급', '연봉'];

  return (
    <DropdownPanel variant="money">
      <div className="grid grid-cols-2 p-[12px]">
        {payTypes.map((pay) => (
          <div
            key={pay}
            className={`flex items-center py-[10px] px-[8px] gap-[8px]
                ${pay === '전체' ? 'col-span-2' : ''}`}
          >
            <img src={radioIcon} alt="" className="size-[24px] shrink-0" />
            <span className="text-body-16r">{pay}</span>
          </div>
        ))}
      </div>

      <div className="h-[87px] shrink-0 border-t border-alba-gray-300 py-[20px]">
        {/* 취소·적용 버튼 */}
      </div>
    </DropdownPanel>
  );
}

export default DropdownMoney;
