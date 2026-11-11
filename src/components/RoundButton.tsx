import type { ReactNode } from 'react';

type RoundButtonProps = {
  color: 'yellow' | 'blue';
  type?: 'button' | 'submit';
  isFullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
};

const COLOR_CLASS = {
  yellow: 'bg-alba-yellow-400 text-alba-black enabled:hover:bg-alba-yellow-500',
  blue: 'bg-alba-blue-600 text-alba-white enabled:hover:bg-alba-blue-700',
};

function RoundButton({
  color,
  type = 'button',
  isFullWidth = false,
  disabled = false,
  onClick,
  children,
}: RoundButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex h-10 cursor-pointer items-center justify-center gap-2.5 rounded-full px-5 py-2 text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alba-blue-600 ${isFullWidth ? 'w-full' : ''} ${COLOR_CLASS[color]} disabled:cursor-not-allowed disabled:bg-alba-gray-200 disabled:text-alba-gray-400`}
    >
      {children}
    </button>
  );
}

export default RoundButton;