import previousIcon from '../../assets/icons/filter-tags/chevron-left.svg';
import nextIcon from '../../assets/icons/filter-tags/chevron-right.svg';

const GROUP_SIZE = 5;
const BUTTON_CLASS =
  'flex size-10 cursor-pointer items-center justify-center rounded-full border disabled:cursor-default disabled:opacity-40';

type SearchPaginationProps = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};

function SearchPagination({ page, pageCount, onPageChange }: SearchPaginationProps) {
  if (pageCount < 2) return null;

  const firstPage = Math.floor((page - 1) / GROUP_SIZE) * GROUP_SIZE + 1;
  const lastPage = Math.min(firstPage + GROUP_SIZE - 1, pageCount);

  return (
    <nav aria-label="검색 결과 페이지" className="flex justify-center gap-2 py-6">
      <button
        type="button"
        aria-label="이전 페이지 그룹"
        disabled={firstPage === 1}
        onClick={() => onPageChange(firstPage - GROUP_SIZE)}
        className={BUTTON_CLASS + ' border-alba-gray-300'}
      >
        <img src={previousIcon} alt="" />
      </button>
      {Array.from({ length: lastPage - firstPage + 1 }, (_, index) => firstPage + index).map(
        (number) => (
          <button
            key={number}
            type="button"
            aria-current={page === number ? 'page' : undefined}
            aria-label={number + '페이지'}
            onClick={() => page !== number && onPageChange(number)}
            className={
              BUTTON_CLASS +
              (page === number
                ? ' border-alba-yellow-500 bg-alba-yellow-500 text-body-14b'
                : ' border-alba-gray-300 text-alba-gray-500 text-body-14r')
            }
          >
            {number}
          </button>
        ),
      )}
      <button
        type="button"
        aria-label="다음 페이지 그룹"
        disabled={lastPage === pageCount}
        onClick={() => onPageChange(lastPage + 1)}
        className={BUTTON_CLASS + ' border-alba-gray-300'}
      >
        <img src={nextIcon} alt="" />
      </button>
    </nav>
  );
}

export default SearchPagination;
