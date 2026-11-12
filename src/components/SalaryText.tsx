const SALARY_TYPE_COLOR_CLASS: Record<string, string> = {
  일급: 'text-alba-green-200',
  월급: 'text-alba-red',
  시급: 'text-alba-teal',
  연봉: 'text-alba-purple-200',
};

export type SalaryTextLayout = 'horizontal' | 'vertical';

type SalaryTextProps = {
  salaryType: string;
  salaryText: string;
  layout: SalaryTextLayout;
  isClosed?: boolean;
};

function SalaryText({ salaryType, salaryText, layout, isClosed = false }: SalaryTextProps) {
  const typeColorClass = isClosed
    ? 'text-alba-gray-600'
    : (SALARY_TYPE_COLOR_CLASS[salaryType] ?? 'text-alba-gray-700');
  const amountColorClass = isClosed ? 'text-alba-gray-600' : 'text-alba-gray-700';
  const amountText = salaryText.trim() || '협의';

  if (layout === 'vertical') {
    return (
      <p className="flex w-full flex-col items-center gap-0.5 text-center">
        <span className={`text-body-14b h-[17px] w-[26px] ${typeColorClass}`}>{salaryType}</span>
        <span className={`text-body-16b w-full ${amountColorClass}`}>{amountText}</span>
      </p>
    );
  }

  return (
    <p className="flex min-w-0 items-center gap-1.5">
      <span className={`text-body-14b shrink-0 ${typeColorClass}`}>{salaryType}</span>
      <span className={`text-display-20sb truncate ${amountColorClass}`}>{amountText}</span>
    </p>
  );
}

export default SalaryText;
