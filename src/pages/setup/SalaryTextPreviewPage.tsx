import SalaryText from '../../components/SalaryText.tsx';
import type { SalaryTextLayout } from '../../components/SalaryText.tsx';

const SALARY_EXAMPLES = [
  { salaryType: '일급', salaryText: '' },
  { salaryType: '월급', salaryText: '3,120,000' },
  { salaryType: '시급', salaryText: '10,500' },
  { salaryType: '연봉', salaryText: '25,882,560' },
];

const LAYOUTS: { layout: SalaryTextLayout; title: string; boxClass: string }[] = [
  { layout: 'horizontal', title: '가로 · 공고 카드', boxClass: 'w-[259px]' },
  { layout: 'vertical', title: '세로 · 공고 행', boxClass: 'w-[122px]' },
];

function SalaryTextPreviewPage() {
  return (
    <section aria-label="급여 표시 미리보기">
      <h1 className="text-display-24sb mb-2">급여 표시 미리보기</h1>
      <p className="text-body-14r text-alba-gray-500 mb-8">
        피그마 txt_salary_type의 급여 유형별 색상과 공고 카드·공고 행 배치를 확인합니다. 로컬 개발
        환경과 Vercel Preview에서만 열리는 확인용 화면입니다.
      </p>

      {LAYOUTS.map(({ layout, title, boxClass }) => (
        <div key={layout} className="mb-10">
          <h2 className="text-title-18sb mb-4">{title}</h2>
          <ul className="flex flex-wrap items-start gap-8">
            {SALARY_EXAMPLES.map((example) => (
              <li key={example.salaryType} className={boxClass}>
                <SalaryText {...example} layout={layout} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

export default SalaryTextPreviewPage;
