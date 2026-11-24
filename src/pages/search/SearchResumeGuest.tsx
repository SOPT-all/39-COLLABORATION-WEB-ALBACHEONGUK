import resumeMatchImage from '../../assets/images/search/resume-match.png';
import loginRecommendText from '../../assets/text/button/login-recommend.svg';
import resumeMatchText from '../../assets/text/home/resume-match.svg';
import TextImage from '../../components/TextImage.tsx';

function SearchResumeGuest({ keyword }: { keyword: string }) {
  const subject = keyword ? '‘' + keyword + '’ 추천 공고' : '추천 공고';

  return (
    <section aria-labelledby="resume-match-title" className="py-8">
      <h2 id="resume-match-title" className="flex h-10 items-start">
        <span className="flex h-7 items-center">
          <img src={resumeMatchText} alt="이력서 매칭" width={93} height={19} />
        </span>
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
          className="text-body-16b bg-alba-yellow-400 text-alba-black inline-flex h-10 w-[178px] items-center justify-center rounded-full px-5 py-2"
        >
          <TextImage
            src={loginRecommendText}
            label="로그인하고 추천 받기"
            width={136}
            height={15}
          />
        </button>
      </div>
    </section>
  );
}

export default SearchResumeGuest;
