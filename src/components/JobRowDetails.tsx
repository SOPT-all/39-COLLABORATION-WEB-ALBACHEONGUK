import type { ReactNode } from 'react';

export type JobRowDetailsData = {
  category: string;
  address: string;
  stations: {
    id: string;
    line: string;
    name: string;
    color: 'blue' | 'green' | 'brown';
  }[];
  workHours: string;
  periodAndDays: string;
  applicationMethod: string;
  deadline: string;
};

type JobRowDetailsProps = {
  details: JobRowDetailsData;
};

const STATION_COLORS = {
  blue: 'bg-alba-blue-700',
  green: 'bg-alba-green-100',
  brown: 'bg-alba-brown',
};

function JobRowDetails({ details }: JobRowDetailsProps) {
  const rows: { label: string; value: ReactNode }[] = [
    { label: '업/직종', value: details.category.trim() || '정보 없음' },
    { label: '근무지', value: details.address.trim() || '정보 없음' },
    {
      label: '인근지하철',
      value:
        details.stations.length === 0 ? (
          '정보 없음'
        ) : (
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {details.stations.map((station) => (
              <li key={station.id} className="flex items-center gap-1.5">
                <span
                  className={`font-station text-alba-white relative size-[18px] shrink-0 rounded-full text-[11px] leading-[14px] font-bold tracking-normal ${STATION_COLORS[station.color]}`}
                >
                  <span className="absolute inset-x-0 top-[1.25px] text-center">
                    {station.line}
                  </span>
                </span>
                <span>{station.name}</span>
              </li>
            ))}
          </ul>
        ),
    },
    { label: '근무시간', value: details.workHours.trim() || '정보 없음' },
    { label: '기간/요일', value: details.periodAndDays.trim() || '정보 없음' },
    { label: '지원방법', value: details.applicationMethod.trim() || '정보 없음' },
    { label: '마감일', value: details.deadline.trim() || '정보 없음' },
  ];

  return (
    <dl className="border-alba-detail-border bg-alba-white space-y-3.5 rounded-xl border px-[60px] py-6">
      {rows
        .filter(({ label }) => label !== '인근지하철' || details.stations.length > 0)
        .map(({ label, value }) => (
          <div
            key={label}
            className="text-body-14r grid grid-cols-[112px_minmax(0,1fr)] items-start"
          >
            <dt className="text-body-14b text-alba-gray-400">{label}</dt>
            <dd className="text-alba-gray-800 min-w-0 wrap-anywhere">{value}</dd>
          </div>
        ))}
    </dl>
  );
}

export default JobRowDetails;
