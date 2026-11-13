import DropdownPanel from './DropdownPanel';
import radioIcon from '../../assets/icons/radio-off.svg';
import checkboxIcon from '../../assets/icons/checkbox-off.svg';
import type { ReactNode } from 'react';

type FilterSectionProps = {
  title: string;
  children: ReactNode;
  isFirst?: boolean;
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

function DropdownPeriod() {
  const periods = [
    '전체',
    '1일',
    '1주일이하',
    '1주일~1개월',
    '1개월~3개월',
    '3개월~6개월',
    '6개월~1년',
    '1년이상',
  ];

  const days = ['전체', '월', '화', '수', '목', '금', '토', '일'];

  const workDays = ['전체', '주6일', '주5일', '주4일', '주3일', '주2일', '주1일'];

  return (
    <DropdownPanel variant="period">
      <div className="h-[420px] shrink-0 overflow-y-auto dropdown-scroll">
        <FilterSection title="근무기간" isFirst>
          {periods.map((period) => (
            <div key={period} className="flex items-center py-[10px] px-[8px] gap-[8px]">
              {/* 근무기간 라디오 컴포넌트 */}
              <img src={radioIcon} alt="" className="size-[24px] shrink-0" />
              <span className="text-body-16r">{period}</span>
            </div>
          ))}
        </FilterSection>

        <FilterSection title="근무요일">
          {days.map((day) => (
            <div key={day} className="flex items-center py-[10px] px-[8px] gap-[8px]">
              <img src={checkboxIcon} alt="" className="size-[24px] shrink-0" />
              <span className="text-body-16r">{day}</span>
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
              <img src={radioIcon} alt="" className="size-[24px] shrink-0" />
              <span className="text-body-16r">{workday}</span>
            </div>
          ))}
        </FilterSection>
      </div>

      <div className="h-[87px] shrink-0 py-[20px] border-t border-t-alba-gray-300">
        {/* 취소·적용 버튼 */}
      </div>
    </DropdownPanel>
  );
}

export default DropdownPeriod;
