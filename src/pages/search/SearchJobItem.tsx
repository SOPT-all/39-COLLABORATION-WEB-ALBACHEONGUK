import { useState } from 'react';
import JobRow from '../../components/JobRow.tsx';
import JobRowDetails from '../../components/JobRowDetails.tsx';
import { useJobScrap } from '../../hooks/useJobScrap.ts';
import { getJobDeadlineText } from '../../utils/jobDeadline.ts';
import type { SearchJob } from './searchJobs.ts';

function SearchJobItem({ item, recommended = false }: { item: SearchJob; recommended?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const { isScrapped, toggleScrap } = useJobScrap(item.job.id);
  const { job } = item;

  return (
    <JobRow
      job={job}
      variant={recommended ? 'recommended' : item.tier ? 'highlighted' : 'default'}
      showThumbnail={item.tier === 'premium'}
      isExpanded={expanded}
      isScrapped={isScrapped}
      onToggleExpand={() => setExpanded((value) => !value)}
      onToggleScrap={toggleScrap}
    >
      <JobRowDetails
        details={{
          category: item.subcategory,
          address: item.address,
          stations: [],
          workHours: job.workHours,
          periodAndDays: [item.period, job.workDays].join(', '),
          applicationMethod: '',
          deadline: getJobDeadlineText(job.deadlineDate),
        }}
      />
    </JobRow>
  );
}

export default SearchJobItem;
