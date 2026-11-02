# 알바천국 · 데스크톱 웹 2조

**39기 PLAY SOPT 합동 세미나 웹 프로젝트**

알바천국 리디자인을 바탕으로 화면과 API를 구현하며, 기획·디자인·서버 파트와 협업하는 프로젝트입니다.

## 함께하는 사람들

| 이름 | GitHub |
| --- | --- |
| 심민식 · 리드 | [@minsik1014](https://github.com/minsik1014) |
| 손승현 | 확인 후 추가 |
| 이지연 | 확인 후 추가 |
| 금고은 | 확인 후 추가 |

작업별 담당과 목표일은 [업무 분담](https://app.notion.com/p/40b828481af881438bebf8ff47d4afd3)에서 관리합니다.

## 프로젝트 자료

| 자료 | 링크 |
| --- | --- |
| 프로젝트 노션 | [일정·문서·과제 안내](https://app.notion.com/p/40b828481af880c6b072e73b768e4128) |
| 킥오프 FigJam | [논의 보드](https://www.figma.com/board/URXA8pMmgp5wz2A5WvLS0x?node-id=0-1) |
| 리디자인 | [화면 디자인](https://www.figma.com/design/jNeeo8oqNK0GBPaOXdle0q?node-id=5-5) |
| 디자인 시스템 | [디자인 시스템](https://www.figma.com/design/jNeeo8oqNK0GBPaOXdle0q?node-id=5-4) |
| PRD | [기능 요구사항](https://app.notion.com/p/sopt-official/PRD-4011e48dd9608000be8fecc0c94fa2a5) |

## 진행 현황

- GitHub 저장소 생성 및 협업 문서·FigJam 준비
- 킥오프에서 기술·컨벤션·초기 세팅 담당 논의 예정
- 프로젝트 코드와 실행 환경은 초기 세팅 후 반영 예정
- 구현 화면·API·배포 주소·시연 결과는 개발 진행에 따라 추가

## 기술 스택

| 항목 | 사용 기술 |
| --- | --- |
| 기본 구성 | React · TypeScript · Vite |
| 패키지 매니저 | pnpm |
| 라우팅 | React Router |
| 스타일링 | CSS Modules |
| API 통신 | Axios 공통 인스턴스 |
| 화면 상태 | 우선 useState 중심 · 로딩/빈 결과/오류 처리 |
| 코드 검사·포맷 | ESLint · Prettier |
| Node.js·패키지 버전 | 초기 세팅 시 확정 |
| 배포 | 논의 후 결정 |

선택 이유와 논의 사항은 [기술 선택과 이유](https://app.notion.com/p/644828481af88256941c015ec4c4fd03)에 기록합니다.

## 폴더 구조

실제 구현 범위를 확인하며 필요한 폴더부터 구성합니다.

```text
src/
├── assets/       # 이미지·아이콘·폰트
├── components/   # 여러 페이지에서 사용하는 컴포넌트
├── pages/        # 페이지와 해당 페이지 전용 컴포넌트
├── hooks/        # 공통 커스텀 훅
├── apis/         # 공통 인스턴스·API 요청 함수
├── types/        # 공통 타입
├── constants/    # 공통 상수
├── styles/       # 전역 스타일·디자인 토큰
└── router/       # 라우팅 설정
```

## 협업 규칙

브랜치 보호 규칙·자동 검사·템플릿은 초기 세팅에서 적용합니다.

- **브랜치:** `main`은 배포 기준, `develop`은 작업 통합에 사용합니다.
- **작업 브랜치:** `유형/이슈번호-작업설명` — 예: `feat/15-job-list-api`
- **커밋:** `유형: 변경 내용` — 예: `feat: 채용 목록 조회 기능 추가`
- **Issue:** 기능별 상위 Issue 아래 실제 작업을 Sub-issue로 나눕니다. 작은 독립 작업은 일반 Issue로 관리합니다.
- **PR:** 실제 작업 Issue를 연결하고, 본인 외 1명 이상 승인과 미해결 수정 요청이 없는 상태에서 Squash merge합니다.

[코딩 컨벤션](https://app.notion.com/p/8eb828481af883d79323013b119a0fe2) · [Git · Issue · PR 가이드](https://app.notion.com/p/d35828481af883ffab9101cb84f217d5)

## 주요 일정

| 일정 | 내용 |
| --- | --- |
| 11/3(화) 20:00 | 웹 킥오프 |
| 11/6(금) 23:59 | 1차 과제 제출 |
| 11/7(토) | 합동 세미나 · 구현 범위/UI/API 분담 확정 · 2차 과제 |
| 11/7~27 | 구현·API 연동·QA |
| 11/20(금) | 3차 과제 · 멘토링 질문 — 상세 마감 시각 확인 필요 |
| 11/27(금) 23:59 | 4차 과제 · 최종 결과 제출 |

세부 일정과 제출 확인은 [차수별 과제](https://app.notion.com/p/b03828481af882dc97b281abea2bab10)에서 관리합니다.

## 실행 방법

프로젝트 초기 세팅 전입니다. Node.js·pnpm 버전과 실제 설치·개발·검사·빌드 명령을 검증한 뒤 이곳에 추가합니다.

초기 세팅 작업과 환경변수 안내는 [프로젝트 시작하기](https://app.notion.com/p/a41828481af8832f99c881b47aa20498)에서 확인할 수 있습니다.

