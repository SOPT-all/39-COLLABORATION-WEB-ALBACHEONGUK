import { useState } from 'react';

import SelectListItem from '../../components/SelectListItem.tsx';

const CITY_OPTIONS = ['전체', '서울', '부산', '대구', '인천'];

function SelectListItemPreviewPage() {
  const [selectedCity, setSelectedCity] = useState('서울');

  return (
    <main className="flex flex-col gap-4 p-10">
      <h2 className="text-title-18sb">SelectListItem</h2>
      <ul className="w-[200px] border border-alba-gray-300">
        {CITY_OPTIONS.map((city) => (
          <li key={city}>
            <SelectListItem
              label={city}
              isSelected={selectedCity === city}
              onSelect={() => setSelectedCity(city)}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}

export default SelectListItemPreviewPage;