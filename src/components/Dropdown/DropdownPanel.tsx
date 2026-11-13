import type { ReactNode } from 'react';

type DropdownPanelProps = {
  variant: 'regionJob' | 'period' | 'money';
  children: ReactNode;
};

function DropdownPanel({ variant, children }: DropdownPanelProps) {
  const width = variant === 'regionJob' ? 432 : variant === 'period' ? 416 : 400;

  return (
    <div
      style={{ width }}
      className="mt-[4px] flex flex-col overflow-hidden rounded-[8px] bg-alba-white text-alba-black outline outline-1 outline-alba-gray-700 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)]"
    >
      {children}
    </div>
  );
}

export default DropdownPanel;
