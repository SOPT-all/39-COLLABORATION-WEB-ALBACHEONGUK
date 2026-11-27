import type { ResumeSummary } from '../types/resumeRecommendation.ts';

// QA 재현용 이력서. 서버 더미데이터 R001~R003의 식별자·제목·상태를 유지합니다.
// 추천 없음·로딩·오류 여부만 각 QA 시나리오에서 강제로 재현합니다.
export const QA_RESUMES: ResumeSummary[] = [
  {
    resumeId: 1,
    title: '카페 바리스타 지원용',
    status: 'COMPLETED',
    modifiedAt: '2026-11-12T20:10:00',
    desiredRegionNames: ['서울 성동구'],
  },
  {
    resumeId: 2,
    title: '주말 편의점 알바용',
    status: 'COMPLETED',
    modifiedAt: '2026-11-08T14:30:00',
    desiredRegionNames: ['서울 광진구'],
  },
  {
    resumeId: 3,
    title: '강남 사무 보조 지원서',
    status: 'DRAFT',
    modifiedAt: '2026-11-13T09:00:00',
    desiredRegionNames: ['서울 강남구'],
  },
];
