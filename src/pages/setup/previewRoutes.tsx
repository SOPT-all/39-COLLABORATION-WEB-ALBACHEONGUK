import DropdownPreviewPage from './DropdownPreviewPage.tsx';
import ButtonPreviewPage from './ButtonPreviewPage.tsx';
import InputPreviewPage from './InputPreviewPage.tsx';
import CheckboxPreviewPage from './CheckboxPreviewPage.tsx';
import RadioPreviewPage from './RadioPreviewPage.tsx';
import JobRowPreviewPage from './JobRowPreviewPage.tsx';
import JobRowDesignAuditPage from './JobRowDesignAuditPage.tsx';
import JobCardPreviewPage from './JobCardPreviewPage.tsx';
import ResumeSelectorPreviewPage from './ResumeSelectorPreviewPage.tsx';
import ClosedBadgePreviewPage from './ClosedBadgePreviewPage.tsx';
import FilterTagsPreviewPage from './FilterTagsPreviewPage.tsx';
import MainProfileCardPreviewPage from './MainProfileCardPreviewPage.tsx';
import SelectListItemPreviewPage from './SelectListItemPreviewPage.tsx';
import PopularSearchesPreviewPage from './PopularSearchesPreviewPage.tsx';
import RecommendPreviewPage from './RecommendPreviewPage.tsx';
import SalaryTextPreviewPage from './SalaryTextPreviewPage.tsx';
import ScrapButtonPreviewPage from './ScrapButtonPreviewPage.tsx';
import SearchBarPreviewPage from './SearchBarPreviewPage.tsx';
import RecentSearchesPreviewPage from './RecentSearchesPreviewPage.tsx';
import SelectChipPreviewPage from './SelectChipPreviewPage.tsx';

export const COMPONENT_PREVIEW_ROUTES = [
  { path: 'setup/dropdown', element: <DropdownPreviewPage /> },
  { path: 'setup/button', element: <ButtonPreviewPage /> },
  { path: 'setup/input', element: <InputPreviewPage /> },
  { path: 'setup/checkbox', element: <CheckboxPreviewPage /> },
  { path: 'setup/radio', element: <RadioPreviewPage /> },
  { path: 'setup/job-row', element: <JobRowPreviewPage /> },
  { path: 'setup/job-row/design', element: <JobRowDesignAuditPage /> },
  { path: 'setup/job-card', element: <JobCardPreviewPage /> },
  { path: 'setup/closed-badge', element: <ClosedBadgePreviewPage /> },
  { path: 'setup/filter-tags', element: <FilterTagsPreviewPage /> },
  { path: 'setup/main-profile-card', element: <MainProfileCardPreviewPage /> },
  { path: 'setup/popular-searches', element: <PopularSearchesPreviewPage /> },
  { path: 'setup/salary-text', element: <SalaryTextPreviewPage /> },
  { path: 'setup/scrap-button', element: <ScrapButtonPreviewPage /> },
  { path: 'setup/search-bar', element: <SearchBarPreviewPage /> },
  { path: 'setup/recent-searches', element: <RecentSearchesPreviewPage /> },
  { path: 'setup/select-chip', element: <SelectChipPreviewPage /> },
  { path: 'setup/recommend', element: <RecommendPreviewPage /> },
  { path: 'setup/select-list-item', element: <SelectListItemPreviewPage /> },
  { path: 'setup/resume-selector', element: <ResumeSelectorPreviewPage /> },
];
