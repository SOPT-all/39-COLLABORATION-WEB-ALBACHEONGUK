import MainProfileCard from '../../components/MainProfileCard.tsx';

const MOCK_USER = { name: '정윤성', availableJobCount: 58188 };

function MainProfileCardPreviewPage() {
  return (
    <div className="bg-alba-gray-200 flex flex-col gap-6 p-8">
      <h1 className="text-display-24sb">메인 프로필 카드</h1>
      <div className="flex flex-wrap items-start gap-6">
        <MainProfileCard user={null} />
        <MainProfileCard user={MOCK_USER} />
      </div>
    </div>
  );
}

export default MainProfileCardPreviewPage;
