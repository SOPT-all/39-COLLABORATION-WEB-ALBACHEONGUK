import DropdownPanel from './DropdownPanel';
import checkIcon from '../../assets/icons/check.svg';
import checkboxIcon from '../../assets/icons/checkbox-off.svg';
import type { ReactNode } from 'react';

type RegionColumnProps = {
  title: string;
  children: ReactNode;
};

function RegionColumn({ title, children }: RegionColumnProps) {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <p className="bg-alba-gray-200 text-center py-[12px] border-b border-alba-gray-300 text-body-16b">
        {title}
      </p>

      <div className="h-[240px] overflow-y-auto dropdown-scroll">{children}</div>
    </div>
  );
}

function DropdownRegionJob() {
  const cities = ['전체', '서울', '부산', '대구', '인천', '대전', '광주'];
  const districts = ['전체', '강남구', '강동구', '강북구', '강서구', '관악구'];

  return (
    <DropdownPanel variant="regionJob">
      <div className="flex shrink-0 divide-x divide-alba-gray-300">
        <RegionColumn title="시·도">
          <div className="flex flex-col">
            {cities.map((city) => (
              <button
                key={city}
                type="button"
                // 시,도 선택 구현 필요
                className={`flex shrink-0 items-center gap-[8px] pl-[16px] pr-[12px] py-[12px] text-left ${
                  city === '서울'
                    ? 'bg-alba-blue-100 text-alba-blue-700 font-bold'
                    : 'bg-alba-white'
                }`}
              >
                <span className="flex-1">{city}</span>

                {city === '서울' && <img src={checkIcon} alt="" className="size-[20px] shrink-0" />}
              </button>
            ))}
          </div>
        </RegionColumn>

        <RegionColumn title="구·군">
          <div className="py-[8px]">
            {districts.map((district) => (
              <div
                key={district}
                className="flex items-center gap-[8px] px-[8px] py-[10px] bg-alba-white"
              >
                {/* 체크박스 컴포넌트 (oo구) */}
                <img src={checkboxIcon} alt="" className="size-[24px] shrink-0" />
                <span>{district}</span>
              </div>
            ))}
          </div>
        </RegionColumn>
      </div>
      <div className="h-[87px] shrink-0 border-t border-t-alba-gray-300 py-[20px]">
        {/* 취소·적용 버튼을 넣을 자리 */}
      </div>
    </DropdownPanel>
  );
}

export default DropdownRegionJob;
