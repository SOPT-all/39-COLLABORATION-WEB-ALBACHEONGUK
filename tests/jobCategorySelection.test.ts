import assert from 'node:assert/strict';
import test from 'node:test';
import { applyJobSelections, getSelectedJobGroups } from '../src/utils/jobCategorySelection.ts';

test('다른 업직종의 세부 선택이 모두 URL에 저장되고 복원된다', () => {
  const params = applyJobSelections(new URLSearchParams('keyword=알바'), [
    '일반음식점',
    '백화점·면세점',
  ]);
  assert.deepEqual(params.getAll('jobCategory'), ['외식·음료', '유통·판매']);
  assert.deepEqual(
    getSelectedJobGroups(params).flatMap((group) => group.selected),
    ['일반음식점', '백화점·면세점'],
  );
  assert.equal(params.get('keyword'), '알바');
});

test('기존 전체 URL을 복원한 뒤 다른 업직종 항목을 더해도 모두 유지된다', () => {
  const original = new URLSearchParams('jobCategory=외식·음료&jobSubcategory=전체');
  const groups = getSelectedJobGroups(original);
  assert.equal(groups[0].selected.length, groups[0].options.length);
  const selected = [...groups[0].selected, '백화점·면세점'];
  const restored = getSelectedJobGroups(applyJobSelections(original, selected));
  assert.deepEqual(
    restored.flatMap((group) => group.selected),
    selected,
  );
  assert.equal(restored[1].selected.length, 1);
});

test('선택 해제 시 해당 업직종만 제거하며 빈 선택은 필터를 지운다', () => {
  const original = applyJobSelections(new URLSearchParams('keyword=알바'), [
    '일반음식점',
    '백화점·면세점',
  ]);
  const remaining = applyJobSelections(original, ['백화점·면세점']);
  assert.deepEqual(remaining.getAll('jobCategory'), ['유통·판매']);
  assert.deepEqual(getSelectedJobGroups(remaining)[0].selected, ['백화점·면세점']);
  assert.equal(applyJobSelections(original, []).toString(), 'keyword=%EC%95%8C%EB%B0%94');
});
