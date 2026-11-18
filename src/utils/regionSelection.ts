import { ALL_GUGUN, REGION_PARAM, REGIONS } from '../data/regions.ts';

type RegionSelection = {
  sido: string | null;
  guguns: string[];
};

export function readRegionSelection(params: URLSearchParams): RegionSelection {
  const sido = params.get(REGION_PARAM.SIDO);
  if (!sido || sido === ALL_GUGUN || !Object.hasOwn(REGIONS, sido))
    return { sido: null, guguns: [] };

  const values = params.getAll(REGION_PARAM.GUGUN);
  const options = REGIONS[sido];
  if (values.includes(ALL_GUGUN)) return { sido, guguns: [...options] };

  const guguns = options.filter((name) => values.includes(name));
  return guguns.length > 0 ? { sido, guguns } : { sido: null, guguns: [] };
}

export function writeRegionSelection(params: URLSearchParams, { sido, guguns }: RegionSelection) {
  const next = new URLSearchParams(params);
  next.delete(REGION_PARAM.SIDO);
  next.delete(REGION_PARAM.GUGUN);

  if (!sido || sido === ALL_GUGUN || !Object.hasOwn(REGIONS, sido)) return next;

  const options = REGIONS[sido];
  const selected = options.filter((name) => guguns.includes(name));
  if (options.length > 0 && selected.length === 0) return next;

  next.set(REGION_PARAM.SIDO, sido);
  if (selected.length === options.length) {
    next.set(REGION_PARAM.GUGUN, ALL_GUGUN);
  } else {
    selected.forEach((name) => next.append(REGION_PARAM.GUGUN, name));
  }

  return next;
}

export function getRegionLabel({ sido, guguns }: RegionSelection) {
  if (!sido) return '지역';
  if (REGIONS[sido].length === 0) return sido;
  if (guguns.length === REGIONS[sido].length) return `${sido} ${ALL_GUGUN}`;

  const [first, ...rest] = guguns;
  return rest.length > 0 ? `${first} 외 ${rest.length}` : first;
}
