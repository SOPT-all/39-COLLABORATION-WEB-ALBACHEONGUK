import assert from 'node:assert/strict';
import test from 'node:test';
import { getQaResumeRecommendation } from '../src/utils/qaResumeRecommendation.ts';

test('이력서 없음 QA는 선택값과 이력서 목록을 비운다', () => {
  assert.deepEqual(getQaResumeRecommendation('no-resume'), {
    status: 'NO_RESUME',
    selectedResume: null,
    resumes: [],
    jobs: [],
  });
});

test('작성 중 QA는 서버 R003의 제목과 DRAFT 상태를 사용한다', () => {
  const data = getQaResumeRecommendation('draft-resume');
  assert.equal(data?.selectedResume?.resumeId, 3);
  assert.equal(data?.selectedResume?.title, '강남 사무 보조 지원서');
  assert.equal(data?.selectedResume?.status, 'DRAFT');
  assert.deepEqual(
    data?.resumes.map((resume) => resume.resumeId),
    [3],
  );
  assert.deepEqual(data?.jobs, []);
});

test('추천 없음 QA에서도 R001·R002를 바꿔 선택할 수 있다', () => {
  const first = getQaResumeRecommendation('no-match');
  const second = getQaResumeRecommendation('no-match', 2);
  assert.equal(first?.selectedResume?.title, '카페 바리스타 지원용');
  assert.equal(second?.selectedResume?.title, '주말 편의점 알바용');
  assert.deepEqual(second?.selectedResume?.desiredRegionNames, ['서울 광진구']);
  assert.equal(second?.status, 'NO_RECOMMENDATION');
  assert.deepEqual(
    second?.resumes.map((resume) => resume.resumeId),
    [1, 2],
  );
  assert.deepEqual(second?.jobs, []);
  assert.equal(getQaResumeRecommendation('no-match', 3)?.selectedResume?.resumeId, 1);
});

test('일반·비회원·알 수 없는 상태에서는 QA 응답을 덮어쓰지 않는다', () => {
  for (const value of [null, 'guest', 'invalid']) {
    assert.equal(getQaResumeRecommendation(value), undefined);
  }
});
