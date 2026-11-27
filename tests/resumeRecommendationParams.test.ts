import assert from 'node:assert/strict';
import test from 'node:test';
import { mapResumeRecommendationParams } from '../src/pages/search/resumeRecommendationParams.ts';
import type { JobFilterOptions } from '../src/apis/searchJobs.ts';

const options: JobFilterOptions = {
  regions: [
    { code: '11', name: '서울', parentCode: null },
    { code: '11200', name: '성동구', parentCode: '11' },
  ],
  categories: [
    { code: '1', name: '외식·음료', parentCode: null },
    { code: '101', name: '카페', parentCode: '1' },
  ],
  payConditions: [{ code: 'PER_TASK', name: '건별' }],
  workdays: [
    { code: 'MON', name: '월요일' },
    { code: 'FRI', name: '금요일' },
  ],
};

test('화면 검색 조건을 추천 API 계약으로 변환한다', () => {
  const params = new URLSearchParams(
    'keyword= 카페 &sido=서울&gugun=성동구&jobCategory=외식·음료&jobSubcategory=커피전문점&days=월&days=금&workDays=주3일&period=1개월~3개월&pay=건별',
  );
  const before = params.toString();
  assert.deepEqual(mapResumeRecommendationParams(params, options, 2), {
    keyword: '카페',
    resumeId: 2,
    regionIds: [11200],
    categoryCodes: ['101'],
    workdays: ['MON', 'FRI'],
    daysPerWeek: 3,
    workPeriod: 'ONE_TO_THREE_MONTHS',
    payType: 'PER_CASE',
  });
  assert.equal(params.toString(), before);
});

test('정렬·토글·페이지는 추천 요청에 섞지 않는다', () => {
  const original = mapResumeRecommendationParams(new URLSearchParams('keyword=카페'), options, 1);
  assert.deepEqual(
    mapResumeRecommendationParams(
      new URLSearchParams('keyword=카페&sort=latest&activeOnly=true&page=3&size=50'),
      options,
      1,
    ),
    original,
  );
});

test('서버 옵션 준비 전에도 이력서·검색어·근무일수는 보존한다', () => {
  const data = mapResumeRecommendationParams(
    new URLSearchParams({ keyword: 'a'.repeat(40), workDays: '주2일' }),
    undefined,
    2,
  );
  assert.equal(data.keyword?.length, 30);
  assert.equal(data.resumeId, 2);
  assert.equal(data.daysPerWeek, 2);
  assert.equal(data.regionIds, undefined);
});

test('전체·잘못된 근무일수와 미지원 급여 코드는 요청에서 제외한다', () => {
  const data = mapResumeRecommendationParams(new URLSearchParams('workDays=주9일&pay=건별'), {
    ...options,
    payConditions: [{ code: 'UNKNOWN', name: '건별' }],
  });
  assert.equal(data.daysPerWeek, undefined);
  assert.equal(data.payType, undefined);
});
