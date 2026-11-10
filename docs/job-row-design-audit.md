# 공고 행 Figma 디자인 검수

최초 검수 및 디자이너 피드백 반영일: 2026-11-10. 대상은 PR #32의 JobRow·JobThumbnail·JobRowDetails 및 기본 표시입니다. 메인·검색 페이지 전체와 다른 담당자의 공통 UI 연결은 이 검수 범위에 포함하지 않습니다.

## 비교 방법

- 최초 검수에서 Figma get_design_context의 원본 스크린샷과 Plugin API의 좌표·색상·타이포 값을 14개 variant에서 조회했습니다. 이후 디자이너의 기본 썸네일 추가·마감 아이콘·선택 상태 수정을 다시 확인해 반영했습니다.
- `/setup/job-row/design`에서 원본과 동일한 문구·날짜·썸네일·원본 폭을 넣고 브라우저의 실제 위치·크기·계산된 스타일을 측정했습니다. 로컬 개발과 Vercel Preview에서만 열리는 경로이며 운영 배포에서는 제외됩니다.
- 최초 검수 당시 원본 PNG와 브라우저의 각 행 PNG를 비교하고 50% 중첩 이미지를 생성했습니다. 그 이미지는 당시 기록이며 새 기본 썸네일은 추가 반영 후 별도로 확인합니다. 문자 렌더링·서브픽셀 반올림 및 아래 구현 기준 차이로 PNG의 모든 픽셀이 같은 결과는 아닙니다. 원시 픽셀 차이 비율을 디자인 합격률로 해석하지 않습니다.
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

