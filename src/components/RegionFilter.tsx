import { useState } from 'react';
import { useSearchParams } from 'react-router';

import Dropdown from './Dropdown/Dropdown.tsx';
import DropdownRegionJob from './Dropdown/DropdownRegionJob.tsx';
import SelectListItem from './SelectListItem.tsx';
import Checkbox from './Checkbox.tsx';
import { ALL_GUGUN, REGIONS, SIDO_LIST } from '../data/regions.ts';
import {
  getRegionLabel,
  readRegionSelection,
  writeRegionSelection,
} from '../utils/regionSelection.ts';
import regionOffIcon from '../assets/icons/region-off.svg';
import regionOnIcon from '../assets/icons/region-on.svg';

function RegionFilter({ width, overlay }: { width?: number; overlay?: boolean } = {}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [draftSido, setDraftSido] = useState<string | null>(null);
  const [draftGuguns, setDraftGuguns] = useState<string[]>([]);

  const applied = readRegionSelection(searchParams);
  const guguns = draftSido ? REGIONS[draftSido] : [];
  const isAllChecked = draftSido !== null && guguns.every((name) => draftGuguns.includes(name));

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setDraftSido(applied.sido);
      setDraftGuguns(applied.guguns);
    }
    setIsOpen(nextOpen);
  };

  const handleSidoSelect = (sido: string) => {
    if (sido === draftSido) return;
    setDraftSido(sido);
    setDraftGuguns(REGIONS[sido]);
  };

  const handleAllChange = (checked: boolean) => {
    setDraftGuguns(checked ? guguns : []);
  };

  const handleGugunChange = (gugun: string, checked: boolean) => {
    setDraftGuguns((previous) =>
      checked ? [...new Set([...previous, gugun])] : previous.filter((name) => name !== gugun),
    );
  };

  const handleApply = () => {
    setSearchParams((params) =>
      writeRegionSelection(params, { sido: draftSido, guguns: draftGuguns }),
    );
    setIsOpen(false);
  };

  return (
    <Dropdown
      width={width}
      overlay={overlay}
      label={getRegionLabel(applied)}
      icon={regionOffIcon}
      appliedIcon={regionOnIcon}
      isApplied={applied.sido !== null}
      open={isOpen}
      onOpenChange={handleOpenChange}
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
          draftSido && (
            <ul>
              <li className="px-[16px] py-[10px]">
                <Checkbox
                  label={ALL_GUGUN}
                  checked={isAllChecked}
                  onChange={handleAllChange}
                  disabled={guguns.length === 0}
                />
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
          )
        }
        onCancel={() => setIsOpen(false)}
        onApply={handleApply}
      />
    </Dropdown>
  );
}

export default RegionFilter;
