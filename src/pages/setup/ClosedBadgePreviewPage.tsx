import ClosedBadge from '../../components/ClosedBadge.tsx';

function ClosedBadgePreviewPage() {
  return (
    <main className="flex flex-col gap-4 p-10">
      <h1 className="text-display-20sb text-alba-gray-800">마감 배지</h1>
      <div className="bg-alba-gray-300 flex w-[90px] items-center justify-center px-2 py-6">
        <ClosedBadge />
      </div>
    </main>
  );
}

export default ClosedBadgePreviewPage;
