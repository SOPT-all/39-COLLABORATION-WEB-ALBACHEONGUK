import { useState } from 'react';

import Radio from '../../components/Radio.tsx';

const PERIOD_OPTIONS = ['전체', '1일', '1주일이하', '1주일~1개월'];

function RadioPreviewPage() {
  const [period, setPeriod] = useState('전체');

  return (
    <main className="flex flex-col gap-4 p-10">
      <h2 className="text-title-18sb">Radio</h2>
      <div className="flex gap-6">
        {PERIOD_OPTIONS.map((option) => (
          <Radio
            key={option}
            name="period"
            label={option}
            checked={period === option}
            onChange={() => setPeriod(option)}
          />
        ))}
        <Radio name="disabled" label="비활성" checked={false} onChange={() => {}} disabled />
      </div>
    </main>
  );
}

export default RadioPreviewPage;
