# 알바천국 · 데스크탑 웹 2조

39기 PLAY SOPT 합동 세미나 웹 저장소입니다.

## 데스크탑 웹 2조 팀원

| 이름          | GitHub                                       |
| ------------- | -------------------------------------------- |
| 심민식 · 리드 | [@minsik1014](https://github.com/minsik1014) |
| 손승현        | —                                            |
| 이지연        | —                                            |
| 금고은        | —                                            |

## 개발 환경

React · TypeScript · Vite · ESLint · Prettier

- Node.js **22.15.0** — `.nvmrc`
- pnpm **12.6.0** — `package.json`의 `packageManager`

## 설치·실행

```bash
git clone https://github.com/SOPT-all/39-COLLABORATION-WEB-ALBACHEONGUK.git
cd 39-COLLABORATION-WEB-ALBACHEONGUK

nvm install
nvm use
npm install --global pnpm@12.6.0
pnpm install --frozen-lockfile
pnpm dev
```

nvm을 사용하지 않는 경우 Node.js 22.15.0을 직접 설치합니다.

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

1. Issue에 작업 범위와 완료 조건을 작성합니다. 기능을 나눠 진행할 때는 상위 Issue와 Sub-issue로 연결합니다.
2. 작업 Issue 번호로 브랜치를 만듭니다. 예: `feat/15-job-list-api`
3. 변경 단위로 커밋합니다. 예: `feat: 채용 목록 조회 기능 추가`
4. PR 작성 전 `pnpm check`를 실행합니다.
5. PR에 작업 Issue와 확인 방법을 적고, 본인 외 1명 이상 승인·자동 검사 통과 후 Squash merge합니다.

PR과 main·develop의 push에서 [CI](.github/workflows/ci.yml)가 린트·타입·빌드·포맷을 검사합니다. 결과는 PR의 Checks에서 확인합니다.

[코딩 컨벤션](https://app.notion.com/p/8eb828481af883d79323013b119a0fe2) · [Git · Issue · PR 가이드](https://app.notion.com/p/d35828481af883ffab9101cb84f217d5)

## 협업 자료

- [노션 · 일정·업무 분담·과제](https://app.notion.com/p/40b828481af880c6b072e73b768e4128)
- [킥오프 FigJam](https://www.figma.com/board/URXA8pMmgp5wz2A5WvLS0x?node-id=0-1)
- [리디자인](https://www.figma.com/design/jNeeo8oqNK0GBPaOXdle0q?node-id=5-5)
- [디자인 시스템](https://www.figma.com/design/jNeeo8oqNK0GBPaOXdle0q?node-id=5-4)
- [PRD](https://app.notion.com/p/sopt-official/PRD-4011e48dd9608000be8fecc0c94fa2a5)
