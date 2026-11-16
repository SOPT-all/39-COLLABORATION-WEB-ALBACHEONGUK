import { useNavigate } from 'react-router';
import albaStories from '../../assets/images/home/alba-stories.png';
import footer from '../../assets/images/home/footer.png';
import { REGIONS } from '../../data/regions.ts';
import { useQaResumeScenario } from '../../hooks/useQaResumeScenario.ts';
import { useRecentSearchStore } from '../../stores/useRecentSearchStore.ts';
import { writeRegionSelection } from '../../utils/regionSelection.ts';
import HomeResumeMatch from './HomeResumeMatch.tsx';
import HomeSearch from './HomeSearch.tsx';
import RecommendArea from './recommend/RecommendArea.tsx';

function HomePage() {
  const navigate = useNavigate();
  const addKeyword = useRecentSearchStore((state) => state.addKeyword);
  const { isSignedIn, qa } = useQaResumeScenario();

  function handleSearch(keyword: string, filters: URLSearchParams) {
    const next = new URLSearchParams(filters);
    if (keyword) {
      next.set('keyword', keyword);
      addKeyword(keyword);
    }
    if (qa) next.set('qa', qa);
    void navigate({ pathname: '/search', search: next.toString() });
  }

  function viewRegion(sido: string) {
    handleSearch(
      '',
      writeRegionSelection(new URLSearchParams(), { sido, guguns: REGIONS[sido] ?? [] }),
    );
  }

  return (
    <>
      <HomeSearch isSignedIn={isSignedIn} onSearch={handleSearch} />
      <HomeResumeMatch key={qa ?? 'default'} />
      <div className="mx-auto w-[calc(100%-2rem)] max-w-[1260px]">
        <RecommendArea onViewRegion={viewRegion} />
      </div>
      <div className="mx-auto max-w-[1512px]">
        <img
          src={albaStories}
          width={1512}
          height={1139}
          alt="알바스토리, 공지사항 및 알바천국 소식"
          loading="lazy"
          className="h-auto w-full"
        />
        <footer>
          <img
            src={footer}
            width={1512}
            height={694}
            alt="알바천국 회사 및 고객센터 안내"
            loading="lazy"
            className="h-auto w-full"
          />
        </footer>
      </div>
    </>
  );
}

export default HomePage;
