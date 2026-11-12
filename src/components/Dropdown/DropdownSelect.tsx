import { useState } from 'react';
import triangleDownIcon from '../../assets/icons/triangle.svg';
import checkIcon from '../../assets/icons/check.svg';

type DropdownSelectProps = {
  options: string[];
  initialValue?: string;
  onChange: (value: string) => void;
  variant?: 'sort' | 'pageSize';
};

function DropdownSelect({
  options,
  initialValue,
  onChange,
  variant = 'sort',
}: DropdownSelectProps) {
  const defaultValue = variant === 'pageSize' ? '20개씩 보기' : '정확도순';
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(initialValue ?? defaultValue);
  const width = variant === 'pageSize' ? 136 : 128;

  return (
    <div className="flex flex-col  gap-[4px]" style={{ width }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full h-[40px] pl-[12px] pr-[10px] rounded-[8px] overflow-hidden text-alba-gray-800 text-body-14r border border-alba-gray-300 `}
      >
        {selected}
        <img
          src={triangleDownIcon}
          alt=""
          className={`size-[24px] shrink-0 ${isOpen ? 'rotate-180' : ''} `}
        />
      </button>

      {isOpen && (
        <div className="flex flex-col  w-full rounded-[8px] overflow-hidden border border-alba-gray-300">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                setSelected(option);
                onChange(option);
                setIsOpen(false);
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
