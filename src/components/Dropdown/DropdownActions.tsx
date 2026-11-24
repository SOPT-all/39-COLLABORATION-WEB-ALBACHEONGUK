import RectButton from '../RectButton.tsx';
import TextImage from '../TextImage.tsx';
import applyText from '../../assets/text/button/apply.svg';
import cancelText from '../../assets/text/button/cancel.svg';

type DropdownActionsProps = {
  onCancel: () => void;
  onApply: () => void;
};

function DropdownActions({ onCancel, onApply }: DropdownActionsProps) {
  return (
    <div className="flex h-[87px] shrink-0 items-center justify-center gap-[4px] border-t border-alba-gray-300 py-[20px]">
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
  );
}

export default DropdownActions;
