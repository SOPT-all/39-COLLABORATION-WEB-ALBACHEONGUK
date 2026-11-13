import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import triangleDownIcon from '../../assets/icons/triangle.svg';

type DropdownProps = {
  label: string;
  children: ReactNode;
  icon: string;
  appliedIcon?: string;
  isApplied?: boolean;
  trigger?: ReactNode;
};

function Dropdown({
  label,
  children,
  icon,
  appliedIcon,
  isApplied = false,
  trigger,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    <div ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className={`flex items-center gap-[8px] w-[200px] pr-[6px] pl-[12px] py-[12px] bg-alba-white rounded-[8px] border ${!isApplied ? 'hover:bg-alba-gray-200' : ''}
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
      {isOpen && children}
    </div>
  );
}

export default Dropdown;