기본 별·구분점·선택 별은 피그마 원본 파일을 사용합니다. 새 기본 이미지는 [img_ thumbnail_default](https://www.figma.com/design/jNeeo8oqNK0GBPaOXdle0q?node-id=5108-28249)의 알바천국 공통 심벌입니다. 썸네일 프레임 104×68, 내부 심벌 32×32, 별 24×24, 화살표 벡터 14.5×8.5 및 버튼 24×24를 따릅니다. 이전 39×44 벌툰 예시 크롭·사이트 캡처 파일은 삭제했습니다.

## 전체 variant 확인

| Figma                                                                                | 원본 상태                                                        | 원본·비교 화면 크기 | 결과                       |
| ------------------------------------------------------------------------------------ | ---------------------------------------------------------------- | ------------------- | -------------------------- |
| [4030:26723](https://www.figma.com/design/jNeeo8oqNK0GBPaOXdle0q?node-id=4030-26723) | background=white, thumbnail=no, expanded=false, status=default   | 796×131             | 측정 완료                  |
| [4030:26845](https://www.figma.com/design/jNeeo8oqNK0GBPaOXdle0q?node-id=4030-26845) | background=white, thumbnail=yes, expanded=false, status=default  | 800×131             | 측정 완료                  |
| [4030:26906](https://www.figma.com/design/jNeeo8oqNK0GBPaOXdle0q?node-id=4030-26906) | background=yellow, thumbnail=yes, expanded=false, status=default | 800×131             | 측정 완료                  |
| [4030:26967](https://www.figma.com/design/jNeeo8oqNK0GBPaOXdle0q?node-id=4030-26967) | background=yellow, thumbnail=no, expanded=false, status=default  | 800×131             | 측정 완료                  |
| [4030:26784](https://www.figma.com/design/jNeeo8oqNK0GBPaOXdle0q?node-id=4030-26784) | background=white, thumbnail=no, expanded=false, status=closed    | 796×131             | 측정 완료 · 반영 내역 참고 |
| [4030:26480](https://www.figma.com/design/jNeeo8oqNK0GBPaOXdle0q?node-id=4030-26480) | favorite=Default, expanded=false, status=default                 | 800×131             | 측정 완료                  |
| [4030:26542](https://www.figma.com/design/jNeeo8oqNK0GBPaOXdle0q?node-id=4030-26542) | favorite=Default, expanded=false, status=closed                  | 800×131             | 측정 완료 · 반영 내역 참고 |
| [4030:27028](https://www.figma.com/design/jNeeo8oqNK0GBPaOXdle0q?node-id=4030-27028) | background=white, thumbnail=no, expanded=true, status=default    | 799×428             | 측정 완료                  |
| [4030:27055](https://www.figma.com/design/jNeeo8oqNK0GBPaOXdle0q?node-id=4030-27055) | background=white, thumbnail=yes, expanded=true, status=default   | 800×428             | 측정 완료 · 반영 내역 참고 |
| [4030:27082](https://www.figma.com/design/jNeeo8oqNK0GBPaOXdle0q?node-id=4030-27082) | background=yellow, thumbnail=yes, expanded=true, status=default  | 800×428             | 측정 완료                  |
| [4030:27109](https://www.figma.com/design/jNeeo8oqNK0GBPaOXdle0q?node-id=4030-27109) | background=yellow, thumbnail=no, expanded=true, status=default   | 803×428             | 측정 완료                  |
| [4030:26604](https://www.figma.com/design/jNeeo8oqNK0GBPaOXdle0q?node-id=4030-26604) | favorite=Selected, expanded=false, status=default                | 800×131             | 측정 완료 · 반영 내역 참고 |
| [4030:26666](https://www.figma.com/design/jNeeo8oqNK0GBPaOXdle0q?node-id=4030-26666) | favorite=Default, expanded=true, status=default                  | 800×428             | 측정 완료                  |
| [4030:26694](https://www.figma.com/design/jNeeo8oqNK0GBPaOXdle0q?node-id=4030-26694) | favorite=Selected, expanded=true, status=default                 | 800×428             | 측정 완료                  |

14개 모두 가로 넘침이 없고 접힘 높이는 131px, 펼침 높이는 428px입니다. 펼친 상세 패널은 모두 높이 281px·너비 763px입니다. 상세 라벨 폭 112px, 행 간격 14px, padding 상하 24px·좌우 60px와 반경 12px를 확인했습니다. 긴 주소 등 콘텐츠가 바뀌면 패널 높이는 자연스럽게 늘어납니다.

14개 상태에서 펼침·스크랩을 각각 변경하고 원래 상태로 되돌려 동작을 확인했습니다. 실제 브라우저 저장은 후속 연결 대상입니다.

## 디자이너 피드백 반영 완료

| 항목             | 확인한 최신 피그마                        | 코드 적용                                                                              |
| ---------------- | ----------------------------------------- | -------------------------------------------------------------------------------------- |
| 기본 썸네일      | img_ thumbnail_default (5108:28249) 추가  | 사진 없음·빈 URL·로딩 실패 시 공통 심벌 표시. 기업별 실제 이미지는 thumbnailUrl로 표시 |
| 마감 공고 배경   | 매칭 마감 4030:26542도 회색 배경으로 수정 | 서버 isClosed에 따라 회색·마감 배지를 표시하는 기존 명세 동작 유지                     |
| 선택 상태        | 매칭 4030:26604의 Selected에 노란 별 반영 | isScrapped=true이면 채워진 별 표시 유지                                                |
| 마감 아이콘 대비 | closed 별·화살표 원본 색 #F7F8FA 확인     | 마감 전용 SVG 추가. 마감에서도 이미 스크랩한 공고는 선택 별을 유지                     |

기본 썸네일은 회사 정보가 없는 기업의 로고로 오해하지 않도록 장식 이미지로 처리합니다. 이미지가 있는 공고에서는 전달받은 실제 이미지를 사용하고, 썸네일 칸 자체가 없는 유형은 칸을 만들지 않습니다. 브랜드별 로고·예시를 모든 기업의 fallback으로 사용하지 않습니다.

### 펼치기·접기 아이콘 4개 상태

| 공고 상태 | 동작   | Figma 원본                  | 색상    | 회전·이동        |
| --------- | ------ | --------------------------- | ------- | ---------------- |
| 일반      | 펼치기 | 3436:6194 · Plus, Default   | #E5E8EC | 0도, 아래 1.5px  |
| 일반      | 접기   | 3912:26023 · Minus, Default | #E5E8EC | 180도, 이동 없음 |
| 마감      | 펼치기 | 5095:27187 · Plus, closed   | #F7F8FA | 0도, 아래 1.5px  |
| 마감      | 접기   | 5095:27190 · Minus, closed  | #F7F8FA | 180도, 위 1.5px  |

색상별 벡터 2개와 원본의 회전·이동 값을 EXPAND_BUTTON_STATES로 명시적으로 매핑합니다. 피그마 자체도 접기를 180도 회전으로 정의하므로 방향이 같은 중복 SVG는 만들지 않습니다. 직전 코드에는 마감 색상과 회전은 있었으나 상태별 1.5px 배치 차이를 빠뜨려 보완했습니다.

미리보기의 일반·매칭 마감 공고에 접힌 예시와 펼친 예시를 각각 두어 색상·방향을 바로 비교할 수 있습니다. 재배포 이전의 고정 Preview URL은 새 커밋 화면으로 바뀌지 않으므로 PR에 갱신한 최신 URL을 확인합니다.

## 최초 검수와 현재 구현 기준

이전의 “기본 이미지 요청 필요·마감 아이콘 대비 확인 필요·Selected 상태 모순”은 현재 작업의 미해결 항목으로 남기지 않습니다. 사용자에게 전달받은 디자이너 반영 완료와 위에서 실제 확인한 에셋·상태를 구분해 기록합니다.

- 일반 썸네일 펼침 4030:27055는 조회 시 원본 padding-left 16px가 남아 있었습니다. 코드에서는 접힘과 펼침 모두 20px를 유지해 4px 이동을 막습니다. 이전 검수의 수치 차이는 이 동작 일관성 기준으로 보존합니다.
- 일반 마감의 이전 공유 버튼 자리는 만들지 않고, 최신 v2.1에 따라 급여·상태·스크랩·펼침 열을 일관되게 배치합니다.
- 매칭 마감 원본에 등록일이 남아 있는 부분은 최신 기능명세의 마감 배지 기준을 유지합니다.
- 펼친 상태의 위 화살표와 부모가 결정하는 너비를 유지합니다. 원본의 796→799px·800→803px 변화를 실제 펼침 동작에 강제하지 않습니다.
- 급여 유형별 색상·금액 포맷은 공통 급여 컴포넌트 연결 범위입니다.

## 확인 범위와 후속 작업

- 현재 디자인 대조 화면은 원본 비교용 고정 fixture이며 실제 회원·API 데이터가 아닙니다. 상세 주소와 헤더의 지역이 다른 부분도 원본 비교를 위해 동일하게 넣었습니다.
- 실제 화면 통합 후 임시 미리보기·대조 경로는 정리하고 날짜 정책 테스트는 유지합니다.
- API·상세 이동·브라우저 스크랩 저장, 목록 재조회 시 펼침 초기화는 기존 PR의 후속 연결 범위입니다.
- 로컬 `pnpm check`에서 lint·typecheck·날짜 테스트 30개·build·format:check를 통과했습니다.
