import assert from 'node:assert/strict';
import test from 'node:test';
import { getJobPostedAt } from '../src/utils/jobPostedAt.ts';

const now = new Date('2026-11-10T12:00:00+09:00');
for (const [date, label] of [
  ['2026-11-10', '오늘'],
  ['2026-11-09', '1일 전'],
  ['2026-11-07', '3일 전'],
  ['2026-10-11', '30일 전'],
  ['2026-10-10', '1달 전'],
  ['2026-09-10', '2달 전'],
  ['2025-11-11', '11달 전'],
  ['2025-11-10', '1년 전'],
  ['2024-11-10', '2년 전'],
  ['2026-11-09T15:00:00Z', '오늘'],
  ['2026-11-09T14:59:59Z', '1일 전'],
  ['2026-11-10T00:00:00+09:00', '오늘'],
  ['2026-11-11', '등록일 확인'],
  ['2026-02-29', '등록일 확인'],
  ['', '등록일 확인'],
  ['2026-11-10T00:00:00', '등록일 확인'],
] as const) {
  test(`${date} -> ${label}`, () => assert.equal(getJobPostedAt(date, now), label));
}
test('KST 자정에 등록일이 오늘에서 1일 전으로 바뀐다', () => {
  assert.equal(getJobPostedAt('2026-11-10', new Date('2026-11-10T14:59:59Z')), '오늘');
  assert.equal(getJobPostedAt('2026-11-10', new Date('2026-11-10T15:00:00Z')), '1일 전');
});
