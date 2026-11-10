import { useState } from 'react';

import JobRow from '../../components/JobRow.tsx';
import JobRowDetails from '../../components/JobRowDetails.tsx';

import { DESIGN_DETAILS, DESIGN_JOB, JOB_ROW_DESIGN_CASES } from './jobRowDesignCases.ts';

const DESIGN_NOW = new Date('2026-11-10T12:00:00+09:00');

function JobRowDesignAuditPage() {
  const [expandedIds, setExpandedIds] = useState(
    JOB_ROW_DESIGN_CASES.filter((item) => item.expanded).map((item) => item.nodeId),
  );
  const [scrappedIds, setScrappedIds] = useState(
    JOB_ROW_DESIGN_CASES.filter((item) => item.scrapped).map((item) => item.nodeId),
  );

  return (
    <section className="space-y-8" aria-label="피그마 공고 행 대조">
      <div>
        <h1 className="text-display-24sb">공고 행 디자인 대조</h1>
        <p className="text-body-14r text-alba-gray-500">
          피그마 14개 variant와 동일한 문구·원본 폭으로 비교하는 개발용 화면입니다. 원본의 상태
          모순과 정책 차이는 검수 문서에 기록합니다.
        </p>
      </div>
      {JOB_ROW_DESIGN_CASES.map((item) => (
        <section key={item.nodeId} className="space-y-2" aria-label={item.nodeId}>
          <h2 className="text-body-14b">
            {item.nodeId} · {item.label}
          </h2>
          <div className="overflow-x-auto">
            <div style={{ width: item.width }}>
              <JobRow
                job={{ ...DESIGN_JOB, id: item.nodeId, isClosed: item.closed }}
                variant={item.variant}
                showThumbnail={item.showThumbnail}
                referenceNow={DESIGN_NOW}
                isExpanded={expandedIds.includes(item.nodeId)}
                isScrapped={scrappedIds.includes(item.nodeId)}
                onToggleExpand={() =>
                  setExpandedIds((ids) =>
                    ids.includes(item.nodeId)
                      ? ids.filter((id) => id !== item.nodeId)
                      : [...ids, item.nodeId],
                  )
                }
                onToggleScrap={() =>
                  setScrappedIds((ids) =>
                    ids.includes(item.nodeId)
                      ? ids.filter((id) => id !== item.nodeId)
                      : [...ids, item.nodeId],
                  )
                }
              >
                <JobRowDetails details={DESIGN_DETAILS} />
              </JobRow>
            </div>
          </div>
        </section>
      ))}
    </section>
  );
}

export default JobRowDesignAuditPage;
