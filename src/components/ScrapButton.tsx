import scrapClosedIcon from '../assets/icons/job-row/scrap-closed.svg';
import scrapOffIcon from '../assets/icons/job-row/scrap-off.svg';
import scrapOnIcon from '../assets/icons/job-row/scrap-on.svg';

type ScrapButtonProps = {
  label: string;
  isScrapped: boolean;
  onToggle: () => void;
  isClosed?: boolean;
};

function ScrapButton({ label, isScrapped, onToggle, isClosed = false }: ScrapButtonProps) {
  const icon = isScrapped ? scrapOnIcon : isClosed ? scrapClosedIcon : scrapOffIcon;

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={isScrapped}
      onClick={onToggle}
      className="focus-visible:outline-alba-blue-600 flex size-6 shrink-0 cursor-pointer items-center justify-center rounded focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <img src={icon} alt="" width={24} height={24} />
    </button>
  );
}

export default ScrapButton;
