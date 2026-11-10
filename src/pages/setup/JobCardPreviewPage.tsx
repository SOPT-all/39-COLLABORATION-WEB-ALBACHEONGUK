import JobCard from '../../components/JobCard.tsx';
import type { JobCardData } from '../../components/JobCard.tsx';

const PREVIEW_NOW = new Date('2026-11-10T12:00:00+09:00');

function createPreviewImage(color: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="259" height="200"><rect width="100%" height="100%" fill="${color}"/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const previewJobs: { label: string; job: JobCardData }[] = [
  {
    label: '기본 · 월급',
    job: {
      id: '1',
      title: '뉴뉴 하우스 성수역점 직원 모집',
      address: '서울 성동구 성수이로 93',
      salaryType: '월급',
      salaryText: '3,120,000',
      postedAt: '2026-11-07',
      imageUrl: createPreviewImage('#c9b79c'),
    },
  },
  {
    label: '시급',
    job: {
      id: '2',
      title: 'CU 신촌피어점 알바 급구',
      address: '서울 마포구 서강로 75-16',
      salaryType: '시급',
      salaryText: '10,320',
      postedAt: '2026-11-10',
      imageUrl: createPreviewImage('#a7c7a1'),
    },
  },
  {
    label: '연봉',
    job: {
      id: '3',
      title: 'ABC 마트 동대문점 직원 모집',
      address: '서울 중구 을지로 264',
      salaryType: '연봉',
      salaryText: '25,882,560',
      postedAt: '2026-10-10',
      imageUrl: createPreviewImage('#f5d76e'),
    },
  },
  {
    label: '긴 제목·주소 (... 처리)',
    job: {
      id: '4',
      title: '하이디라오 청량리 오픈 멤버 주말 홀서빙 및 주방 보조 직원 모집합니다',
      address: '서울 동대문구 왕산로 200 청량리역 롯데캐슬 SKY-L65 지하 1층 101호',
      salaryType: '시급',
      salaryText: '12,400',
      postedAt: '2026-11-07',
      imageUrl: createPreviewImage('#d98c7a'),
    },
  },
  {
    label: '사진 없음',
    job: {
      id: '5',
      title: '다이소 신길점 파트타이머 모집',
      address: '서울 영등포구 가마산로 476',
      salaryType: '월급',
      salaryText: '2,156,880',
      postedAt: '2026-11-07',
    },
  },
  {
    label: '사진 불러오기 실패',
    job: {
      id: '6',
      title: '웅진씽크빅 선생님 모집',
      address: '서울 양천구 목동로 234',
      salaryType: '월급',
      salaryText: '3,000,000',
      postedAt: '2026-11-07',
      imageUrl: '/not-found-image.png',
    },
  },
  {
    label: '급여 협의',
    job: {
      id: '7',
      title: '맥도날드 마리오점 매니저 모집',
      address: '서울 금천구 디지털로 185',
      salaryType: '월급',
      salaryText: '',
      postedAt: '2026-11-07',
      imageUrl: createPreviewImage('#e3a857'),
    },
  },
];

function JobCardPreviewPage() {
  return (
    <section aria-label="공고 카드 미리보기">
      <h1 className="text-display-24sb mb-2">공고 카드 미리보기</h1>
      <p className="text-body-14r text-alba-gray-500 mb-8">
        카드에 마우스를 올리면 hover 상태를 확인할 수 있습니다. 개발용 화면입니다.
      </p>
      <ul className="grid grid-cols-[repeat(auto-fill,297px)] gap-6">
        {previewJobs.map(({ label, job }) => (
          <li key={job.id}>
            <p className="text-caption-12b text-alba-gray-500 mb-2">{label}</p>
            <JobCard job={job} referenceNow={PREVIEW_NOW} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default JobCardPreviewPage;
