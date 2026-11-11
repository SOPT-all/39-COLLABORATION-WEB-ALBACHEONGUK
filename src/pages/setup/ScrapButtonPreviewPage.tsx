import { useState } from 'react';

import ScrapButton from '../../components/ScrapButton.tsx';

const FIXED_STATES = [
  { label: 'Default', isScrapped: false, isClosed: false },
  { label: 'Selected', isScrapped: true, isClosed: false },
  { label: 'closed', isScrapped: false, isClosed: true },
];

type ToggleExampleProps = {
  label: string;
  isClosed?: boolean;
};

function ToggleExample({ label, isClosed = false }: ToggleExampleProps) {
  const [isScrapped, setIsScrapped] = useState(false);

  return (
    <li className="flex items-center gap-3">
      <ScrapButton
        label={`${label} 스크랩`}
        isScrapped={isScrapped}
        isClosed={isClosed}
        onToggle={() => setIsScrapped((prev) => !prev)}
      />
      <span className="text-body-14r text-alba-gray-500">
        {label} · {isScrapped ? '스크랩됨' : '스크랩 안 함'}
      </span>
    </li>
  );
}

function ScrapButtonPreviewPage() {
  return (
    <section aria-label="스크랩 버튼 미리보기">
      <h1 className="text-display-24sb mb-2">스크랩 버튼 미리보기</h1>
      <p className="text-body-14r text-alba-gray-500 mb-8">
        피그마 icon_favorite의 세 가지 상태와 클릭 동작을 확인합니다. 로컬 개발 환경과 Vercel
        Preview에서만 열리는 확인용 화면입니다.
      </p>

      <h2 className="text-title-18sb mb-4">상태 (피그마 icon_favorite)</h2>
      <ul className="mb-10 flex gap-10">
        {FIXED_STATES.map((state) => (
          <li key={state.label} className="flex flex-col items-center gap-2">
            <ScrapButton
              label={`${state.label} 상태 예시 스크랩`}
              isScrapped={state.isScrapped}
              isClosed={state.isClosed}
              onToggle={() => {}}
            />
            <span className="text-caption-12b text-alba-gray-500">{state.label}</span>
          </li>
        ))}
      </ul>

      <h2 className="text-title-18sb mb-4">눌러서 확인</h2>
      <ul className="flex flex-col gap-4">
        <ToggleExample label="모집 중 공고" />
        <ToggleExample label="마감 공고" isClosed />
      </ul>
    </section>
  );
}

export default ScrapButtonPreviewPage;
