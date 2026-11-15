import DropdownSelect from '../../components/Dropdown/DropdownSelect.tsx';
import JobCategoryFilter from '../../components/JobCategoryFilter';
import WorkConditionFilter from '../../components/WorkConditionFilter';
import RegionFilter from '../../components/RegionFilter.tsx';
import MoneyFilter from '../../components/Dropdown/MoneyFilter';

const SORT_OPTIONS = ['정확도순', '최신순'];
const PAGE_SIZE_OPTIONS = ['20개씩 보기', '30개씩 보기', '50개씩 보기'];

function DropdownPreviewPage() {
  return (
    <div className="flex flex-col gap-10 text-alba-black">
      <header className="flex flex-col gap-2">
        <h1 className="text-display-24sb">드롭다운 확인</h1>
        <p className="text-body-14r">
          업직종은 선택·취소·적용과 URL 저장을 확인합니다. 다른 필터 패널은 레이아웃 확인용입니다.
        </p>
      </header>

      <div className="flex flex-wrap items-start gap-8">
        <section className="flex flex-col items-start gap-4">
          <h2 className="text-title-18sb">지역 필터</h2>
          <RegionFilter />
        </section>

        <section className="flex flex-col items-start gap-4">
          <h2 className="text-title-18sb">업직종 패널</h2>
          <JobCategoryFilter />
        </section>

        <section className="flex flex-col items-start gap-4">
          <h2 className="text-title-18sb">근무조건 패널</h2>
          <WorkConditionFilter />
        </section>

        <section className="flex flex-col items-start gap-4">
          <h2 className="text-title-18sb">급여 패널</h2>
          <MoneyFilter />
        </section>
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
            <DropdownSelect
              options={SORT_OPTIONS}
              onChange={(value) => console.log('선택한 정렬:', value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-body-16b">표시 개수</h3>
            <DropdownSelect
              variant="pageSize"
              options={PAGE_SIZE_OPTIONS}
              onChange={(value) => console.log('선택한 표시 개수:', value)}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default DropdownPreviewPage;
