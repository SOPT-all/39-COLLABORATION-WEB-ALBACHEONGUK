import { useState } from 'react';
import heroBackground from '../../assets/images/home/hero-background.png';
import heroTitleBottom from '../../assets/text/home/hero-title-bottom.svg';
import heroTitleTop from '../../assets/text/home/hero-title-top.svg';
import MoneyFilter from '../../components/Dropdown/MoneyFilter.tsx';
import FilterTags from '../../components/FilterTags.tsx';
import JobCategoryFilter from '../../components/JobCategoryFilter.tsx';
import MainProfileCard from '../../components/MainProfileCard.tsx';
import PopularSearches from '../../components/PopularSearches.tsx';
import RegionFilter from '../../components/RegionFilter.tsx';
import SearchBar from '../../components/SearchBar.tsx';
import WorkConditionFilter from '../../components/WorkConditionFilter.tsx';
import { POPULAR_SEARCHES, POPULAR_SEARCH_UPDATE_DATE } from '../../data/popularSearches.ts';
import type { FilterParams } from '../../hooks/useFilterParams.ts';
import {
  getSearchFilterTags,
  removeSearchFilterTag,
  resetSearchFilters,
} from '../search/searchFilterTags.ts';
import { useMyProfile } from './useMyProfile.ts';

type HomeSearchProps = {
  isSignedIn: boolean;
  onSearch: (value: string, filters: URLSearchParams) => void;
};

function HomeSearch({ isSignedIn, onSearch }: HomeSearchProps) {
  const [keyword, setKeyword] = useState('');
  const [params, setParams] = useState(() => new URLSearchParams());
  const filterParams: FilterParams = [params, setParams];
  const tags = getSearchFilterTags(params);
  const profileQuery = useMyProfile(isSignedIn);
  const profile = profileQuery.data;
  const profileUser =
    isSignedIn && profile
      ? { name: profile.name, availableJobCount: profile.ongoingJobCount }
      : null;
  const profileStatus =
    !isSignedIn || profile
      ? undefined
      : profileQuery.isError && !profileQuery.isFetching
        ? 'error'
        : 'loading';

  return (
    <section aria-labelledby="home-search-title" className="relative pb-6 lg:pt-6 lg:pb-0">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[3px] inset-x-0 h-[396px] bg-top bg-no-repeat"
        style={{
          backgroundImage: `url(${heroBackground}), linear-gradient(#ffffff, #fff6dd)`,
        }}
      />
      <div className="relative mx-auto grid w-[calc(100%-2rem)] max-w-[1260px] items-end gap-5 pt-12 lg:min-h-[412px] lg:grid-cols-[minmax(0,1fr)_302px] lg:pt-0">
        <div className="min-w-0 space-y-6">
          <h1 id="home-search-title" className="px-3">
            <span className="mb-1 flex h-7 items-center">
              <img src={heroTitleTop} alt="여기는 돈 버는 천국," width={162} height={20} />
            </span>
            <span className="flex h-[45px] items-center lg:h-14">
              <img
                src={heroTitleBottom}
                alt="딱 맞는 알바를 찾아보세요"
                width={421}
                height={38}
                className="h-auto max-w-full"
              />
            </span>
          </h1>
          <div className="bg-alba-white border-alba-gray-300 rounded-[20px] border shadow-[0_-2px_10px_rgba(73,38,17,0.05)]">
            <div className="space-y-3 px-5 pt-4 pb-3">
              <SearchBar
                value={keyword}
                onValueChange={setKeyword}
                onSearch={(value) => onSearch(value, params)}
                hasSelectedFilters={tags.length > 0}
              />
              <div aria-label="검색 필터" className="flex flex-wrap gap-2">
                <RegionFilter overlay width={194} filterParams={filterParams} />
                <JobCategoryFilter overlay width={194} filterParams={filterParams} />
                <WorkConditionFilter overlay width={194} filterParams={filterParams} />
                <MoneyFilter overlay width={194} filterParams={filterParams} />
              </div>
              <FilterTags
                tags={tags}
                onRemove={(tag) => setParams((current) => removeSearchFilterTag(current, tag))}
                onReset={() => setParams(resetSearchFilters)}
              />
            </div>
            <PopularSearches
              variant="home"
              items={POPULAR_SEARCHES}
              updatedOn={POPULAR_SEARCH_UPDATE_DATE}
              onSelect={(value) => onSearch(value, params)}
            />
          </div>
        </div>
        <MainProfileCard
          user={profileUser}
          status={profileStatus}
          onRetry={() => void profileQuery.refetch()}
        />
      </div>
    </section>
  );
}

export default HomeSearch;
