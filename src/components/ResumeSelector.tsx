import folderIcon from '../assets/icons/resume-selector/ic_document.svg';
import triangleDownIcon from '../assets/icons/triangle.svg';
import myResumeText from '../assets/text/resume/my-resume.svg';

import TextImage from './TextImage.tsx';

export type Resume = {
  id: string;
  title: string;
  desiredRegion: string;
  updatedAt?: string;
};

type ResumeSelectorProps = {
  resumes: Resume[];
  selectedResumeId: string;
  onSelectResume?: (id: string) => void;
  showRegion?: boolean;
};

function ResumeSelector({
  resumes,
  selectedResumeId,
  onSelectResume,
  showRegion = true,
}: ResumeSelectorProps) {
  const selectedResume = resumes.find((resume) => resume.id === selectedResumeId);

  return (
    <section
      aria-label="내 이력서 선택"
      className={`bg-alba-gray-200 flex max-w-full flex-wrap items-center justify-between gap-x-2 gap-y-2 rounded-lg px-4 py-3 ${showRegion ? 'w-[466px]' : 'w-[301px]'}`}
    >
      <div className="flex min-w-0 items-center gap-6">
        <div className="text-alba-gray-600 flex shrink-0 items-center gap-2">
          <img src={folderIcon} alt="" width={28} height={28} />
          <TextImage src={myResumeText} label="내 이력서" width={62} height={24} />
        </div>
        <div className="relative flex h-7 w-[147px] min-w-0 items-center rounded-sm focus-within:outline-alba-blue-600 focus-within:outline-2">
          <span
            aria-hidden={onSelectResume ? true : undefined}
            title={selectedResume?.title}
            className="text-body-14r text-alba-gray-600 min-w-0 flex-1 truncate"
          >
            {selectedResume?.title}
          </span>
          <img src={triangleDownIcon} alt="" width={24} height={24} className="shrink-0" />
          {onSelectResume && (
            <select
              aria-label="기준 이력서"
              value={selectedResumeId}
              onChange={(event) => onSelectResume(event.target.value)}
              className="absolute inset-0 size-full cursor-pointer opacity-0"
            >
              {resumes.map((resume) => (
                <option key={resume.id} value={resume.id}>
                  {resume.title}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
      {showRegion && (
        <p className="text-body-14r flex min-w-0 items-center gap-1">
          <span className="text-alba-gray-600 shrink-0">희망 근무지역</span>
          <span className="text-alba-black truncate" title={selectedResume?.desiredRegion}>
            {selectedResume?.desiredRegion}
          </span>
        </p>
      )}
    </section>
  );
}

export default ResumeSelector;
