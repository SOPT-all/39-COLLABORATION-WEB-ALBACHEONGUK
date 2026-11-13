import checkboxOffIcon from '../assets/icons/form/checkbox-off.svg';
import checkboxOnIcon from '../assets/icons/form/checkbox-on.svg';

type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
};

function Checkbox({ checked, onChange, label, disabled = false }: CheckboxProps) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 has-[:disabled]:cursor-not-allowed">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
        className="peer sr-only"
      />
      <img
        src={checked ? checkboxOnIcon : checkboxOffIcon}
        alt=""
        className="size-6 rounded peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-alba-blue-600"
      />
      <span className="font-pretendard text-body-16r text-alba-black">{label}</span>
    </label>
  );
}

export default Checkbox;
