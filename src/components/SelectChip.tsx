export type SelectChipIcon = {
  default: string;
  hover: string;
  selected: string;
};

type SelectChipProps = {
  label: string;
  isSelected: boolean;
  onSelect: () => void;
  icon?: SelectChipIcon;
};

function SelectChip({ label, isSelected, onSelect, icon }: SelectChipProps) {
  const stateClass = isSelected
    ? 'border-alba-yellow-500 bg-alba-yellow-500 text-alba-gray-700'
    : 'border-alba-gray-300 bg-alba-gray-200 text-alba-gray-400 hover:border-alba-gray-400 hover:bg-alba-gray-400 hover:text-alba-gray-600';

  return (
    <button
      type="button"
      aria-pressed={isSelected}
      onClick={onSelect}
      className={`group text-display-20sb focus-visible:outline-alba-blue-600 inline-flex ${icon ? 'h-[52px]' : 'h-[50px]'} shrink-0 cursor-pointer items-center gap-2.5 rounded-full border px-[25px] whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${stateClass}`}
    >
      {icon &&
        (isSelected ? (
          <img src={icon.selected} alt="" width={30} height={30} className="size-[30px]" />
        ) : (
          <>
            <img
              src={icon.default}
              alt=""
              width={30}
              height={30}
              className="size-[30px] group-hover:hidden"
            />
            <img
              src={icon.hover}
              alt=""
              width={30}
              height={30}
              className="hidden size-[30px] group-hover:block"
            />
          </>
        ))}
      {label}
    </button>
  );
}

export default SelectChip;
