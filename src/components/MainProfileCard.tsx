import applicationIcon from '../assets/profile-card/application.svg';
import avatarIcon from '../assets/profile-card/avatar.svg';
import chatIcon from '../assets/profile-card/chat.svg';
import chevronIcon from '../assets/profile-card/chevron.svg';
import dividerIcon from '../assets/profile-card/divider.svg';
import loginSprite from '../assets/profile-card/login-sprite.png';
import recentIcon from '../assets/profile-card/recent.svg';
import resumeIcon from '../assets/profile-card/resume.svg';
import resumeViewsIcon from '../assets/profile-card/resume-views.svg';
import scrapIcon from '../assets/profile-card/scrap.svg';

type MainProfileCardProps = {
  user: { name: string; availableJobCount: number } | null;
};

const SHORTCUTS = [
  { label: '이력서 관리', icon: resumeIcon },
  { label: '이력서 열람', icon: resumeViewsIcon },
  { label: '입사지원현황', icon: applicationIcon },
  { label: '최근 본', icon: recentIcon },
  { label: '스크랩', icon: scrapIcon },
  { label: '채팅 관리', icon: chatIcon },
];

const LOGIN_OPTIONS = [
  { label: '개인회원', description: '일자리 찾기', iconOffset: '-left-[2770.79%]' },
  { label: '기업회원', description: '알바생 찾기', iconOffset: '-left-[3082.6%]' },
];

function ProfileCardFooter({ items }: { items: readonly [string, string, string] }) {
  return (
    <ul className="text-caption-12r bg-alba-gray-100 flex items-center">
      {items.map((label, index) => (
        <li key={label} className="relative flex min-w-0 flex-1 justify-center py-3">
          {index > 0 && (
            <img src={dividerIcon} alt="" className="absolute top-1/2 -left-px -translate-y-1/2" />
          )}
          {label}
        </li>
      ))}
    </ul>
  );
}

function MainProfileCard({ user }: MainProfileCardProps) {
  const cardClassName =
    'border-alba-gray-300 bg-alba-white text-alba-black w-[302px] max-w-full overflow-hidden border drop-shadow-[0_-2px_10px_rgba(73,38,17,0.05)]';

  if (!user) {
    return (
      <section aria-label="비회원 로그인 안내" className={`${cardClassName} rounded-[20px] pt-5`}>
        <h2 className="text-body-16b px-5">로그인</h2>
        <ul className="flex pt-4 pb-8">
          {LOGIN_OPTIONS.map(({ label, description, iconOffset }) => (
            <li
              key={label}
              className="border-alba-gray-300 flex flex-1 flex-col items-center gap-2 border-r last:border-r-0"
            >
              <div className="relative h-[49px] w-12 overflow-hidden">
                <img
                  src={loginSprite}
                  alt=""
                  className={`absolute -top-[642.84%] h-[3194.5%] w-[3947.92%] max-w-none ${iconOffset}`}
                />
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="text-body-16b">{label}</p>
                <p className="text-caption-12r text-alba-gray-500">{description}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="text-alba-gray-600">
          <ProfileCardFooter items={['회원가입', '아이디 찾기', '비밀번호 찾기']} />
        </div>
      </section>
    );
  }

  return (
    <section aria-label="회원 프로필" className={`${cardClassName} rounded-2xl`}>
      <div className="flex flex-col gap-4 px-5 pt-4">
        <div className="flex items-center gap-3">
          <div className="flex size-16 shrink-0 items-center justify-center">
            <img src={avatarIcon} alt="" />
          </div>
          <div className="flex min-w-0 flex-col gap-0.5">
            <p className="text-body-16b truncate">{user.name}</p>
            <p className="text-caption-12r text-alba-gray-500">정보 수정</p>
          </div>
        </div>
        <div className="text-caption-12r bg-alba-gray-100 text-alba-gray-500 flex items-center justify-between gap-[18px] rounded-xl py-2 pr-3 pl-4">
          <div>
            <p>이력서를 등록해보세요.</p>
            <p>
              지금{' '}
              <strong className="text-alba-blue-700">
                {user.availableJobCount.toLocaleString('ko-KR')}
              </strong>
              개의 공고에 지원이 가능해요!
            </p>
          </div>
          <img src={chevronIcon} alt="" className="shrink-0" />
        </div>
      </div>
      <ul className="text-body-14r text-alba-gray-700 mx-auto grid w-fit grid-cols-3 gap-x-6 gap-y-[21px] py-4">
        {SHORTCUTS.map(({ label, icon }) => (
          <li
            key={label}
            className="flex h-[52px] w-16 flex-col items-center gap-0.5 whitespace-nowrap"
          >
            <div className="flex size-7 shrink-0 items-center justify-center">
              <img src={icon} alt="" />
            </div>
            {label}
          </li>
        ))}
      </ul>
      <div className="text-alba-gray-700">
        <ProfileCardFooter items={['글자수 세기', '급여계산기', '맞춤법 검사']} />
      </div>
    </section>
  );
}

export default MainProfileCard;
