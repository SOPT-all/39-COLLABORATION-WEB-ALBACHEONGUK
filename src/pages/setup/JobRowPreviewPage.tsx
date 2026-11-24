import { useState } from 'react';

import JobRow from '../../components/JobRow.tsx';
import type { JobRowData, JobRowVariant } from '../../components/JobRow.tsx';
import JobRowDetails from '../../components/JobRowDetails.tsx';
import type { JobRowDetailsData } from '../../components/JobRowDetails.tsx';
import { getJobDeadlineText } from '../../utils/jobDeadline.ts';
import { useScrapStore } from '../../stores/useScrapStore.ts';

const PREVIEW_NOW = new Date('2026-11-10T12:00:00+09:00');

const EXAMPLE_JOB: JobRowData = {
  id: 'job-row-example',
  companyName: '벌툰 아산탕정점',
  location: '충남 아산시 탕정면',
  title: '[벌툰 아산탕정점] 만화카페 파트타이머 모집',
  workDays: '월~금',
  workHours: '18:00~22:00',
  deadlineDate: '2026-11-17',
  postedAt: '2026-11-07',
  isClosed: false,
  salaryType: '시급',
  salaryText: '10,500',
};

// Figma 펼침 패널의 배치 확인용 목데이터입니다. 실제 API 응답이 아닙니다.
const EXAMPLE_DETAILS: JobRowDetailsData = {
  category: '서비스/만화카페',
  address: '충남 아산시 탕정면 매곡중앙로 (상세 주소는 API 연동 시 표시)',
  stations: [{ id: 'tangjeong', line: '1', name: '탕정 0.8km', color: 'blue' }],
  workHours: EXAMPLE_JOB.workHours,
  periodAndDays: `3개월 ~ 6개월, ${EXAMPLE_JOB.workDays}`,
  applicationMethod: '문자지원',
  deadline: getJobDeadlineText(EXAMPLE_JOB.deadlineDate),
};

type JobRowExample = {
  label: string;
  job: JobRowData;
  variant?: JobRowVariant;
  showThumbnail?: boolean;
  details?: JobRowDetailsData;
};

const EXAMPLES: JobRowExample[] = [
  { label: '일반 공고 · 3일 전', job: EXAMPLE_JOB },
  { label: '오늘 등록', job: { ...EXAMPLE_JOB, id: 'posted-today', postedAt: '2026-11-10' } },
  { label: '1달 전 등록', job: { ...EXAMPLE_JOB, id: 'posted-month', postedAt: '2026-10-10' } },
  { label: '1년 전 등록', job: { ...EXAMPLE_JOB, id: 'posted-year', postedAt: '2025-11-10' } },
  { label: '상시모집', job: { ...EXAMPLE_JOB, id: 'always-open', deadlineDate: null } },
  { label: '급여 협의', job: { ...EXAMPLE_JOB, id: 'salary-negotiable', salaryText: '' } },
  { label: '일반 공고 펼침', job: { ...EXAMPLE_JOB, id: 'expanded' } },
  {
    label: '매칭 공고 펼침',
    job: { ...EXAMPLE_JOB, id: 'recommended-expanded' },
    variant: 'recommended',
  },
  {
    label: '강조 공고 · 800px',
    job: { ...EXAMPLE_JOB, id: 'highlighted' },
    variant: 'highlighted',
  },
  {
    label: '사진 없음 · 새 기본 썸네일',
    job: { ...EXAMPLE_JOB, id: 'thumbnail' },
    showThumbnail: true,
  },
  {
    label: '이력서 매칭 공고 · 800px',
    job: { ...EXAMPLE_JOB, id: 'recommended' },
    variant: 'recommended',
  },
  {
    label: '강조·썸네일 공고',
    job: { ...EXAMPLE_JOB, id: 'highlighted-thumbnail' },
    variant: 'highlighted',
    showThumbnail: true,
  },
  {
    label: '이미지 오류 · 새 기본 썸네일',
    // 잘못된 이미지가 전달됐을 때 공통 기본 썸네일로 바뀌는지 확인하는 목데이터입니다.
    job: { ...EXAMPLE_JOB, id: 'broken-thumbnail', thumbnailUrl: 'data:image/png;base64,broken' },
  },
  { label: '일반 마감 공고', job: { ...EXAMPLE_JOB, id: 'closed', isClosed: true } },
  {
    label: '일반 마감 공고 · 펼침',
    job: { ...EXAMPLE_JOB, id: 'closed-expanded', isClosed: true },
  },
  {
    label: '매칭 마감 공고',
    job: { ...EXAMPLE_JOB, id: 'recommended-closed', isClosed: true },
    variant: 'recommended',
  },
  {
    label: '매칭 마감 공고 · 펼침',
    job: { ...EXAMPLE_JOB, id: 'recommended-closed-expanded', isClosed: true },
    variant: 'recommended',
  },
  {
    label: '긴 회사명·지역·근무조건',
    job: {
      ...EXAMPLE_JOB,
      id: 'long-company',
      companyName: '정말 긴 이름을 가진 회사의 여러 지점 중 하나인 탕정점 채용 담당',
      location: '충청남도 아산시 탕정면 아주 긴 이름의 행정구역',
      workDays: '월·화·수·목·금·토·일 중 협의',
      workHours: '오전·오후 시간대 협의 가능',
    },
    showThumbnail: true,
    details: {
      ...EXAMPLE_DETAILS,
      address:
        '충남 아산시 탕정면 매곡중앙로 상세 건물명과 층수, 안내문이 함께 포함되는 아주 긴 주소입니다. '.repeat(
          3,
        ),
    },
  },
  {
    label: '상세 정보 없음',
    job: { ...EXAMPLE_JOB, id: 'empty-details' },
    details: {
      category: '',
      address: '',
      stations: [],
      workHours: '',
      periodAndDays: '',
      applicationMethod: '',
      deadline: '',
    },
  },
  {
    label: '긴 제목',
    job: {
      ...EXAMPLE_JOB,
      id: 'long-title',
      title: '[벌툰 아산탕정점] 주말과 평일 저녁에 함께할 만화카페 파트타이머를 모집합니다',
    },
  },
];

