import { Link } from 'react-router';
import Header from '../../components/Header.tsx';
import { useMockSessionStore } from '../../stores/useMockSessionStore.ts';

function HeaderPreviewPage() {
  const isSignedIn = useMockSessionStore((state) => state.isSignedIn);
  const resumeStatus = useMockSessionStore((state) => state.resumeStatus);
  const setResumeStatus = useMockSessionStore((state) => state.setResumeStatus);
  const setSignedIn = useMockSessionStore((state) => state.setSignedIn);

  return (
    <>
      <Header />
      <main className="flex flex-col items-start gap-4">
        <h1 className="text-display-24sb">공통 헤더 확인</h1>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isSignedIn}
            onChange={(event) => setSignedIn(event.target.checked)}
          />
          목업 로그인 상태
        </label>
        {isSignedIn && (
          <label className="flex items-center gap-2">
            목업 이력서 상태
            <select
              value={resumeStatus}
              onChange={(event) => {
                const status = event.target.value;
                if (status === 'ready' || status === 'none' || status === 'draft') {
                  setResumeStatus(status);
                }
              }}
              className="rounded-lg border border-alba-gray-300 px-3 py-1"
            >
              <option value="ready">이력서 등록 완료</option>
              <option value="none">이력서 없음</option>
              <option value="draft">이력서 작성 중</option>
            </select>
          </label>
        )}
        <Link className="text-alba-blue-700 underline" to="/search?keyword=카페">
          검색 결과 헤더 확인
        </Link>
      </main>
    </>
  );
}

export default HeaderPreviewPage;
