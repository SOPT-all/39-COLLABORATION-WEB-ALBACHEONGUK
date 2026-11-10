import { useRef, type FormEvent, type KeyboardEvent } from 'react';
import searchIcon from '../assets/icons/search-bar/search.svg';

type SearchBarProps = {
  value: string;
  onValueChange: (value: string) => void;
  onSearch: (keyword: string) => void;
  hasSelectedFilters?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
};

// 입력 중인 값과 실제 검색한 조건은 부모 화면에서 구분해 관리합니다.
function SearchBar({
  value,
  onValueChange,
  onSearch,
  hasSelectedFilters = false,
  disabled = false,
  ariaLabel = '공고 검색',
}: SearchBarProps) {
  const isComposing = useRef(false);
  const canSearch = !disabled && (value.trim().length > 0 || hasSelectedFilters);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSearch || isComposing.current) return;

    // 특수문자 매칭 정책은 조회 계층에서 적용하며 입력값 자체를 지우지 않습니다.
    onSearch(value.trim().slice(0, 30));
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (
      event.key === 'Enter' &&
      (isComposing.current || event.nativeEvent.isComposing || event.nativeEvent.keyCode === 229)
    ) {
      event.preventDefault();
    }
  }

  return (
    <form
      role="search"
      aria-label={ariaLabel}
      onSubmit={handleSubmit}
      className="border-alba-gray-300 bg-alba-white focus-within:border-alba-gray-500 flex w-full min-w-0 items-center gap-8 rounded-full border py-2 pr-2 pl-5"
    >
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <img src={searchIcon} alt="" className="shrink-0" />
        <input
          type="text"
          aria-label="검색어"
          value={value}
          maxLength={30}
          disabled={disabled}
          placeholder="어떤 알바를 찾으세요? 예 : 카페, 편의점, 주말"
          onChange={(event) => onValueChange(event.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => {
            isComposing.current = true;
          }}
          onCompositionEnd={() => {
            isComposing.current = false;
          }}
          className="text-title-18sb text-alba-black placeholder:text-alba-gray-400 caret-alba-yellow-500 min-w-0 flex-1 bg-transparent outline-none disabled:cursor-not-allowed"
        />
      </div>
      <button
        type="submit"
        disabled={!canSearch}
        className="bg-alba-yellow-400 text-alba-black text-body-16b focus-visible:outline-alba-blue-600 disabled:bg-alba-gray-200 disabled:text-alba-gray-400 h-10 w-28 shrink-0 cursor-pointer rounded-full px-5 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed"
      >
        검색하기
      </button>
    </form>
  );
}

export default SearchBar;