function JobRowPreviewPage() {
  const scrappedJobIds = useScrapStore((state) => state.scrappedJobIds);
  const toggleScrap = useScrapStore((state) => state.toggleScrap);
  const [expandedIds, setExpandedIds] = useState<string[]>([
    'expanded',
    'recommended-expanded',
    'closed-expanded',
    'recommended-closed-expanded',
    'long-company',
    'empty-details',
  ]);
  const [lastAction, setLastAction] = useState('아직 누른 버튼이 없습니다.');

  function handleToggleScrap(id: string) {
    toggleScrap(id);
    setLastAction(`${id}: 스크랩 이벤트`);
  }

  function handleToggleExpand(id: string) {
    setExpandedIds((ids) =>
      ids.includes(id) ? ids.filter((value) => value !== id) : [...ids, id],
    );
    setLastAction(`${id}: 펼치기 이벤트`);
  }

  return (
    <section className="font-pretendard space-y-8 py-6" aria-label="공고 행 확인">
      <div className="space-y-2">
        <h1 className="text-display-24sb">공고 행 컴포넌트</h1>
        <p className="text-body-14r text-alba-gray-500">
          최신 v2.1 SCR-02-09·10·15·16 확인용 목데이터입니다. 날짜 예시는 2026.11.10 기준이며 API는
          연결하지 않았고, 스크랩은 브라우저에 저장되어 새로고침 후에도 유지됩니다.
        </p>
      </div>

      {EXAMPLES.map(({ label, job, variant, showThumbnail, details }) => (
        <section key={job.id} className="space-y-2" aria-label={label}>
          <h2 className="text-body-14b text-alba-gray-700">{label}</h2>
          <div className="overflow-x-auto">
            <div
              className={`w-full min-w-[640px] ${showThumbnail || job.thumbnailUrl || (variant && variant !== 'default') ? 'max-w-[800px]' : 'max-w-[796px]'}`}
            >
              <JobRow
                job={job}
                referenceNow={PREVIEW_NOW}
                variant={variant}
                showThumbnail={showThumbnail}
                isScrapped={scrappedJobIds.includes(job.id)}
                isExpanded={expandedIds.includes(job.id)}
                onToggleScrap={() => handleToggleScrap(job.id)}
                onToggleExpand={() => handleToggleExpand(job.id)}
              >
                <JobRowDetails
                  details={
                    details ?? {
                      ...EXAMPLE_DETAILS,
                      deadline: getJobDeadlineText(job.deadlineDate),
                    }
                  }
                />
              </JobRow>
            </div>
          </div>
        </section>
      ))}

      <p role="status" className="text-body-14r text-alba-gray-500">
        {lastAction}
      </p>
    </section>
  );
}

export default JobRowPreviewPage;
