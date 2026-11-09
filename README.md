<h1 align="center">알바천국 · 데스크탑 웹 2조</h1>

<p align="center">
  <b>검색에서 비교까지, 나에게 맞는 알바를 찾는 흐름</b><br/>
  39기 PLAY SOPT 합동 세미나 · 알바천국 PC 웹 리디자인
</p>

<p align="center">
  <a href="https://39-collaboration-web-albacheonguk.vercel.app">서비스 바로가기</a> ·
  <a href="https://app.notion.com/p/40b828481af880c6b072e73b768e4128">팀 노션</a> ·
  <a href="https://www.figma.com/design/jNeeo8oqNK0GBPaOXdle0q?node-id=5-5">Figma</a> ·
  <a href="https://www.figma.com/design/jNeeo8oqNK0GBPaOXdle0q?node-id=6-11">기능명세서</a> ·
  <a href="#협업-컨벤션">협업 컨벤션</a>
</p>

---

## 프로젝트

메인에서 검색 조건을 설정하고, 검색 결과에서 공고를 비교한 뒤 이력서 기반 추천과 지원으로 이어지는 흐름을 개발합니다.

## 데스크탑 웹 2조 팀원

|                                                                          심민식 · 리드                                                                           |                                                                            손승현                                                                             |                                                                            금고은                                                                            |                                                                             이지연                                                                              |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [<img src="https://avatars.githubusercontent.com/u/110793639?v=4&amp;s=192" width="96" height="96" alt="심민식 GitHub 프로필" />](https://github.com/minsik1014) | [<img src="https://avatars.githubusercontent.com/u/203110950?v=4&amp;s=192" width="96" height="96" alt="손승현 GitHub 프로필" />](https://github.com/son0131) | [<img src="https://avatars.githubusercontent.com/u/130419004?v=4&amp;s=192" width="96" height="96" alt="금고은 GitHub 프로필" />](https://github.com/eunigo) | [<img src="https://avatars.githubusercontent.com/u/109638255?v=4&amp;s=192" width="96" height="96" alt="이지연 GitHub 프로필" />](https://github.com/jiyeoniii) |
|                                                           [@minsik1014](https://github.com/minsik1014)                                                           |                                                            [@son0131](https://github.com/son0131)                                                             |                                                             [@eunigo](https://github.com/eunigo)                                                             |                                                           [@jiyeoniii](https://github.com/jiyeoniii)                                                            |
|                                                  공고 행·검색·URL<br/>결과 목록·정렬·페이지<br/>공고 조회 연동                                                   |                                           헤더·프로필·지역/업직종 필터<br/>하단 추천·최근 검색<br/>이력서 선택·조회                                           |                                                 드롭다운·모달<br/>근무조건·급여 필터<br/>지원 팝업·지원 연동                                                 |                                                         공고 카드<br/>이력서 매칭·추천 조회<br/>스크랩                                                          |

작업별 담당·마감·진행 상태는 [노션 역할 분담](https://app.notion.com/p/40b828481af881438bebf8ff47d4afd3)에서 관리합니다.

## 개발 범위

| 흐름      | 구현할 내용                                        | 데이터 기준                     |
| --------- | -------------------------------------------------- | ------------------------------- |
| 검색      | 검색어·지역·업직종·근무조건·급여, 선택 태그·초기화 | 적용 조건은 URL로 유지          |
| 비교      | 목록·총 건수·정렬·진행중 토글·페이지·펼치기        | 공고 조회 API                   |
| 매칭      | 이력서 선택, 추천 공고 최대 3건                    | AI 모델 없이 조건별 점수 기반   |
| 지원      | 확인 팝업·제출·중복/마감/오류 처리                 | 공고 지원 API                   |
| 저장      | 스크랩·최근 검색                                   | 브라우저 저장                   |
| 하단 탐색 | 지역별·테마별·대상별 추천                          | 목데이터. 테마·대상 카드는 고정 |

<details>
<summary>축소한 범위</summary>

- 로그인·이력서 작성/수정·별도 공고 상세창·위치 권한/IP 추정은 구현하지 않습니다.
- 하단 추천의 테마·대상 칩은 클릭 상태만 처리하며 실제 공고를 다시 조회하지 않습니다.
- 알바스토리 이하 영역은 이미지로 대체합니다.
- 스켈레톤은 후순위이며 기본 로딩·빈 결과·오류 처리를 먼저 구현합니다.

</details>

## 기술 스택

|                                                 화면                                                 |                                                                                                                라우팅·스타일                                                                                                                |                                                                                                                                                                                                    데이터·상태                                                                                                                                                                                                    |
| :--------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://skillicons.dev/icons?i=react,ts,vite" height="44" alt="React, TypeScript, Vite" /> | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/reactrouter/reactrouter-original.svg" width="44" height="44" alt="React Router" /> <img src="https://skillicons.dev/icons?i=tailwind" height="44" alt="Tailwind CSS" /> | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/axios/axios-plain.svg" width="44" height="44" alt="Axios" /> <img src="https://raw.githubusercontent.com/TanStack/query/main/media/emblem-light.svg" width="44" height="44" alt="TanStack Query" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/zustand/zustand-original.svg" width="44" height="44" alt="Zustand" /> |
|                                      React · TypeScript · Vite                                       |                                                                                                 React Router · Tailwind CSS<br/>Pretendard                                                                                                  |                                                                                                                                                                                         Axios · TanStack Query · Zustand                                                                                                                                                                                          |
|                                       컴포넌트·타입·개발 환경                                        |                                                                                                          경로·URL 조건·디자인 토큰                                                                                                          |                                                                                                                                                                                           API 요청·조회 캐시·공유 상태                                                                                                                                                                                            |

<p align="center">
  <img src="https://skillicons.dev/icons?i=git,githubactions,vercel,nodejs,pnpm" height="36" alt="Git, GitHub Actions, Vercel, Node.js, pnpm" /><br/>
  Git · GitHub Actions · Vercel · Node.js · pnpm · ESLint · Prettier
</p>

- React·TypeScript로 화면을 구성하고, Tailwind CSS의 공통 토큰으로 색상·서체를 맞춥니다.
- 검색 조건은 URL, 서버 데이터는 TanStack Query, 공유하는 클라이언트 상태는 Zustand로 관리합니다.
- GitHub Actions로 코드를 검사하고, Vercel에 배포합니다.

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
`.env.local`의 `VITE_API_BASE_URL`에는 서버와 합의한 API 기본 주소를 입력합니다. 실제 값은 별도로 공유하며 로컬 환경변수 파일은 커밋하지 않습니다.

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

## 자동 검사·배포

| 구분       | 기준                                                     |
| ---------- | -------------------------------------------------------- |
| 코드 검사  | PR과 `main`·`develop` push에서 린트·타입·빌드·포맷 검사  |
| Preview    | 같은 저장소의 Draft가 아닌 PR에서 검사 후 변경 화면 배포 |
| Production | `main`에 반영된 코드를 검사 후 운영 환경에 배포          |

```text
개발: 작업 브랜치 → PR → 자동 검사·Preview → 리뷰·승인 → develop
운영: develop → main 반영 → 자동 검사 → Production 배포
```

배포는 GitHub Actions에서 Vercel CLI로 진행합니다. Preview 주소는 해당 Actions 실행의 Summary에서 확인합니다.
API 환경변수는 Preview·Production 환경에 각각 등록하며, 라우팅 경로로 직접 접근하거나 새로고침해도 앱을 표시하도록 SPA rewrite를 적용합니다.

## 협업 컨벤션

`Issue → 작업 브랜치 → PR → 리뷰 → develop → main`

| 항목        | 규칙                                                      |
| ----------- | --------------------------------------------------------- |
| 기준 브랜치 | `develop`: 작업 통합 / `main`: 배포 가능한 코드           |
| 작업 브랜치 | `유형/이슈번호-작업설명` — 소문자·하이픈, `#` 제외        |
| 커밋        | `유형: 구체적인 변경 내용`                                |
| PR          | `develop` 대상, `유형: 작업 내용 (#이슈번호)`             |
| 리뷰        | 작성자 외 3명 전원 요청, 본인 외 1명 이상 승인            |
| 머지        | 필수 CI 통과·미해결 대화 해소 후 Squash, 작업 브랜치 삭제 |
| 라벨        | 작성자 이름+이모지와 변경 유형을 함께 적용                |

<details>
<summary>Issue·Sub-issue와 브랜치 예시</summary>

- 기능 전체는 상위 Issue, 개인 작업은 Sub-issue로 나누고 담당·범위·완료 조건·목표일을 적습니다.
- Sub-issue는 본문에 번호만 적지 않고 GitHub의 실제 하위 이슈 관계로 연결합니다.
- 작은 독립 작업은 일반 Issue 하나로 진행합니다. 작업 브랜치는 실제 작업 Issue 번호를 사용합니다.
- `fix`는 Issue 생성 예외입니다. Issue가 없으면 `fix/filter-reset`으로 만들고 PR 제목·본문의 이슈 번호를 생략합니다.

| 유형       | 용도                       | 브랜치 예시                    |
| ---------- | -------------------------- | ------------------------------ |
| `feat`     | 기능 추가                  | `feat/23-job-list`             |
| `fix`      | 오류 수정                  | `fix/filter-reset`             |
| `refactor` | 기능 변화 없는 구조 개선   | `refactor/24-filter-state`     |
| `style`    | 들여쓰기·포맷 등 코드 형식 | `style/25-format`              |
| `docs`     | 문서 수정                  | `docs/19-readme-update`        |
| `chore`    | 패키지·빌드·설정           | `chore/14-query-zustand-setup` |

번호는 형식 설명용 예시이며 실제 생성된 작업 Issue 번호를 사용합니다. UI 색상·레이아웃 변경은 목적에 따라 `feat` 또는 `fix`입니다.

```bash
git switch develop
git pull --ff-only origin develop
git switch -c feat/23-job-list
```

</details>

<details>
<summary>커밋·PR 작성과 리뷰 절차</summary>

커밋은 변경 단위로 나누며 파일명만 적거나 ‘수정’으로 끝내지 않습니다. 커밋마다 Issue 번호를 붙일 필요는 없습니다.

```text
feat: 공고 목록의 지역 필터 선택 기능 추가
fix: 필터 초기화 후 선택 지역이 남는 문제 수정
docs: 팀 소개와 개발 범위를 README에 반영
```

1. PR 전 `pnpm check`를 실행하고 실제 확인한 결과를 적습니다.
2. [PR 양식](.github/pull_request_template.md)에 관련 Issue·변경 이유·확인 방법·리뷰 요청을 작성합니다. UI 변경은 화면 자료를 첨부합니다.
3. 작업 Issue는 `Closes #번호`로 연결합니다. 상위 Issue는 전체 하위 작업·통합 확인 후 닫습니다.
4. 작성자 외 3명 모두에게 리뷰를 요청합니다. Draft는 Ready for review 전환 시 요청합니다.
5. 본인 외 1명 승인·필수 CI 통과·미해결 대화 해소 후 Squash merge합니다. 이후 작업 브랜치를 삭제합니다.

작성자 라벨은 `👻 민식` · `⚽ 승현` · `🍋 고은` · `🍎 지연`, 유형 라벨은 `feat/fix/refactor/style/docs/chore`를 사용합니다.
자동 검사의 세부 설정은 [CI 워크플로](.github/workflows/ci.yml)에서 관리합니다.

</details>

## 코딩 컨벤션

| 항목                  | 기준                                              | 예시                                  |
| --------------------- | ------------------------------------------------- | ------------------------------------- |
| 컴포넌트·파일         | PascalCase, 함수 선언문·default export            | `JobCard.tsx`, `function JobCard()`   |
| 함수·변수             | camelCase                                         | `fetchJobs`, `selectedRegion`         |
| 훅·불리언             | `use`, `is/has/can` 접두사                        | `useJobs`, `isOpen`, `canSubmit`      |
| 상수                  | UPPER_SNAKE_CASE                                  | `MAX_RECENT_SEARCHES`                 |
| 타입·Props            | `type` 중심, PascalCase, I/T 접두사 제외          | `Job`, `JobCardProps`                 |
| 유틸·훅·상수 내보내기 | named export                                      | `export function useJobs()`           |
| import                | 외부 패키지 → 내부 모듈 → 스타일, 그룹 사이 빈 줄 | 내부 모듈은 상대 경로                 |
| 스타일                | Tailwind와 공통 디자인 토큰                       | `bg-alba-yellow-400`, `text-body-14r` |
| 포맷                  | 2칸·세미콜론·작은따옴표·printWidth 100            | `.prettierrc.json` 기준               |

<details>
<summary>폴더 배치와 컴포넌트 예시</summary>

```text
src/
├── apis/                 # Axios 클라이언트·요청 함수·QueryClient
├── assets/               # 이미지·아이콘·폰트
│   └── fonts/
├── components/           # 여러 화면에서 재사용하는 컴포넌트
│   ├── Header.tsx
│   └── Layout.tsx
├── hooks/                # 공통 조회·동작 훅
├── pages/                # 페이지와 페이지 전용 컴포넌트
│   ├── home/
│   ├── search/
│   ├── setup/            # 라우팅·조회·상태 관리 확인 화면
│   └── NotFoundPage.tsx
├── stores/               # Zustand 공유 상태
├── styles/               # 폰트 등록·디자인 토큰
│   ├── font.css
│   └── theme.css
├── types/                # 공통 타입·API 응답 타입
├── App.tsx               # 라우팅 구성
├── index.css             # 전역 스타일
└── main.tsx              # 앱 진입점·Provider 연결
```

페이지 전용 코드는 해당 페이지 폴더에 둡니다. 공통 사용이 생겼을 때 옮기며 빈 폴더를 미리 늘리지 않습니다. 기본 라우팅은 현재 `App.tsx`, 라우터 Provider는 `main.tsx`에 있습니다.

```tsx
type JobCardProps = {
  title: string;
  isSaved: boolean;
  onToggleSave: () => void;
};

function JobCard({ title, isSaved, onToggleSave }: JobCardProps) {
  return (
    <article>
      <h2 className="text-title-18sb">{title}</h2>
      <button type="button" aria-pressed={isSaved} onClick={onToggleSave}>
        {isSaved ? '스크랩 해제' : '스크랩'}
      </button>
    </article>
  );
}

export default JobCard;
```

설명용 예시입니다. 최종 UI는 Figma의 공통 컴포넌트 상태와 맞춥니다. 설명할 수 없는 `any`는 피하고, 주석과 린트 예외에는 이유·제약을 적습니다.

</details>

<details>
<summary>URL·Query·Zustand·내부 상태를 나누는 기준</summary>

| 상태                                           | 관리 위치                                                 |
| ---------------------------------------------- | --------------------------------------------------------- |
| 실행한 검색어·필터·정렬·토글·페이지·표시 개수  | URL                                                       |
| 공고·이력서·추천 API 응답                      | TanStack Query                                            |
| 여러 영역에서 함께 쓰는 선택 이력서 ID 등      | Zustand                                                   |
| 드롭다운·팝업 열림, 적용 전 임시 선택, 행 펼침 | 우선 해당 컴포넌트의 `useState`                           |
| 스크랩·최근 검색                               | 브라우저 저장, 여러 화면의 동기화가 필요하면 store와 연결 |

- URL 조건과 Query 응답을 Zustand에 중복 저장하지 않습니다.
- 필터의 `[적용]`은 선택값만 저장하고 `[검색하기]`에서 결과를 갱신합니다.
- 조회 키는 실제 응답에 영향을 주는 사용자·이력서·검색 조건을 구분합니다.
- 일반 목록과 추천의 로딩·오류·재시도를 분리합니다. 추천 오류가 검색 결과를 지우지 않게 합니다.
- API 경로·응답 타입·마감 판정·추천 점수는 서버 계약에 맞춥니다. 예시 타입을 실제 계약으로 사용하지 않습니다.
- 지원은 최종 확인 후 제출하며 요청 중 버튼 비활성화·자동 재시도 제외·중복 지원 처리를 함께 적용합니다.

</details>

## 협업 자료

- [노션 · 일정·업무 분담·과제](https://app.notion.com/p/40b828481af880c6b072e73b768e4128)
- [코딩 컨벤션](https://app.notion.com/p/8eb828481af883d79323013b119a0fe2) · [Git · Issue · PR 가이드](https://app.notion.com/p/d35828481af883ffab9101cb84f217d5)
- [킥오프 FigJam](https://www.figma.com/board/URXA8pMmgp5wz2A5WvLS0x?node-id=0-1)
- [리디자인](https://www.figma.com/design/jNeeo8oqNK0GBPaOXdle0q?node-id=5-5) · [디자인 시스템](https://www.figma.com/design/jNeeo8oqNK0GBPaOXdle0q?node-id=5-4)
- [화면설계서·기능명세서](https://www.figma.com/design/jNeeo8oqNK0GBPaOXdle0q?node-id=6-11) · [PRD](https://app.notion.com/p/sopt-official/PRD-4011e48dd9608000be8fecc0c94fa2a5)
