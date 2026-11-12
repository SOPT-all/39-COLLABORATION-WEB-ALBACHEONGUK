import { useState } from 'react';
import ResumeSelector from '../../components/ResumeSelector.tsx';

const MOCK_RESUMES = [
  { id: 'winter', title: '26년 겨울 알바 이력서', desiredRegion: '강남구' },
  { id: 'store', title: '편의점용 이력서', desiredRegion: '마포구' },
];

function ResumeSelectorPreviewPage() {
  const [selectedResumeId, setSelectedResumeId] = useState('winter');

  return (
    <main className="flex flex-col gap-4 p-10">
      <h2 className="text-title-18sb">ResumeSelector</h2>
      <ResumeSelector resumes={MOCK_RESUMES} selectedResumeId={selectedResumeId} />
      <div className="flex gap-2">
        {MOCK_RESUMES.map((resume) => (
          <button
            key={resume.id}
            type="button"
            onClick={() => setSelectedResumeId(resume.id)}
            className="cursor-pointer rounded border border-alba-gray-300 px-3 py-1 text-body-14r"
          >
            {resume.title} 선택
          </button>
        ))}
      </div>
    </main>
  );
}

export default ResumeSelectorPreviewPage;