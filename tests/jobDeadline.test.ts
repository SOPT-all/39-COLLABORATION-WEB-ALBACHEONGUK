import assert from 'node:assert/strict';
import test from 'node:test';

import { getJobDeadline, getMillisecondsUntilNextKstDay } from '../src/utils/jobDeadline.ts';

const NOW = new Date('2026-11-10T12:00:00+09:00');

for (const [date, status, label] of [
  ['2026-11-17', 'open', 'D-7'],
  ['2026-11-14', 'open', 'D-4'],
  ['2026-11-13', 'urgent', 'D-3'],
  ['2026-11-12', 'urgent', 'D-2'],
  ['2026-11-11', 'urgent', 'D-1'],
  ['2026-11-10', 'today', 'D-Day'],
  ['2026-11-09', 'closed', '마감'],
] as const) {
  test(`${date} is ${label}`, () => {
    const result = getJobDeadline(date, false, NOW);
    assert.equal(result.status, status);
    assert.equal(result.label, label);
  });
}

test('KST 자정 직전과 직후에 같은 날짜 공고가 마감된다', () => {
  assert.equal(
    getJobDeadline('2026-11-10', false, new Date('2026-11-10T14:59:59.999Z')).status,
    'today',
  );
  assert.equal(
    getJobDeadline('2026-11-10', false, new Date('2026-11-10T15:00:00.000Z')).status,
    'closed',
  );
});
test('UTC 날짜가 전날이어도 KST 오늘을 사용한다', () => {
  assert.equal(
    getJobDeadline('2026-11-11', false, new Date('2026-11-10T15:01:00Z')).label,
    'D-Day',
  );
});
test('브라우저 시각에 포함된 오프셋과 무관하게 같은 순간은 같은 결과다', () => {
  assert.deepEqual(
    getJobDeadline('2026-11-13', false, NOW),
    getJobDeadline('2026-11-13', false, new Date('2026-11-09T22:00:00-05:00')),
  );
});
test('미래 날짜라도 채용 완료 상태가 우선한다', () => {
  assert.equal(getJobDeadline('2026-12-31', true, NOW).status, 'closed');
});
test('null만 상시모집으로 처리한다', () => {
  assert.equal(getJobDeadline(null, false, NOW).status, 'always');
  assert.equal(getJobDeadline(undefined, false, NOW).status, 'unknown');
  assert.equal(getJobDeadline('', false, NOW).status, 'unknown');
});
test('상시모집도 채용 완료되면 마감이다', () => {
  assert.equal(getJobDeadline(null, true, NOW).status, 'closed');
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
    assert.equal(getJobDeadline(date, false, NOW).status, 'unknown');
  });
}
test('윤년 날짜를 처리한다', () => {
  assert.equal(
    getJobDeadline('2028-02-29', false, new Date('2028-02-28T12:00:00+09:00')).label,
    'D-1',
  );
});
test('표시할 날짜를 일관되게 포맷한다', () => {
  assert.equal(getJobDeadline('2026-11-13', false, NOW).dateText, '2026.11.13 마감');
});
test('유효하지 않은 현재 시각은 확인 필요로 처리한다', () => {
  assert.equal(getJobDeadline('2026-11-13', false, new Date('invalid')).status, 'unknown');
});
test('다음 KST 자정까지의 시간을 계산한다', () => {
  assert.equal(getMillisecondsUntilNextKstDay(new Date('2026-11-10T14:59:59.999Z')), 1);
  assert.equal(getMillisecondsUntilNextKstDay(new Date('2026-11-10T15:00:00Z')), 86_400_000);
});
