import { useState } from 'react';

import Checkbox from '../../components/Checkbox.tsx';

const DISTRICT_OPTIONS = ['전체', '강남구', '강동구', '강북구'];

function CheckboxPreviewPage() {
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);

  const handleChange = (district: string, checked: boolean) => {
    setSelectedDistricts((prev) =>
      checked ? [...prev, district] : prev.filter((item) => item !== district),
    );
  };

  return (
    <main className="flex flex-col gap-4 p-10">
      <h2 className="text-title-18sb">Checkbox</h2>
      <div className="flex gap-6">
        {DISTRICT_OPTIONS.map((district) => (
          <Checkbox
            key={district}
            label={district}
            checked={selectedDistricts.includes(district)}
            onChange={(checked) => handleChange(district, checked)}
          />
        ))}
        <Checkbox checked={false} onChange={() => {}} label="비활성" disabled />
      </div>
    </main>
  );
}

export default CheckboxPreviewPage;