import type { ReactNode } from 'react';

type RectButtonProps = {
  variant: 'primary' | 'secondary';
  isFullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
};

const VARIANT_CLASS = {
  primary:
    'border-alba-yellow-500 bg-alba-yellow-400 text-alba-black enabled:hover:bg-alba-yellow-500 disabled:border-alba-gray-200 disabled:bg-alba-gray-200 disabled:text-alba-gray-400',
  secondary: 'border-alba-gray-300 bg-alba-white text-alba-gray-500 enabled:hover:bg-alba-gray-100',
};

function RectButton({
  variant,
  isFullWidth = false,
  disabled = false,
  onClick,
  children,
}: RectButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-lg border px-5 py-2.5 text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alba-blue-600 disabled:cursor-not-allowed ${isFullWidth ? 'w-full' : ''} ${VARIANT_CLASS[variant]}`}
    >
      {children}
    </button>
  );
}

export default RectButton;
