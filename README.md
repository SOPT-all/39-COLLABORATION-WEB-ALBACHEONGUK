# 알바천국 · 데스크탑 웹 2조

39기 PLAY SOPT 합동 세미나의 알바천국 PC 웹 리디자인 프로젝트입니다.
메인에서 검색 조건을 설정하고, 검색 결과에서 공고를 비교한 뒤 이력서 기반 추천과 지원으로 이어지는 흐름을 개발합니다.

## 데스크탑 웹 2조 팀원

| 이름          | GitHub                                       | 담당 영역                                                            |
| ------------- | -------------------------------------------- | -------------------------------------------------------------------- |
| 심민식 · 리드 | [@minsik1014](https://github.com/minsik1014) | 공고 행, 검색·URL, 결과 목록·정렬·페이지, 공고 조회 연동             |
| 손승현        | [@son0131](https://github.com/son0131)       | 헤더·프로필, 지역·업직종 필터, 하단 추천·최근 검색, 이력서 선택·조회 |
| 금고은        | [@eunigo](https://github.com/eunigo)         | 드롭다운·모달, 근무조건·급여 필터, 지원 팝업·지원 연동               |
| 이지연        | [@jiyeoniii](https://github.com/jiyeoniii)   | 공고 카드, 이력서 매칭·추천 조회, 스크랩                             |

작업별 담당·마감·진행 상태는 [노션 역할 분담](https://app.notion.com/p/40b828481af881438bebf8ff47d4afd3)에서 관리합니다.

## 개발 범위

아래는 합의한 구현 범위입니다. 현재는 초기 세팅과 공통 컴포넌트·화면 개발 단계입니다.

- 검색: 검색어·지역·업직종·근무조건·급여 필터, 선택 조건 태그, URL을 통한 검색 조건 유지
- 검색 결과: 공고 목록·총 건수, 정렬·진행중 공고 토글, 페이지네이션·공고 펼치기
- 이력서 매칭: 이력서 선택과 조건별 점수에 따른 추천 공고 최대 3건 조회. AI 모델은 사용하지 않습니다.
- 지원: 선택한 이력서로 지원 확인·제출, 중복 지원·마감·오류 처리
- 스크랩·최근 검색: 서버 연동 없이 브라우저에 저장
- 하단 추천: 지역별·테마별·대상별 목데이터 사용. 테마·대상 칩은 클릭만 처리하고 공고 카드는 고정

로그인·이력서 작성/수정·별도 공고 상세창·위치 권한/IP 추정은 구현 범위에서 제외합니다. 알바스토리 이하 영역은 이미지로 대체하며 스켈레톤은 후순위입니다.

## 기술 스택

| 구분      | 기술                               | 용도                                      |
| --------- | ---------------------------------- | ----------------------------------------- |
| 화면      | React · TypeScript · Vite          | 컴포넌트 구성, 타입 검사, 개발·빌드       |
| 라우팅    | React Router                       | 메인·검색 결과 경로와 URL 검색 조건       |
| 스타일    | Tailwind CSS · Pretendard          | 공통 색상·타이포그래피와 화면 스타일      |
| HTTP      | Axios                              | 공통 API 클라이언트                       |
| 서버 상태 | TanStack Query                     | 공고·이력서·추천 조회 및 캐시             |
| 공유 상태 | Zustand                            | 여러 컴포넌트에서 함께 사용하는 화면 상태 |
| 코드 품질 | ESLint · Prettier · GitHub Actions | 린트·타입·빌드·포맷 자동 검사             |

TanStack Query·Zustand는 [PR #18](https://github.com/SOPT-all/39-COLLABORATION-WEB-ALBACHEONGUK/pull/18)에서 설정을 검토 중이며 아직 `develop`에 반영되지 않았습니다.
배포는 Vercel을 사용하며, GitHub Actions에서 Vercel CLI로 배포하는 CD는 별도 구성 중입니다.

## 설치·실행

- Node.js `22.15.0` — `.nvmrc`
- pnpm `12.6.0` — `package.json`의 `packageManager`
- 개발 기준 브랜치: `develop`

```bash
git clone https://github.com/SOPT-all/39-COLLABORATION-WEB-ALBACHEONGUK.git
cd 39-COLLABORATION-WEB-ALBACHEONGUK
git switch develop

nvm install
nvm use
npm install --global pnpm@12.6.0
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm dev
```

nvm을 사용하지 않는 경우 Node.js `22.15.0`을 직접 설치합니다.
`.env.local`의 `VITE_API_BASE_URL`에는 서버와 합의한 API 기본 주소를 입력합니다. 현재 `.env.example`은 빈 값이며 실제 API 주소는 별도로 전달합니다. 로컬 환경변수 파일은 커밋하지 않습니다.

## 명령어

| 명령어              | 용도                          |
| ------------------- | ----------------------------- |
| `pnpm dev`          | 개발 서버                     |
| `pnpm build`        | 배포용 빌드                   |
| `pnpm preview`      | 빌드 결과 확인                |
| `pnpm lint`         | 코드 규칙 검사                |
| `pnpm typecheck`    | 타입 검사                     |
| `pnpm format`       | 포맷 적용                     |
| `pnpm format:check` | 포맷 검사                     |
| `pnpm check`        | 린트·타입·빌드·포맷 전체 검사 |

## 작업 방법

1. 기능 전체는 상위 Issue로, 개인 작업은 Sub-issue로 나눕니다. 작은 단독 작업은 일반 Issue 하나로 진행합니다.
2. 최신 `develop`에서 `유형/이슈번호-작업설명` 브랜치를 만듭니다. 예: `docs/19-readme-update`. `fix`는 Issue 없이 `fix/filter-reset`처럼 시작할 수 있습니다.
3. `유형: 변경 내용` 형식으로 커밋합니다. 예: `feat: 채용 목록 조회 기능 추가`.
4. PR 전 `pnpm check`를 실행합니다.
5. `develop`을 대상으로 PR을 만들고 제목은 `유형: 작업 내용 (#이슈번호)`, 본문에는 `Closes #이슈번호`와 확인 방법을 적습니다. Issue 없는 `fix`는 번호·관련 Issue 항목을 생략합니다.
6. 작성자를 제외한 3명에게 리뷰를 요청하고, 본인 외 1명 이상 승인·필수 CI 통과·미해결 대화 해소 후 Squash merge합니다. 작업 브랜치는 머지 후 삭제합니다.

`develop`은 작업 통합, `main`은 배포 가능한 코드에 사용합니다. import는 상대 경로를 사용합니다.
작성자와 변경 유형 라벨은 PR 자동화로 적용하며, Draft는 Ready for review로 전환할 때 리뷰어를 요청합니다.

PR과 `main`·`develop`의 push에서 [CI](.github/workflows/ci.yml)가 린트·타입·빌드·포맷을 검사합니다.

## 협업 자료

- [노션 · 일정·업무 분담·과제](https://app.notion.com/p/40b828481af880c6b072e73b768e4128)
- [코딩 컨벤션](https://app.notion.com/p/8eb828481af883d79323013b119a0fe2) · [Git · Issue · PR 가이드](https://app.notion.com/p/d35828481af883ffab9101cb84f217d5)
- [킥오프 FigJam](https://www.figma.com/board/URXA8pMmgp5wz2A5WvLS0x?node-id=0-1)
- [리디자인](https://www.figma.com/design/jNeeo8oqNK0GBPaOXdle0q?node-id=5-5) · [디자인 시스템](https://www.figma.com/design/jNeeo8oqNK0GBPaOXdle0q?node-id=5-4)
- [화면설계서·기능명세서](https://www.figma.com/design/jNeeo8oqNK0GBPaOXdle0q?node-id=6-11) · [PRD](https://app.notion.com/p/sopt-official/PRD-4011e48dd9608000be8fecc0c94fa2a5)
