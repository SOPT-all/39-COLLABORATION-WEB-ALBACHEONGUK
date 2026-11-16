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
      className="inline-flex w-fit max-w-full flex-wrap items-center gap-x-12 gap-y-2 rounded-lg bg-alba-gray-200 px-4 py-3"
    >
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-alba-gray-600">
          <img src={folderIcon} alt="" className="size-7" />
          <TextImage src={myResumeText} label="내 이력서" width={62} height={24} />
        </div>
        {onSelectResume ? (
          <div className="relative flex items-center">
            <select
              aria-label="기준 이력서"
              value={selectedResumeId}
              onChange={(event) => onSelectResume(event.target.value)}
              className="font-pretendard text-body-14r text-alba-gray-600 max-w-[230px] min-w-0 cursor-pointer appearance-none truncate bg-transparent pr-6"
            >
              {resumes.map((resume) => (
                <option key={resume.id} value={resume.id}>
                  {resume.title}
                </option>
              ))}
            </select>
            <img
              src={triangleDownIcon}
              alt=""
              className="pointer-events-none absolute right-0 size-6"
            />
          </div>
        ) : (
          <div className="flex items-center">
            <p className="font-pretendard text-body-14r text-alba-gray-600">
              {selectedResume?.title}
            </p>
            <span aria-hidden="true" className="size-6" />
          </div>
        )}
      </div>
      {showRegion && (
        <p className="flex items-center gap-1 font-pretendard text-body-14r">
          <span className="text-alba-gray-600">희망 근무지역</span>
          <span className="text-alba-black">{selectedResume?.desiredRegion}</span>
        </p>
      )}
    </section>
  );
}

export default ResumeSelector;
