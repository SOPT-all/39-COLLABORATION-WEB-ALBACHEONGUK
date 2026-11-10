# 공고 행 Figma 디자인 검수

검수일: 2026-11-10. 대상은 PR #32의 JobRow·JobThumbnail·JobRowDetails 및 기본 표시입니다. 메인·검색 페이지 전체와 다른 담당자의 공통 UI 연결은 이 검수 범위에 포함하지 않습니다.

## 비교 방법

- Figma get_design_context의 원본 스크린샷과 Plugin API의 좌표·색상·타이포 값을 14개 variant에서 조회했습니다.
- `/setup/job-row/design`에서 원본과 동일한 문구·날짜·썸네일·원본 폭을 넣고 브라우저의 실제 위치·크기·계산된 스타일을 측정했습니다. 로컬 개발과 Vercel Preview에서만 열리는 경로이며 운영 배포에서는 제외됩니다.
- 원본 PNG와 브라우저의 각 행 PNG를 비교하고 50% 중첩 이미지를 생성했습니다. 문자 렌더링·서브픽셀 반올림 및 아래 원본 모순으로 PNG의 모든 픽셀이 같은 결과는 아닙니다. 원시 픽셀 차이 비율을 디자인 합격률로 해석하지 않습니다.
- 같은 스타일의 텍스트도 Figma와 브라우저의 글자 상자 폭·반올림이 약 1px 다릅니다. 원본의 140% 행간은 코드의 1.4를 유지하며 글자마다 고정 폭을 강제하지 않았습니다.

## 수정한 차이

| 항목                | 수정 전                                    | 수정 후·원본 기준                                        |
| ------------------- | ------------------------------------------ | -------------------------------------------------------- |
| 등록일 값           | 14px / 행간 21px                           | caption-12r, 12px / 행간 18px                            |
| 등록일 세로 위치    | 라벨 y=45.5, 값 y=63.5                     | 라벨 y=47, 값 y=65                                       |
| 일반 공고 열 간격   | 급여·등록일 시작점 1px 차이                | 기본 796px에서 급여 x=470, 등록일 열 x=602               |
| 썸네일 공고 열 간격 | 우측 버튼·열이 2px 왼쪽                    | 800px에서 급여 x=482, 등록일 열 x=622, 버튼 x=730·758    |
| 급여 문구 상자      | 유형·금액 상자가 글자 폭에 따라 달라짐     | 유형 26×17, 금액 열 122px·가운데 정렬                    |
| 썸네일 제목         | 가용 정보 열만 사용해 원본보다 일찍 말줄임 | 원본의 최대 357px 범위를 사용하면서 컨테이너 축소에 대응 |
| 상세 테두리         | gray-300 #E5E8EC                           | 원본 #E5E8EB를 명시 토큰으로 적용                        |
| 마감 배지 글자      | gray-600 #595E69                           | 원본 #64748B를 명시 토큰으로 적용                        |
| 지하철 배지         | Pretendard 및 상속 자간                    | Noto Sans KR Bold 11px / 14px, 자간 0                    |
| 선택 별 SVG         | 이전 원본 색 #FFD000                       | 현재 Figma 원본 #FFD200로 교체                           |

