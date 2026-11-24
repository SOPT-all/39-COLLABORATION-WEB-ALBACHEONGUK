import resumeContinueText from '../../assets/text/button/resume-continue.svg';
import resumeEditText from '../../assets/text/button/resume-edit.svg';
import resumeWriteText from '../../assets/text/button/resume-write.svg';

// 이력서 안내 버튼 문구(HG굴린꼬딕씨)를 SVG와 크기로 연결. 홈·검색 이력서 매칭에서 함께 씁니다.
export const RESUME_ACTION_TEXT: Record<string, { src: string; width: number }> = {
  '이력서 작성하기': { src: resumeWriteText, width: 103 },
  '이력서 이어서 작성하기': { src: resumeContinueText, width: 150 },
  '이력서 수정하기': { src: resumeEditText, width: 103 },
};
