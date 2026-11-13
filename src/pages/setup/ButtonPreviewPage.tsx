import RectButton from '../../components/RectButton.tsx';
import RoundButton from '../../components/RoundButton.tsx';
import TextImage from '../../components/TextImage.tsx';
import resumeRegisterText from '../../assets/text/button/resume-register.svg';
import jobRegisterText from '../../assets/text/button/job-register.svg';
import applyText from '../../assets/text/button/apply.svg';
import cancelText from '../../assets/text/button/cancel.svg';

function ButtonPreviewPage() {
  return (
    <main className="flex flex-col gap-10 p-10">
      <section className="flex flex-col gap-4">
        <h2 className="text-title-18sb">RoundButton</h2>
        <div className="grid grid-cols-[repeat(4,112px)] gap-4">
          <RoundButton color="yellow" isFullWidth>
            <TextImage src={resumeRegisterText} label="이력서 등록" width={76} height={24} />
          </RoundButton>
          <RoundButton color="blue" isFullWidth>
            <TextImage src={jobRegisterText} label="공고 등록" width={62} height={24} />
          </RoundButton>
          <RoundButton color="blue" isFullWidth disabled>
            <TextImage src={resumeRegisterText} label="이력서 등록" width={76} height={24} />
          </RoundButton>
          <RoundButton color="blue" isFullWidth disabled>
            <TextImage src={jobRegisterText} label="공고 등록" width={62} height={24} />
          </RoundButton>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-title-18sb">RectButton</h2>
        <div className="flex gap-4">
          <div className="w-[148px]">
            <RectButton variant="primary" isFullWidth>
              <TextImage src={applyText} label="적용" width={29} height={24} />
            </RectButton>
          </div>
          <div className="w-[148px]">
            <RectButton variant="secondary" isFullWidth>
              <TextImage src={cancelText} label="취소" width={29} height={24} />
            </RectButton>
          </div>
          <div className="w-[148px]">
            <RectButton variant="primary" isFullWidth disabled>
              <TextImage src={applyText} label="적용" width={29} height={24} />
            </RectButton>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ButtonPreviewPage;
