import { useState } from 'react';
import { useFilterParams } from '../hooks/useFilterParams.ts';
import type { FilterParams } from '../hooks/useFilterParams.ts';

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

function RegionFilter({
  width,
  overlay,
  filterParams,
}: { width?: number; overlay?: boolean; filterParams?: FilterParams } = {}) {
  const [searchParams, setSearchParams] = useFilterParams(filterParams);
  const [isOpen, setIsOpen] = useState(false);
  const [draftSido, setDraftSido] = useState<string | null>(null);
  const [draftGuguns, setDraftGuguns] = useState<string[]>([]);

  const applied = readRegionSelection(searchParams);
  const guguns = draftSido ? REGIONS[draftSido] : [];
  const isAllChecked = draftGuguns.includes(ALL_GUGUN);

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      const isAppliedAll =
        applied.sido !== null && applied.guguns.length === REGIONS[applied.sido].length;
      setDraftSido(applied.sido ?? ALL_GUGUN);
      setDraftGuguns(applied.sido === null || isAppliedAll ? [ALL_GUGUN] : applied.guguns);
    }
    setIsOpen(nextOpen);
  };

  const handleSidoSelect = (sido: string) => {
    if (sido === draftSido) return;
    setDraftSido(sido);
    setDraftGuguns([ALL_GUGUN]);
  };

  const handleAllChange = (checked: boolean) => {
    setDraftGuguns(checked ? [ALL_GUGUN] : []);
  };

  const handleGugunChange = (gugun: string, checked: boolean) => {
    setDraftGuguns((previous) => {
      const rest = previous.filter((name) => name !== ALL_GUGUN);
      return checked ? [...new Set([...rest, gugun])] : rest.filter((name) => name !== gugun);
    });
  };

  const handleApply = () => {
    setSearchParams((params) =>
      writeRegionSelection(params, {
        sido: draftSido,
        guguns: isAllChecked && draftSido ? REGIONS[draftSido] : draftGuguns,
      }),
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
