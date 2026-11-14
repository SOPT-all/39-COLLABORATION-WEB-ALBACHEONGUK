import { Link } from 'react-router';
import Header from '../../components/Header.tsx';
import { useMockSessionStore } from '../../stores/useMockSessionStore.ts';

function HeaderPreviewPage() {
  const isSignedIn = useMockSessionStore((state) => state.isSignedIn);
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
        <Link className="text-alba-blue-700 underline" to="/search">
          검색 결과 헤더 확인
        </Link>
      </main>
    </>
  );
}

export default HeaderPreviewPage;
