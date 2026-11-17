import { useEffect, useRef, useState } from 'react';
import folderIcon from '../assets/icons/resume-selector/ic_document.svg';
import triangleDownIcon from '../assets/icons/triangle.svg';
import checkIcon from '../assets/icons/check.svg';
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
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleOutsideClick(event: PointerEvent) {
      const target = event.target;

      if (target instanceof Node && dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('pointerdown', handleOutsideClick);

    return () => {
      document.removeEventListener('pointerdown', handleOutsideClick);
    };
  }, [isOpen]);

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
        <div ref={dropdownRef} className="relative flex min-w-0 items-center">
          {onSelectResume ? (
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-7 w-[147px] min-w-0 items-center rounded-sm focus-visible:outline-alba-blue-600 focus-visible:outline-2"
            >
              <span
                title={selectedResume?.title}
                className="text-body-14r text-alba-gray-600 min-w-0 flex-1 truncate text-left"
              >
                {selectedResume?.title}
              </span>
              <img
                src={triangleDownIcon}
                alt=""
                width={24}
                height={24}
                className={`shrink-0 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
          ) : (
            <div className="flex h-7 w-[147px] min-w-0 items-center">
              <span
                title={selectedResume?.title}
                className="text-body-14r text-alba-gray-600 min-w-0 flex-1 truncate"
              >
                {selectedResume?.title}
              </span>
              <img src={triangleDownIcon} alt="" width={24} height={24} className="shrink-0" />
            </div>
          )}
          {onSelectResume && isOpen && (
            <div className="absolute top-full left-[-58px] z-20 mt-1 flex w-[240px] flex-col overflow-hidden rounded-lg border border-alba-gray-300 bg-alba-white">
              {resumes.map((resume) => {
                const isSelected = resume.id === selectedResumeId;

                return (
                  <button
                    key={resume.id}
                    type="button"
                    onClick={() => {
                      onSelectResume(resume.id);
                      setIsOpen(false);
                    }}
                    className={`flex w-full items-center justify-between gap-[10px] py-3 pl-4 ${
                      isSelected
                        ? 'bg-alba-blue-100 pr-3 text-body-16b text-alba-blue-700'
                        : 'bg-alba-white pr-4 text-body-16r text-alba-gray-800'
                    }`}
                  >
                    <span className="w-[180px] truncate text-left">{resume.title}</span>
                    {isSelected && (
                      <img src={checkIcon} alt="" className="size-[20px] shrink-0 object-none" />
                    )}
                  </button>
                );
              })}
            </div>
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
