import resumeMatchImage from '../../assets/images/search/resume-match.png';

function SearchResumeGuest({ keyword }: { keyword: string }) {
  const subject = keyword ? '‘' + keyword + '’ 추천 공고' : '추천 공고';

  return (
    <section aria-labelledby="resume-match-title" className="py-8">
      <h2
        id="resume-match-title"
        className="text-display-20sb text-alba-gray-800 flex h-10 items-start"
      >
        이력서 매칭
      </h2>
      <div className="flex flex-col items-center gap-6 pt-8">
        <div className="flex flex-col items-center gap-2">
          <img
            src={resumeMatchImage}
            alt=""
            width={140}
            height={168}
            className="h-[168px] w-[140px] object-cover"
          />
          <p className="text-body-16r text-alba-gray-700 px-4 text-center">
            로그인하고 내 이력서로 지원할 수 있는 {subject}를 받아보세요
          </p>
        </div>
        <button
          type="button"
          disabled
          className="text-body-16b bg-alba-yellow-400 text-alba-black rounded-full px-5 py-2"
        >
          로그인하고 추천 받기
        </button>
      </div>
    </section>
  );
}

export default SearchResumeGuest;
