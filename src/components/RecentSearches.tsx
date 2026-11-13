import removeIcon from '../assets/icons/recent-searches/remove.svg';
import searchIcon from '../assets/icons/search-bar/search.svg';

type RecentSearchesProps = {
  keywords: readonly string[];
  onSearch: (keyword: string) => void;
  onRemove: (keyword: string) => void;
  onClear: () => void;
};

const FOCUS_CLASS = 'focus-visible:outline-2 focus-visible:outline-alba-blue-600';
const MAX_VISIBLE_CHARACTERS = 8;

function formatKeyword(keyword: string) {
  const characters = Array.from(keyword);
  return characters.length > MAX_VISIBLE_CHARACTERS
    ? `${characters.slice(0, MAX_VISIBLE_CHARACTERS).join('')}...`
    : keyword;
}

function RecentSearches({ keywords, onSearch, onRemove, onClear }: RecentSearchesProps) {
  return (
    <section
      aria-label="최근 검색"
      className="border-alba-gray-300 bg-alba-white text-alba-gray-800 flex w-[250px] max-w-full flex-col gap-3.5 rounded-2xl border p-6"
    >
      <div className="flex h-6 items-center justify-between">
        <h2 className="text-title-18sb">최근 검색</h2>
        {keywords.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className={`text-caption-12r text-alba-gray-500 cursor-pointer rounded-sm hover:underline ${FOCUS_CLASS}`}
          >
            전체 삭제
          </button>
        )}
      </div>
      <div className="bg-alba-gray-300 h-px" />
      {keywords.length === 0 ? (
        <p className="text-caption-12r text-alba-gray-500 grid h-[120px] place-items-center">
          최근 검색 기록이 없어요.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {keywords.map((keyword) => (
            <li key={keyword} className="flex h-[34px] items-center gap-2">
              <button
                type="button"
                aria-label={`${keyword} 다시 검색`}
                title={keyword}
                onClick={() => onSearch(keyword)}
                className={`text-body-14r flex h-full min-w-0 flex-1 cursor-pointer items-center gap-2 rounded-sm text-left hover:underline ${FOCUS_CLASS}`}
              >
                <img src={searchIcon} alt="" className="size-[18px] shrink-0" />
                <span className="max-w-[94px] truncate">{formatKeyword(keyword)}</span>
              </button>
              <button
                type="button"
                aria-label={`${keyword} 삭제`}
                onClick={() => onRemove(keyword)}
                className={`grid size-6 shrink-0 cursor-pointer place-items-center rounded-sm ${FOCUS_CLASS}`}
              >
                <img src={removeIcon} alt="" width={20} height={20} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default RecentSearches;
