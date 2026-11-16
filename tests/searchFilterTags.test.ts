import assert from 'node:assert/strict';
import test from 'node:test';
import {
  getSearchFilterTags,
  removeSearchFilterTag,
  resetSearchFilters,
} from '../src/pages/search/searchFilterTags.ts';

test('근무일수 태그를 지워도 나머지 검색 조건이 남는다', () => {
  const params = new URLSearchParams(
    'keyword=편의점&days=월&days=금&period=1일&workDays=주5일&pay=시급&page=2',
  );
  const tag = getSearchFilterTags(params).find(({ kind }) => kind === 'workDays');
  assert.deepEqual(tag, { kind: 'workDays', id: '주5일', label: '주5일' });
  assert.ok(tag);
  assert.deepEqual(
    [...removeSearchFilterTag(params, tag)],
    [
      ['keyword', '편의점'],
      ['days', '월'],
      ['days', '금'],
      ['period', '1일'],
      ['pay', '시급'],
    ],
  );
});

test('지역과 업직종 태그를 각각 지우면 같은 필터의 다른 선택이 남는다', () => {
  const params = new URLSearchParams(
    'sido=서울&gugun=강남구&gugun=강동구&jobCategory=외식·음료&jobCategory=유통·판매&jobSubcategory=일반음식점&jobSubcategory=백화점·면세점',
  );
  const tags = getSearchFilterTags(params);
  const district = tags.find(({ kind, id }) => kind === 'region' && id === '강남구');
  const job = tags.find(({ kind, id }) => kind === 'occupation' && id === '일반음식점');
  assert.ok(district);
  assert.ok(job);
  const updated = removeSearchFilterTag(removeSearchFilterTag(params, district), job);
  assert.deepEqual(
    getSearchFilterTags(updated).map(({ label }) => label),
    ['강동구', '백화점·면세점'],
  );
});

test('전체 초기화는 검색어와 정렬을 보존하고 필터와 페이지를 지운다', () => {
  const params = new URLSearchParams(
    'keyword=편의점&sort=latest&page=2&sido=서울&gugun=전체&jobCategory=외식·음료&jobSubcategory=&period=1일&days=월&workDays=주5일&pay=시급',
  );
  assert.ok(getSearchFilterTags(params).some(({ label }) => label === '외식·음료 전체'));
  const updated = resetSearchFilters(params);
  assert.deepEqual(
    [...updated],
    [
      ['keyword', '편의점'],
      ['sort', 'latest'],
    ],
  );
});
