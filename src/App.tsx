import { Route, Routes } from 'react-router';
import HomePage from './pages/home/HomePage.tsx';
import SearchPage from './pages/search/SearchPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';
import SetupPage from './pages/setup/SetupPage.tsx';
import Layout from './components/Layout.tsx';
import JobRowPreviewPage from './pages/setup/JobRowPreviewPage.tsx';
import JobRowDesignAuditPage from './pages/setup/JobRowDesignAuditPage.tsx';
import JobCardPreviewPage from './pages/setup/JobCardPreviewPage.tsx';
import PopularSearchesPreviewPage from './pages/setup/PopularSearchesPreviewPage.tsx';
import SalaryTextPreviewPage from './pages/setup/SalaryTextPreviewPage.tsx';
import ScrapButtonPreviewPage from './pages/setup/ScrapButtonPreviewPage.tsx';
import SearchBarPreviewPage from './pages/setup/SearchBarPreviewPage.tsx';
import SelectChipPreviewPage from './pages/setup/SelectChipPreviewPage.tsx';

const canShowComponentPreview =
  import.meta.env.DEV || import.meta.env.VITE_ENABLE_COMPONENT_PREVIEW === 'true';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
        {canShowComponentPreview && <Route path="setup/job-row" element={<JobRowPreviewPage />} />}
        {canShowComponentPreview && (
          <Route path="setup/job-row/design" element={<JobRowDesignAuditPage />} />
        )}
        {canShowComponentPreview && (
          <Route path="setup/job-card" element={<JobCardPreviewPage />} />
        )}
        {canShowComponentPreview && (
          <Route path="setup/popular-searches" element={<PopularSearchesPreviewPage />} />
        )}
        {canShowComponentPreview && (
          <Route path="setup/salary-text" element={<SalaryTextPreviewPage />} />
        )}
        {canShowComponentPreview && (
          <Route path="setup/scrap-button" element={<ScrapButtonPreviewPage />} />
        )}
        {canShowComponentPreview && (
          <Route path="setup/search-bar" element={<SearchBarPreviewPage />} />
        )}
        {canShowComponentPreview && (
          <Route path="setup/select-chip" element={<SelectChipPreviewPage />} />
        )}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      {/* Query·Zustand 세팅 확인용 임시 화면*/}
      <Route path="setup" element={<SetupPage />} />
    </Routes>
  );
}

export default App;
