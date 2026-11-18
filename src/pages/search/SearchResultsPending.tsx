import SearchErrorIllustration from './SearchErrorIllustration.tsx';

function SearchResultsPending({
  onRetry,
  rowCount = 5,
}: {
  onRetry?: () => void;
  rowCount?: number;
}) {
  if (onRetry) {
    return (
      <div className="flex flex-col items-center gap-6 px-4 pt-40 pb-40 text-center">
        <div className="flex flex-col items-center gap-2">
          <SearchErrorIllustration />
          <p role="alert" className="text-body-16r text-alba-gray-700">
            공고를 불러오지 못했어요.
          </p>
        </div>
        <button
          type="button"
          onClick={onRetry}
          className="text-body-16b text-alba-gray-500 border-alba-gray-300 bg-alba-white h-[46px] w-40 cursor-pointer rounded-lg border"
        >
          다시 시도하기
        </button>
      </div>
    );
  }

  return (
    <div role="status">
      <span className="sr-only">공고를 불러오는 중입니다</span>
      <div aria-hidden="true">
        {Array.from({ length: rowCount }, (_, row) => (
          <div
            key={row}
            className="border-alba-gray-300 flex h-[131px] items-center justify-between gap-4 border-b px-5"
          >
            <div className="w-2/5 space-y-3">
              <div className="flex gap-2">
                <div className="bg-alba-gray-200 h-3.5 w-[30%] rounded" />
                <div className="bg-alba-gray-200 h-3.5 w-[25%] rounded" />
              </div>
              <div className="bg-alba-gray-200 h-5 w-full rounded" />
              <div className="flex gap-3">
                <div className="bg-alba-gray-200 h-3.5 w-[11%] rounded" />
                <div className="bg-alba-gray-200 h-3.5 w-[23%] rounded" />
                <div className="bg-alba-gray-200 h-3.5 w-[36%] rounded" />
              </div>
            </div>
            <div className="flex w-[39%] items-center justify-between gap-2">
              <div className="flex w-[29%] flex-col items-center gap-2">
                <div className="bg-alba-gray-200 h-4 w-[32%] rounded" />
                <div className="bg-alba-gray-200 h-5 w-full rounded" />
              </div>
              <div className="bg-alba-gray-200 h-3.5 w-[12%] rounded" />
              <div className="bg-alba-gray-200 h-3.5 w-[19%] rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResultsPending;