지하철 배지는 [Google Fonts 공식 Noto Sans KR](https://github.com/google/fonts/tree/main/ofl/notosanskr)의 숫자 1–9·중 글리프 subset(5.44KB)을 로컬 파일로 등록했습니다. 라이선스는 `src/assets/fonts/NotoSansKR-OFL.txt`에 있습니다. 그 밖의 노선 문자를 추가한다면 subset도 확장해야 하며 현재는 Pretendard로 대체됩니다. CSS.getPlatformFontsForNode로 실제 Noto Sans KR Bold와 Pretendard Variable의 렌더링을 확인했습니다.

기본 로고·기본 별·구분점 파일은 현재 Figma 에셋과 SHA-256이 일치합니다. 선택 별도 교체 후 원본 파일을 사용합니다. 썸네일 104×68, 내부 로고 클립 39×44, 별 24×24, 화살표 벡터 14.5×8.5 및 버튼 24×24를 확인했습니다.

## 전체 variant 확인

| Figma                                                                                | 원본 상태                                                        | 원본·비교 화면 크기 | 결과                       |
| ------------------------------------------------------------------------------------ | ---------------------------------------------------------------- | ------------------- | -------------------------- |
| [4030:26723](https://www.figma.com/design/jNeeo8oqNK0GBPaOXdle0q?node-id=4030-26723) | background=white, thumbnail=no, expanded=false, status=default   | 796×131             | 측정 완료                  |
| [4030:26845](https://www.figma.com/design/jNeeo8oqNK0GBPaOXdle0q?node-id=4030-26845) | background=white, thumbnail=yes, expanded=false, status=default  | 800×131             | 측정 완료                  |
| [4030:26906](https://www.figma.com/design/jNeeo8oqNK0GBPaOXdle0q?node-id=4030-26906) | background=yellow, thumbnail=yes, expanded=false, status=default | 800×131             | 측정 완료                  |
| [4030:26967](https://www.figma.com/design/jNeeo8oqNK0GBPaOXdle0q?node-id=4030-26967) | background=yellow, thumbnail=no, expanded=false, status=default  | 800×131             | 측정 완료                  |
| [4030:26784](https://www.figma.com/design/jNeeo8oqNK0GBPaOXdle0q?node-id=4030-26784) | background=white, thumbnail=no, expanded=false, status=closed    | 796×131             | 측정 완료 · 아래 예외 참고 |
| [4030:26480](https://www.figma.com/design/jNeeo8oqNK0GBPaOXdle0q?node-id=4030-26480) | favorite=Default, expanded=false, status=default                 | 800×131             | 측정 완료                  |
| [4030:26542](https://www.figma.com/design/jNeeo8oqNK0GBPaOXdle0q?node-id=4030-26542) | favorite=Default, expanded=false, status=closed                  | 800×131             | 측정 완료 · 아래 예외 참고 |
| [4030:27028](https://www.figma.com/design/jNeeo8oqNK0GBPaOXdle0q?node-id=4030-27028) | background=white, thumbnail=no, expanded=true, status=default    | 799×428             | 측정 완료                  |
| [4030:27055](https://www.figma.com/design/jNeeo8oqNK0GBPaOXdle0q?node-id=4030-27055) | background=white, thumbnail=yes, expanded=true, status=default   | 800×428             | 측정 완료 · 아래 예외 참고 |
| [4030:27082](https://www.figma.com/design/jNeeo8oqNK0GBPaOXdle0q?node-id=4030-27082) | background=yellow, thumbnail=yes, expanded=true, status=default  | 800×428             | 측정 완료                  |
| [4030:27109](https://www.figma.com/design/jNeeo8oqNK0GBPaOXdle0q?node-id=4030-27109) | background=yellow, thumbnail=no, expanded=true, status=default   | 803×428             | 측정 완료                  |
| [4030:26604](https://www.figma.com/design/jNeeo8oqNK0GBPaOXdle0q?node-id=4030-26604) | favorite=Selected, expanded=false, status=default                | 800×131             | 측정 완료 · 아래 예외 참고 |
| [4030:26666](https://www.figma.com/design/jNeeo8oqNK0GBPaOXdle0q?node-id=4030-26666) | favorite=Default, expanded=true, status=default                  | 800×428             | 측정 완료                  |
| [4030:26694](https://www.figma.com/design/jNeeo8oqNK0GBPaOXdle0q?node-id=4030-26694) | favorite=Selected, expanded=true, status=default                 | 800×428             | 측정 완료                  |

14개 모두 가로 넘침이 없고 접힘 높이는 131px, 펼침 높이는 428px입니다. 펼친 상세 패널은 모두 높이 281px·너비 763px입니다. 상세 라벨 폭 112px, 행 간격 14px, padding 상하 24px·좌우 60px와 반경 12px를 확인했습니다. 긴 주소 등 콘텐츠가 바뀌면 패널 높이는 자연스럽게 늘어납니다.

14개 상태에서 펼침·스크랩을 각각 변경하고 원래 상태로 되돌려 동작을 확인했습니다. 실제 브라우저 저장은 후속 연결 대상입니다.

## 원본의 모순·최신 명세를 우선한 차이

이 항목들은 원본과 완전히 같은 픽셀이라고 표시하지 않습니다.

1. **일반 + 썸네일 + 펼침 (4030:27055)**: 원본은 접힘의 좌측 padding 20px가 펼침에서 16px로 바뀌어 행·패널이 4px 이동합니다. 코드는 펼침에 따라 위치가 뛰지 않도록 20px를 유지했습니다. 패널 크기 763×281은 맞추고 x 위치 4px 차이는 명시합니다.
2. **일반 마감 (4030:26784)**: 원본에 남은 공유 버튼 자리와 다른 열 간격을 그대로 복제하지 않았습니다. 최신 v2.1의 공유 버튼 제외를 따르고 급여·상태·스크랩·펼침 열을 일반 공고와 정렬합니다.
3. **매칭 마감 (4030:26542)**: 원본은 status=closed 이름과 달리 파란 배경·등록일·일반 글자색을 그대로 갖고 있습니다. 코드는 v2.1에 따라 회색·마감 배지를 표시합니다.
4. **매칭 접힘 + 스크랩 선택 (4030:26604)**: 이름은 Selected이나 원본 이미지는 빈 별입니다. 코드는 선택 여부에 맞는 채워진 별을 표시합니다.
5. **펼침 화살표**: 원본 일부 펼침 variant에도 아래 화살표가 남아 있으나 최신 명세 SCR-02-15에 따라 펼친 상태에는 위 화살표를 표시합니다.
6. **펼침 전후 폭**: 원본의 일반 796→799px, 강조 800→803px 변화는 실제 화면의 펼침 동작에 강제하지 않습니다. 부모가 너비를 결정하고 검수 fixture에서만 각 원본 폭을 사용합니다.

디자인 피드백으로 확인할 항목: 마감 공고의 기본 아이콘 색이 회색 배경과 같아 구분이 어렵습니다. 원본 SVG 색을 임의로 바꾸지는 않았으며, 마감 상태용 아이콘 대비는 디자인에서 확인할 필요가 있습니다. 급여 유형별 색상은 최신 명세와 공통 급여 컴포넌트 연결 시 별도 확인합니다.

## 확인 범위와 후속 작업

- 현재 디자인 대조 화면은 원본 비교용 고정 fixture이며 실제 회원·API 데이터가 아닙니다. 상세 주소와 헤더의 지역이 다른 부분도 원본 비교를 위해 동일하게 넣었습니다.
- 실제 화면 통합 후 임시 미리보기·대조 경로는 정리하고 날짜 정책 테스트는 유지합니다.
- API·상세 이동·브라우저 스크랩 저장, 목록 재조회 시 펼침 초기화는 기존 PR의 후속 연결 범위입니다.
- 로컬 `pnpm check`에서 lint·typecheck·날짜 테스트 30개·build·format:check를 통과했습니다.
