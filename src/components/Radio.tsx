import radioOffIcon from '../assets/icons/form/radio-off.svg';
import radioOnIcon from '../assets/icons/form/radio-on.svg';

type RadioProps = {
  checked: boolean;
  onChange: () => void;
  label: string;
  name: string;
  disabled?: boolean;
};

function Radio({ checked, onChange, label, name, disabled = false }: RadioProps) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 has-[:disabled]:cursor-not-allowed">
      <input
        type="radio"
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="peer sr-only"
      />
      <img
        src={checked ? radioOnIcon : radioOffIcon}
        alt=""
        className="size-6 rounded-full peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-alba-blue-600"
      />
      <span className="font-pretendard text-body-16r text-alba-black">{label}</span>
    </label>
  );
}

export default Radio;