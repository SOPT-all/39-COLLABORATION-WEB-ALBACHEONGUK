import type { Resume } from '../../components/ResumeSelector.tsx';
import ResumeSelector from '../../components/ResumeSelector.tsx';
import TextImage from '../../components/TextImage.tsx';
import resumeMatchImage from '../../assets/images/search/resume-match.png';
import loginRecommendText from '../../assets/text/button/login-recommend.svg';
import SearchEmptyIllustration from '../search/SearchEmptyIllustration.tsx';
import SearchErrorIllustration from '../search/SearchErrorIllustration.tsx';
import { RESUME_ACTION_TEXT } from '../search/resumeActionText.ts';

type HomeResumeNoticeProps = {
  variant: 'guest' | 'none' | 'draft' | 'no-match';
  selectedResume?: Resume;
};

function HomeResumeNotice({ variant, selectedResume }: HomeResumeNoticeProps) {
  const copy = {
    guest: ['로그인하고 내 이력서로 지원할 수 있는 추천 공고를 받아보세요', '로그인하고 추천 받기'],
    none: ['이력서를 작성하고 지원 가능한 공고를 추천받으세요', '이력서 작성하기'],
    draft: ['이력서를 완성하고 지원 가능한 공고를 추천받으세요', '이력서 이어서 작성하기'],
    'no-match': ['현재 이력서와 조건에 맞는 추천 공고가 없어요', '이력서 수정하기'],
  };
  const [message, action] = copy[variant];

  return (
    <div className="flex flex-col items-center gap-6 pt-4 text-center">
      <div className="flex flex-col items-center gap-2">
        {variant === 'guest' ? (
          <img
            src={resumeMatchImage}
            width={140}
            height={168}
            alt=""
            className="h-[168px] w-[140px] object-cover"
          />
        ) : variant === 'no-match' ? (
          <SearchErrorIllustration />
        ) : (
          <SearchEmptyIllustration />
        )}
        <p className="text-body-16r text-alba-gray-700">{message}</p>
      </div>
      <div className="flex flex-col items-center gap-4">
        {variant === 'draft' && selectedResume && (
          <ResumeSelector
            resumes={[selectedResume]}
            selectedResumeId={selectedResume.id}
            showRegion={false}
          />
        )}
        <button
          type="button"
          disabled
          className={`text-body-16b bg-alba-yellow-400 text-alba-black inline-flex h-10 items-center justify-center rounded-full px-5 ${
            variant === 'guest' ? '' : variant === 'draft' ? 'w-[192px]' : 'w-[145px]'
          }`}
        >
          {variant === 'guest' ? (
            <TextImage src={loginRecommendText} label={action} width={136} height={15} />
          ) : (
            <TextImage
              src={RESUME_ACTION_TEXT[action].src}
              label={action}
              width={RESUME_ACTION_TEXT[action].width}
              height={15}
            />
          )}
        </button>
      </div>
    </div>
  );
}

export default HomeResumeNotice;
