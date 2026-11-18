import assert from 'node:assert/strict';
import test from 'node:test';

import { getJobDeadlineText } from '../src/utils/jobDeadline.ts';
import { getMillisecondsUntilNextKstDay, parseCalendarDate } from '../src/utils/jobDate.ts';

test('마감일은 YYYY.MM.DD 마감으로 표시한다', () => {
  assert.equal(getJobDeadlineText('2026-11-13'), '2026.11.13 마감');
});
test('상시모집은 null로 명시한다', () => {
  assert.equal(getJobDeadlineText(null), '상시모집');
});
test('마감일 없음과 전달 누락을 구분한다', () => {
  assert.equal(getJobDeadlineText(undefined), '마감일 확인');
  assert.equal(getJobDeadlineText(''), '마감일 확인');
});
for (const date of [
  '2026-02-29',
  '2026-11-31',
  '2026-13-01',
  '2026-00-10',
  '2026-11-00',
  'not-a-date',
  '2026-11-10T15:00:00Z',
]) {
  test(`잘못된 날짜 ${date}를 임의 보정하지 않는다`, () => {
    assert.equal(parseCalendarDate(date), null);
    assert.equal(getJobDeadlineText(date), '마감일 확인');
  });
}
test('윤년 날짜를 허용한다', () => {
  assert.equal(getJobDeadlineText('2028-02-29'), '2028.02.29 마감');
});
test('지난 날짜라도 마감 상태를 프런트에서 계산하지 않고 날짜만 표시한다', () => {
  assert.equal(getJobDeadlineText('2025-01-01'), '2025.01.01 마감');
});
test('등록일 갱신을 위한 다음 KST 자정까지의 시간을 계산한다', () => {
  assert.equal(getMillisecondsUntilNextKstDay(new Date('2026-11-10T14:59:59.999Z')), 1);
  assert.equal(getMillisecondsUntilNextKstDay(new Date('2026-11-10T15:00:00Z')), 86_400_000);
});
