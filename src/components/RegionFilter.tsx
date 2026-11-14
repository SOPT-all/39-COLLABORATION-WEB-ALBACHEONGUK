import { useState } from 'react';

import Dropdown from './Dropdown/Dropdown.tsx';
import DropdownRegionJob from './Dropdown/DropdownRegionJob.tsx';
import SelectListItem from './SelectListItem.tsx';
import Checkbox from './Checkbox.tsx';
import { REGIONS, SIDO_LIST } from '../data/regions.ts';
import regionOffIcon from '../assets/icons/region-off.svg';
import regionOnIcon from '../assets/icons/region-on.svg';

function RegionFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const [draftSido, setDraftSido] = useState<string | null>(null);
  const [draftGuguns, setDraftGuguns] = useState<string[]>([]);

  const guguns = draftSido ? REGIONS[draftSido] : [];
  const isAllChecked = guguns.length > 0 && draftGuguns.length === guguns.length;

  const handleSidoSelect = (sido: string) => {
    setDraftSido(sido);
    setDraftGuguns([]);
  };

  const handleAllChange = (checked: boolean) => {
    setDraftGuguns(checked ? [...guguns] : []);
  };

  const handleGugunChange = (gugun: string, checked: boolean) => {
    setDraftGuguns((prev) =>
      checked ? [...prev, gugun] : prev.filter((item) => item !== gugun),
    );
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleApply = () => {
    setIsOpen(false);
  };

  return (
    <Dropdown
      label="지역"
      icon={regionOffIcon}
      appliedIcon={regionOnIcon}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DropdownRegionJob
        leftTitle="시·도"
        rightTitle="구·군"
        leftContent={
          <ul>
            {SIDO_LIST.map((sido) => (
              <li key={sido}>
                <SelectListItem
                  label={sido}
                  isSelected={draftSido === sido}
                  onSelect={() => handleSidoSelect(sido)}
                />
              </li>
            ))}
          </ul>
        }
        rightContent={
          <ul>
            {draftSido && (
            <ul>
              <li className="px-[16px] py-[10px]">
                <Checkbox label="전체" checked={isAllChecked} onChange={handleAllChange} />
              </li>
              {guguns.map((gugun) => (
                <li key={gugun} className="px-[16px] py-[10px]">
                  <Checkbox
                    label={gugun}
                    checked={draftGuguns.includes(gugun)}
                    onChange={(checked) => handleGugunChange(gugun, checked)}
                  />
                </li>
              ))}
            </ul>
          )}
          </ul>
        }
        onCancel={handleCancel}
        onApply={handleApply}
      />
    </Dropdown>
  );
}

export default RegionFilter;