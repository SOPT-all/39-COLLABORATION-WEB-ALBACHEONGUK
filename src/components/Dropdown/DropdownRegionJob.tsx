import DropdownPanel from './DropdownPanel';
import type { ReactNode } from 'react';
import RectButton from '../RectButton';
import TextImage from '../TextImage';
import applyText from '../../assets/text/button/apply.svg';
import cancelText from '../../assets/text/button/cancel.svg';

type RegionColumnProps = {
  title: string;
  children: ReactNode;
};

type DropdownRegionJobProps = {
  leftTitle: string;
  rightTitle: string;
  leftContent: ReactNode;
  rightContent: ReactNode;
  onCancel: () => void;
  onApply: () => void;
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
  onCancel,
  onApply,
}: DropdownRegionJobProps) {
  return (
    <DropdownPanel variant="regionJob">
      <div className="flex shrink-0 divide-x divide-alba-gray-300">
        <RegionColumn title={leftTitle}>{leftContent}</RegionColumn>

        <RegionColumn title={rightTitle}>
          <div className="py-[8px]">{rightContent}</div>
        </RegionColumn>
      </div>
      <div className="flex h-[87px] shrink-0 justify-center gap-[8px] border-t border-t-alba-gray-300 py-[20px]">
        <div className="w-[148px]">
          <RectButton variant="secondary" isFullWidth onClick={onCancel}>
            <TextImage src={cancelText} label="취소" width={29} height={24} />
          </RectButton>
        </div>
        <div className="w-[148px]">
          <RectButton variant="primary" isFullWidth onClick={onApply}>
            <TextImage src={applyText} label="적용" width={29} height={24} />
          </RectButton>
        </div>
      </div>
    </DropdownPanel>
  );
}

export default DropdownRegionJob;
