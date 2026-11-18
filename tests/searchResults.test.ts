import assert from 'node:assert/strict';
import { test } from 'node:test';
import { filterSearchJobs, SEARCH_JOBS, sortSearchJobs } from '../src/pages/search/searchJobs.ts';
import { readSearchPage } from '../src/pages/search/searchResultOptions.ts';
import { matchesWorkCondition } from '../src/utils/workConditionSelection.ts';

test('검색어 특수문자를 무시하고 진행 중 여부를 함께 적용한다', () => {
  const params = new URLSearchParams({ keyword: ' 카페! ', activeOnly: 'true' });
  assert.deepEqual(
    filterSearchJobs(SEARCH_JOBS, params).map(({ job }) => job.id),
    ['search-mock-cafe'],
  );
});

test('정확도순은 같은 구간에서 제목이 맞는 공고를 먼저 표시하고 최신순은 날짜로 정렬한다', () => {
  const [premium, , regular] = SEARCH_JOBS;
  const titleMatch = { ...regular, job: { ...regular.job, id: '1', title: '카페 알바' } };
  const companyMatch = {
    ...regular,
    job: {
      ...regular.job,
      id: '2',
      title: '알바',
      companyName: '카페 기업',
      postedAt: '2026-11-15',
    },
  };
  const getIds = (items: typeof SEARCH_JOBS) => items.map(({ job }) => job.id);
  const input = [companyMatch, titleMatch, premium];
  assert.deepEqual(getIds(sortSearchJobs(input, '카페', 'relevance')), [premium.job.id, '1', '2']);
  assert.deepEqual(getIds(sortSearchJobs(input, '', 'relevance')), [premium.job.id, '2', '1']);
  assert.deepEqual(
    getIds(
      sortSearchJobs(
        [titleMatch, { ...companyMatch, job: { ...companyMatch.job, companyName: '카페' } }],
        '카페',
        'relevance',
      ),
    ),
    ['2', '1'],
  );
});

test('페이지를 복원하고 범위를 벗어나면 마지막 페이지로 보정한다', () => {
  const jobs = Array.from({ length: 45 }, (_, index) => index + 1);
  const second = readSearchPage(jobs, 20, '2');
  assert.equal(second.pageCount, 3);
  assert.deepEqual([second.items[0], second.items.at(-1)], [21, 40]);
  assert.deepEqual(readSearchPage(jobs, 20, '99').items, [41, 42, 43, 44, 45]);
  assert.deepEqual(readSearchPage([], 20, '2'), { page: 1, pageCount: 0, items: [] });
});

test('근무일수와 요일을 함께 고르면 더 짧은 요일 목록이 긴 목록에 모두 포함되어야 한다', () => {
  assert.equal(
    matchesWorkCondition(
      { period: '전체', days: ['월', '수'], workDays: '주3일' },
      { period: '1일', days: ['월', '수', '금'] },
    ),
    true,
  );
  assert.equal(
    matchesWorkCondition(
      { period: '전체', days: ['월', '수'], workDays: '주3일' },
      { period: '1일', days: ['월', '금', '토'] },
    ),
    false,
  );
  assert.equal(
    matchesWorkCondition(
      { period: '전체', days: ['화', '수', '목', '금', '토'], workDays: '주1일' },
      { period: '1일', days: ['토'] },
    ),
    true,
  );
});

test('서버 근무기간의 공백을 정리하고 선택한 기간과 비교한다', () => {
  const condition = { period: '1년이상', days: [], workDays: '전체' };
  assert.equal(matchesWorkCondition(condition, { period: '1년 이상', days: [] }), true);
  assert.equal(matchesWorkCondition(condition, { period: '1일', days: [] }), false);
});
