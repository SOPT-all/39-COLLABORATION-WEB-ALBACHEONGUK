import { Link } from 'react-router';

import accountDivider from '../assets/header/account-divider.svg';
import logo from '../assets/header/logo.png';
import menuDivider from '../assets/header/menu-divider.svg';
import menuIcon from '../assets/header/menu.svg';
import resumeRegister from '../assets/text/button/resume-register.svg';

const ALBA_SITE = 'https://www.alba.co.kr';

const MENU_ITEMS = [
  { label: '채용정보', path: '/job/Main.asp' },
  { label: '브랜드알바', path: '/job/annex/Brand' },
  { label: '인재정보', path: '/resume/Main.asp' },
  { label: '알바스토리', path: '/story/Main.asp' },
  { label: '고객지원', path: '/customer/Main.asp' },
];

const FOCUS_STYLE =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alba-blue-600';

type HeaderProps = {
  isSignedIn: boolean;
};

function Header({ isSignedIn }: HeaderProps) {
  const [accountAction, accountDestination] = isSignedIn
    ? ['로그아웃', '내 정보']
    : ['로그인', '회원가입'];

  return (
    <header className="bg-alba-white text-alba-black">
      <div className="text-caption-12r text-alba-gray-600 mx-auto flex h-[34px] w-[calc(100%-2rem)] max-w-[1260px] items-center justify-end">
        <span className="px-3 py-2">{accountAction}</span>
        <img src={accountDivider} alt="" width={1} height={12} />
        <span className="px-3 py-2">{accountDestination}</span>
      </div>

      <div className="overflow-x-auto px-4">
        <div className="mx-auto flex w-full min-w-max max-w-[1244px] items-end gap-[clamp(16px,calc((100vw_-_1280px)/2),116px)] pb-6">
          <Link
            to="/"
            className="focus-visible:outline-alba-blue-600 shrink-0 rounded-sm focus-visible:outline-2 focus-visible:-outline-offset-2"
          >
            <img src={logo} alt="알바천국 홈" width={154} height={61} />
          </Link>

          <nav
            aria-label="주 메뉴"
            className="text-title-18sb flex basis-[746px] items-center whitespace-nowrap"
          >
            <a
              href={`${ALBA_SITE}/Main.asp`}
              className={`flex items-center gap-1 rounded-sm py-2 pr-[18px] ${FOCUS_STYLE}`}
            >
              <img src={menuIcon} alt="" width={24} height={24} />
              전체 메뉴
            </a>
            <img src={menuDivider} alt="" width={1} height={16} />
            <ul className="flex items-center px-1">
              {MENU_ITEMS.map(({ label, path }) => (
                <li key={path}>
                  <a
                    href={`${ALBA_SITE}${path}`}
                    className={`block rounded-sm px-4 py-2 ${FOCUS_STYLE}`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href={`${ALBA_SITE}/person/resume/Regist.asp?formtype=NORMAL`}
            className={`bg-alba-yellow-400 hover:bg-alba-yellow-500 flex h-10 w-28 shrink-0 items-center justify-center rounded-full ${FOCUS_STYLE}`}
          >
            <img src={resumeRegister} alt="이력서 등록" width={75} height={15} />
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
