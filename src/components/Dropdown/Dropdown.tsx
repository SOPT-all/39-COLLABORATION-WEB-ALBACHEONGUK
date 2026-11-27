import { useOutsidePointerDown } from '../../hooks/useOutsidePointerDown.ts';
import { useRef, useState } from 'react';
import type { ReactNode } from 'react';
import triangleDownIcon from '../../assets/icons/triangle.svg';

type DropdownProps = {
  label: string;
  children: ReactNode;
  icon: string;
  appliedIcon?: string;
  isApplied?: boolean;
  trigger?: ReactNode;
  width?: number;
  overlay?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

function Dropdown({
  label,
  children,
  icon,
  appliedIcon,
  isApplied = false,
  trigger,
  width = 200,
  overlay = false,
  open,
  onOpenChange,
}: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [internalOpen, setInternalOpen] = useState(false);

  const isOpen = open ?? internalOpen;

  function changeOpen(nextOpen: boolean) {
    if (open === undefined) {
      setInternalOpen(nextOpen);
    }

    onOpenChange?.(nextOpen);
  }

  useOutsidePointerDown(dropdownRef, isOpen, () => {
    if (open === undefined) setInternalOpen(false);
    onOpenChange?.(false);
  });

  return (
    <div ref={dropdownRef} className={overlay ? 'relative' : undefined}>
      <button
        type="button"
        onClick={() => changeOpen(!isOpen)}
        aria-expanded={isOpen}
        style={{ width }}
        className={`flex items-center gap-[8px] pr-[6px] pl-[12px] py-[12px] bg-alba-white rounded-[8px] border ${!isApplied ? 'hover:bg-alba-gray-200' : ''}
        ${
          isApplied
            ? 'border-alba-yellow-700'
            : isOpen
              ? 'border-alba-gray-500'
              : 'border-alba-gray-300'
        }`}
      >
        {trigger ?? (
          <>
            <img
              src={isApplied ? (appliedIcon ?? icon) : icon}
              alt=""
              className="size-[24px] shrink-0"
            />
            <span
              className={`flex-1 text-left text-body-16b line-clamp-1
          ${isApplied || isOpen ? 'text-alba-gray-800' : 'text-alba-gray-500'}`}
            >
              {label}
            </span>{' '}
          </>
        )}
        <img
          src={triangleDownIcon}
          alt=""
          className={`size-[24px] shrink-0 ${isOpen ? 'rotate-180' : ''} `}
        />
      </button>
      {isOpen &&
        (overlay ? <div className="absolute left-0 top-full z-30">{children}</div> : children)}
    </div>
  );
}

export default Dropdown;
