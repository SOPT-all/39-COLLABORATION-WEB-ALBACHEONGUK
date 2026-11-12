import { useState } from 'react';
import type { ReactNode } from 'react';

import regionOffIcon from '../../assets/icons/region-off.svg';
import regionOnIcon from '../../assets/icons/region-on.svg';
import periodOffIcon from '../../assets/icons/period-off.svg';
import periodOnIcon from '../../assets/icons/period_on.svg';
import moneyOffIcon from '../../assets/icons/money-off.svg';
import moneyOnIcon from '../../assets/icons/money-on.svg';
import Dropdown from '../../components/Dropdown/Dropdown.tsx';
import DropdownRegionJob from '../../components/Dropdown/DropdownRegionJob.tsx';
import DropdownPeriod from '../../components/Dropdown/DropdownPeriod.tsx';
import DropdownMoney from '../../components/Dropdown/DropdownMoney.tsx';
import DropdownSelect from '../../components/Dropdown/DropdownSelect.tsx';

const SORT_OPTIONS = ['정확도순', '최신순'];
const PAGE_SIZE_OPTIONS = ['20개씩 보기', '30개씩 보기', '50개씩 보기'];

type FilterPreviewProps = {
  title: string;
  label: string;
  icon: string;
  appliedIcon: string;
  children: ReactNode;
};

function FilterPreview({ title, label, icon, appliedIcon, children }: FilterPreviewProps) {
  const [isApplied, setIsApplied] = useState(false);

  return (
    <section className="flex flex-col items-start gap-4">
      <h2 className="text-title-18sb">{title}</h2>
      <label className="flex items-center gap-2 text-body-14r">
        <input
          type="checkbox"
          checked={isApplied}
          onChange={(event) => setIsApplied(event.target.checked)}
        />
        적용된 버튼 스타일 확인 (실제 필터 적용 아님)
      </label>
      <Dropdown label={label} icon={icon} appliedIcon={appliedIcon} isApplied={isApplied}>
        {children}
      </Dropdown>
    </section>
  );
}

function DropdownPreviewPage() {
  const [sort, setSort] = useState('정확도순');
  const [pageSize, setPageSize] = useState('20개씩 보기');

  return (
    <div className="flex flex-col gap-10 text-alba-black">
      <header className="flex flex-col gap-2">
        <h1 className="text-display-24sb">드롭다운 확인</h1>
        <p className="text-body-14r">
          버튼 열기·닫기, 화살표, hover·적용 스타일, 내부 스크롤을 확인합니다. 필터 내부 항목은 임시
          표시이며 선택·취소·적용은 아직 연결하지 않았습니다.
        </p>
      </header>
      <div className="flex flex-wrap items-start gap-8">
        <FilterPreview
          title="지역 패널"
          label="지역"
          icon={regionOffIcon}
          appliedIcon={regionOnIcon}
        >
          <DropdownRegionJob />
        </FilterPreview>
        <FilterPreview
          title="근무조건 패널"
          label="근무시간"
          icon={periodOffIcon}
          appliedIcon={periodOnIcon}
        >
          <DropdownPeriod />
        </FilterPreview>
        <FilterPreview
          title="급여 패널"
          label="급여조건"
          icon={moneyOffIcon}
          appliedIcon={moneyOnIcon}
        >
          <DropdownMoney />
        </FilterPreview>
      </div>
      <section className="flex flex-col gap-4">
        <h2 className="text-title-18sb">정렬·표시 개수</h2>
        <p className="text-body-14r">
          항목을 선택하면 버튼 글자·선택 배경·체크가 바뀌고 목록이 닫힙니다. 두 목록의 선택은 서로
          독립적이며 실제 공고 조회에는 연결되지 않습니다.
        </p>
        <div className="flex flex-wrap items-start gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-body-16b">정렬</h3>
            <DropdownSelect options={SORT_OPTIONS} onChange={setSort} />
            <p className="text-body-14r">선택값: {sort}</p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-body-16b">표시 개수</h3>
            <DropdownSelect variant="pageSize" options={PAGE_SIZE_OPTIONS} onChange={setPageSize} />
            <p className="text-body-14r">선택값: {pageSize}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DropdownPreviewPage;
