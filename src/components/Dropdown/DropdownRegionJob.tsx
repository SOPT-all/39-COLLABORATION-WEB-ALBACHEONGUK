import DropdownPanel from './DropdownPanel';
import type { ReactNode } from 'react';

type RegionColumnProps = {
  title: string;
  children: ReactNode;
};

type DropdownRegionJobProps = {
  leftTitle: string;
  rightTitle: string;
  leftContent: ReactNode;
  rightContent: ReactNode;
};

function RegionColumn({ title, children }: RegionColumnProps) {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <p className="bg-alba-gray-200 text-center py-[12px] border-b border-alba-gray-300 text-body-16b">
        {title}
      </p>

      <div className="h-[240px] overflow-y-auto dropdown-scroll">{children}</div>
    </div>
  );
}

function DropdownRegionJob({
  leftTitle,
  rightTitle,
  leftContent,
  rightContent,
}: DropdownRegionJobProps) {
  return (
    <DropdownPanel variant="regionJob">
      <div className="flex shrink-0 divide-x divide-alba-gray-300">
        <RegionColumn title={leftTitle}>{leftContent}</RegionColumn>

        <RegionColumn title={rightTitle}>
          <div className="py-[8px]">{rightContent}</div>
        </RegionColumn>
      </div>
      <div className="h-[87px] shrink-0 border-t border-t-alba-gray-300 py-[20px]">
        {/* 취소·적용 버튼을 넣을 자리 */}
      </div>
    </DropdownPanel>
  );
}

export default DropdownRegionJob;
