import { useEffect, useRef, useState } from 'react';
import triangleDownIcon from '../../assets/icons/triangle.svg';
import checkIcon from '../../assets/icons/check.svg';

type DropdownSelectProps = {
  options: string[];
  initialValue?: string;
  value?: string;
  onChange: (value: string) => void;
  variant?: 'sort' | 'pageSize';
};

function DropdownSelect({
  options,
  initialValue,
  value,
  onChange,
  variant = 'sort',
}: DropdownSelectProps) {
  const defaultValue = variant === 'pageSize' ? '20개씩 보기' : '정확도순';
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(initialValue ?? defaultValue);
  const selected = value ?? internalValue;
  const width = variant === 'pageSize' ? 136 : 128;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleOutsideClick(event: PointerEvent) {
      const target = event.target;

      if (target instanceof Node && dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('pointerdown', handleOutsideClick);

    return () => {
      document.removeEventListener('pointerdown', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative flex flex-col" style={{ width }}>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full h-[40px] bg-alba-white pl-[12px] pr-[10px] rounded-[8px] overflow-hidden text-alba-gray-800 text-body-14r border border-alba-gray-300 `}
      >
        {selected}
        <img
          src={triangleDownIcon}
          alt=""
          className={`size-[24px] shrink-0 ${isOpen ? 'rotate-180' : ''} `}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full z-20 mt-1 flex w-full flex-col overflow-hidden rounded-lg border border-alba-gray-300 bg-alba-white">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                if (value === undefined) setInternalValue(option);
                onChange(option);
                setIsOpen(false);
                triggerRef.current?.focus();
              }}
              className={`flex items-center justify-between w-full h-[40px] pl-[12px] pr-[10px] text-body-14r text-alba-gray-800 ${
                selected === option ? 'bg-alba-blue-100' : 'bg-alba-white'
              }`}
            >
              {option}

              {selected === option && (
                <img src={checkIcon} alt="" className="size-[14px] shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownSelect;
