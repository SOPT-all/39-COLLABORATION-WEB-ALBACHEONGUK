import RectButton from '../../components/RectButton.tsx';
import RoundButton from '../../components/RoundButton.tsx';

function ButtonPreviewPage() {
  return (
    <main className="flex flex-col gap-10 p-10">
      <section className="flex flex-col gap-4">
        <h2 className="text-title-18sb">RoundButton</h2>
        <div className="grid grid-cols-[repeat(4,112px)] gap-4">
          <RoundButton color="yellow" isFullWidth>
            이력서 등록
          </RoundButton>
          <RoundButton color="blue" isFullWidth>
            공고 등록
          </RoundButton>
          <RoundButton color="yellow" isFullWidth disabled>
            이력서 등록
          </RoundButton>
          <RoundButton color="blue" isFullWidth disabled>
            공고 등록
          </RoundButton>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-title-18sb">RectButton</h2>
        <div className="flex gap-4">
          <div className="w-[148px]">
            <RectButton variant="primary" isFullWidth>
              적용
            </RectButton>
          </div>
          <div className="w-[148px]">
            <RectButton variant="secondary" isFullWidth>
              취소
            </RectButton>
          </div>
          <div className="w-[148px]">
            <RectButton variant="primary" isFullWidth disabled>
              적용
            </RectButton>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ButtonPreviewPage;