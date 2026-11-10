import { useState } from 'react';

import Input from '../../components/Input.tsx';

function InputPreviewPage() {
  const [keyword, setKeyword] = useState('');

  return (
    <main className="flex w-[687px] flex-col gap-4 p-10">
      <h2 className="text-title-18sb">Input</h2>
      <div className="flex rounded-full border border-alba-gray-300 bg-alba-white px-5 py-4 focus-within:border-alba-gray-500">
        <Input
          value={keyword}
          onChange={setKeyword}
          ariaLabel="알바 검색"
          placeholder="어떤 알바를 찾으세요? 예 : 카페, 편의점, 주말"
        />
      </div>
      <div className="flex rounded-full border border-alba-gray-300 bg-alba-white px-5 py-4">
        <Input value="" onChange={() => {}} ariaLabel="비활성 입력" placeholder="비활성" disabled />
      </div>
    </main>
  );
}

export default InputPreviewPage;