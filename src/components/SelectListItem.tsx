import checkIcon from '../assets/icons/form/ic_check.svg';

type SelectListItemProps = {
  label: string;
  isSelected: boolean;
  onSelect: () => void;
};

function SelectListItem({ label, isSelected, onSelect }: SelectListItemProps) {
  return (
    <button
      type="button"
      aria-pressed={isSelected}
      onClick={onSelect}
      className={`flex w-full cursor-pointer items-center justify-between gap-2.5 py-3 pl-4 text-left font-pretendard focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-alba-blue-600 ${isSelected ? 'bg-alba-blue-100 pr-3 text-body-16b text-alba-blue-700' : 'bg-alba-white pr-4 text-body-16r text-alba-black'}`}
    >
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {isSelected && <img src={checkIcon} alt="" className="size-5 shrink-0" />}
    </button>
  );
}

export default SelectListItem;
