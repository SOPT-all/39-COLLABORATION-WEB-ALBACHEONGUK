import type { FormEvent } from 'react';
import { useSearchParams } from 'react-router';
import { useJobs } from '../../hooks/useJobs.ts';
import { useLoginGuideStore } from '../../stores/useLoginGuideStore.ts';

function SetupHeader() {
  const openGuide = useLoginGuideStore((state) => state.open);

  return (
    <header>
      <h1>알바천국 초기 세팅 확인</h1>
      <button type="button" onClick={openGuide}>
        로그인 안내 보기
      </button>
    </header>
  );
}

function RecommendationGuide() {
  const openGuide = useLoginGuideStore((state) => state.open);

  return (
    <section aria-label="추천 안내">
      <h2>이력서 기반 추천 안내</h2>
      <p>초기 세팅용 안내입니다. 로그인과 추천 API는 아직 연결하지 않았습니다.</p>
      <button type="button" onClick={openGuide}>
        추천 이용을 위한 로그인 안내
      </button>
    </section>
  );
}

function LoginGuide() {
  const isOpen = useLoginGuideStore((state) => state.isOpen);
  const closeGuide = useLoginGuideStore((state) => state.close);

  if (!isOpen) return null;

  return (
    <aside aria-label="로그인 안내">
      <p>로그인이 필요한 기능입니다. 실제 로그인 이동은 후속 작업에서 연결합니다.</p>
      <button type="button" onClick={closeGuide}>
        안내 닫기
      </button>
    </aside>
  );
}

function JobSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = (searchParams.get('keyword') ?? '').trim();
  const jobsQuery = useJobs({ keyword });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nextKeyword = String(formData.get('keyword') ?? '').trim();
    const nextParams = new URLSearchParams(searchParams);

    if (nextKeyword) {
      nextParams.set('keyword', nextKeyword);
    } else {
      nextParams.delete('keyword');
    }

    setSearchParams(nextParams);
  }

  return (
    <section aria-label="공고 검색">
      <h2>공고 목록 · 예시 데이터</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="keyword">검색어</label>
        <input
          key={keyword}
          id="keyword"
          name="keyword"
          defaultValue={keyword}
          placeholder="카페 또는 편의점"
        />
        <button type="submit">검색</button>
      </form>

      {jobsQuery.isPending ? (
        <p role="status">공고를 불러오는 중입니다.</p>
      ) : jobsQuery.isError ? (
        <div role="alert">
          <p>{jobsQuery.error.message}</p>
          <button type="button" onClick={() => void jobsQuery.refetch()}>
            다시 시도
          </button>
        </div>
      ) : jobsQuery.data.length === 0 ? (
        <p>검색 결과가 없습니다.</p>
      ) : (
        <ul>
          {jobsQuery.data.map((job) => (
            <li key={job.id}>
              {job.title} · {job.companyName}
            </li>
          ))}
        </ul>
      )}

      {jobsQuery.isFetching && !jobsQuery.isPending && (
        <p role="status">목록을 갱신하는 중입니다.</p>
      )}
    </section>
  );
}

function SetupPage() {
  return (
    <>
      <SetupHeader />
      <main>
        <p>실제 API·로그인 연동 전, 도구 연결을 확인하는 임시 화면입니다.</p>
        <RecommendationGuide />
        <LoginGuide />
        <JobSearch />
      </main>
    </>
  );
}

export default SetupPage;
