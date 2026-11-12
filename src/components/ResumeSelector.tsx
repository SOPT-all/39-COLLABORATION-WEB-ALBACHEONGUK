import folderIcon from '../assets/icons/resume-selector/ic_document.svg';
import myResumeText from '../assets/text/resume/my-resume.svg';

import TextImage from './TextImage.tsx';

type Resume = {
  id: string;
  title: string;
  desiredRegion: string;
};

type ResumeSelectorProps = {
  resumes: Resume[];
  selectedResumeId: string;
};

function ResumeSelector({ resumes, selectedResumeId }: ResumeSelectorProps) {
  const selectedResume = resumes.find((resume) => resume.id === selectedResumeId);

  return (
    <section
      aria-label="내 이력서 선택"
      className="inline-flex w-fit items-center gap-12 rounded-lg bg-alba-gray-200 px-4 py-3"
    >
      <div className="flex items-center gap-2 text-alba-gray-600">
        <img src={folderIcon} alt="" className="size-7" />
        <TextImage src={myResumeText} label="내 이력서" width={62} height={24} />
      </div>
      <p className="font-pretendard text-body-14r text-alba-gray-400">{selectedResume?.title}</p>
      <p className="flex items-center gap-1 font-pretendard text-body-14r">
        <span className="text-alba-gray-400">희망 근무지역</span>
        <span className="text-alba-black">{selectedResume?.desiredRegion}</span>
      </p>
    </section>
  );
}

export default ResumeSelector;
