import assert from 'node:assert/strict';
import test from 'node:test';
import { REGIONS } from '../src/data/regions.ts';
import {
  getRegionLabel,
  readRegionSelection,
  writeRegionSelection,
} from '../src/utils/regionSelection.ts';

test('전체 구·군을 복원한 뒤 하나만 해제하면 나머지 선택이 유지된다', () => {
  const params = new URLSearchParams('sido=서울&gugun=전체&keyword=편의점&pay=시급');
  const selection = readRegionSelection(params);
  assert.deepEqual(selection.guguns, REGIONS.서울);
  assert.equal(getRegionLabel(selection), '서울 전체');

  const remaining = selection.guguns.filter((name) => name !== '강남구');
  const updated = writeRegionSelection(params, { sido: selection.sido, guguns: remaining });
  assert.deepEqual(readRegionSelection(updated).guguns, remaining);
  assert.equal(updated.get('keyword'), '편의점');
  assert.equal(updated.get('pay'), '시급');
  assert.equal(params.get('gugun'), '전체');
});

test('구·군 전체는 압축해 저장하고 시·도 전체는 지역 조건을 지운다', () => {
  const params = new URLSearchParams('sido=서울&gugun=강남구&keyword=편의점');
  const all = writeRegionSelection(params, { sido: '서울', guguns: REGIONS.서울 });
  assert.deepEqual(all.getAll('gugun'), ['전체']);

  const nationwide = writeRegionSelection(params, { sido: '전체', guguns: [] });
  assert.equal(nationwide.has('sido'), false);
  assert.equal(nationwide.has('gugun'), false);
  assert.equal(nationwide.get('keyword'), '편의점');
  assert.equal(getRegionLabel(readRegionSelection(nationwide)), '지역');
});

test('알 수 없는 지역이나 해당 지역에 없는 구·군은 적용 상태로 표시하지 않는다', () => {
  for (const query of ['sido=없는지역&gugun=전체', 'sido=서울&gugun=해운대구']) {
    assert.deepEqual(readRegionSelection(new URLSearchParams(query)), { sido: null, guguns: [] });
  }
});

test('구·군 전체를 직접 해제하고 적용하면 지역 조건만 URL에서 제거된다', () => {
  const params = new URLSearchParams('sido=서울&gugun=전체&keyword=편의점&pay=시급');
  const updated = writeRegionSelection(params, { sido: '서울', guguns: [] });

  assert.deepEqual(readRegionSelection(updated), { sido: null, guguns: [] });
  assert.equal(updated.has('sido'), false);
  assert.equal(updated.has('gugun'), false);
  assert.equal(updated.get('keyword'), '편의점');
  assert.equal(updated.get('pay'), '시급');
});
