import DropdownSelect from '../../components/Dropdown/DropdownSelect.tsx';

import { PAGE_SIZES, PAGE_SIZE_LABELS, SORT_LABELS } from './searchResultOptions.ts';

type SearchResultToolbarProps = {
  activeOnly: boolean;
  sort: keyof typeof SORT_LABELS;
  pageSize: number;
  onToggleActive: () => void;
  onSort: (sort: keyof typeof SORT_LABELS) => void;
  onPageSize: (size: number) => void;
};

function SearchResultToolbar({
  activeOnly,
  sort,
  pageSize,
  onToggleActive,
  onSort,
  onPageSize,
}: SearchResultToolbarProps) {
  return (
    <div className="bg-alba-gray-200 flex min-h-[52px] flex-wrap items-center gap-x-5 gap-y-2 rounded-xl px-4 py-1.5">
      <button
        type="button"
        role="switch"
        aria-checked={activeOnly}
        onClick={onToggleActive}
        className="text-body-14r text-alba-gray-800 flex w-[155px] cursor-pointer items-center gap-2.5"
      >
        <span
          aria-hidden="true"
          className={`flex h-6 w-[42px] shrink-0 items-center justify-end rounded-full px-1 ${activeOnly ? 'bg-alba-yellow-500' : 'bg-alba-gray-400'}`}
        >
          <span className="bg-alba-white size-[18px] rounded-full" />
        </span>
        진행중 공고만 보기
      </button>
      <div className="flex gap-2">
        <DropdownSelect
          options={Object.values(SORT_LABELS)}
          value={SORT_LABELS[sort]}
          onChange={(label) => onSort(label === SORT_LABELS.latest ? 'latest' : 'relevance')}
        />
        <DropdownSelect
          variant="pageSize"
          options={PAGE_SIZE_LABELS}
          value={pageSize + '개씩 보기'}
          onChange={(label) => onPageSize(PAGE_SIZES[PAGE_SIZE_LABELS.indexOf(label)] ?? 20)}
        />
      </div>
    </div>
  );
}

export default SearchResultToolbar;
