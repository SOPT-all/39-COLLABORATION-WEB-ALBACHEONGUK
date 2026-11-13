type InputProps = {
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
  placeholder?: string;
  disabled?: boolean;
};

function Input({ value, onChange, ariaLabel, placeholder, disabled = false }: InputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      aria-label={ariaLabel}
      placeholder={placeholder}
      disabled={disabled}
      className="min-w-0 flex-1 bg-transparent font-pretendard text-title-18sb text-alba-black caret-alba-yellow-600 outline-none placeholder:text-alba-gray-400 disabled:cursor-not-allowed"
    />
  );
}

export default Input;
