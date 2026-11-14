import { useState } from 'react';
import { useSearchParams } from 'react-router';

import Dropdown from './Dropdown/Dropdown.tsx';
import DropdownRegionJob from './Dropdown/DropdownRegionJob.tsx';
import SelectListItem from './SelectListItem.tsx';
import Checkbox from './Checkbox.tsx';
import { ALL_GUGUN, REGION_PARAM, REGIONS, SIDO_LIST } from '../data/regions.ts';
import regionOffIcon from '../assets/icons/region-off.svg';
import regionOnIcon from '../assets/icons/region-on.svg';

function RegionFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [draftSido, setDraftSido] = useState<string | null>(null);
  const [draftGuguns, setDraftGuguns] = useState<string[]>([]);

  const appliedSido = searchParams.get(REGION_PARAM.SIDO);
  const appliedGugunParams = searchParams.getAll(REGION_PARAM.GUGUN);
  const validSido = appliedSido && REGIONS[appliedSido] ? appliedSido : null;
  const isAppliedAll = appliedGugunParams.includes(ALL_GUGUN);
  const appliedGuguns = validSido
    ? isAppliedAll
      ? [...REGIONS[validSido]]
      : REGIONS[validSido].filter((gugun) => appliedGugunParams.includes(gugun))
    : [];
  const isApplied = appliedGuguns.length > 0;

  const guguns = draftSido ? REGIONS[draftSido] : [];
  const isAllChecked = guguns.length > 0 && draftGuguns.length === guguns.length;

  const getTriggerLabel = () => {
    if (!validSido || !isApplied) return '지역';
    if (isAppliedAll) return `${validSido} ${ALL_GUGUN}`;

    const [first, ...rest] = appliedGuguns;
    return rest.length > 0 ? `${first} 외 ${rest.length}` : first;
  };

  const syncDraftFromUrl = () => {
    setDraftSido(validSido);
    setDraftGuguns(appliedGuguns);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      syncDraftFromUrl();
    }
    setIsOpen(nextOpen);
  };

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
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete(REGION_PARAM.SIDO);
      next.delete(REGION_PARAM.GUGUN);

      if (draftSido && draftGuguns.length > 0) {
        next.set(REGION_PARAM.SIDO, draftSido);

        if (isAllChecked) {
          next.append(REGION_PARAM.GUGUN, ALL_GUGUN);
        } else {
          guguns
            .filter((gugun) => draftGuguns.includes(gugun))
            .forEach((gugun) => next.append(REGION_PARAM.GUGUN, gugun));
        }
      }

      return next;
    });
    setIsOpen(false);
  };

  return (
    <Dropdown
      label={getTriggerLabel()}
      icon={regionOffIcon}
      appliedIcon={regionOnIcon}
      isApplied={isApplied}
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
          <ul>
            {draftSido && (
            <ul>
              <li className="px-[16px] py-[10px]">
                <Checkbox label={ALL_GUGUN} checked={isAllChecked} onChange={handleAllChange} />
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