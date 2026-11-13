import { Route, Routes } from 'react-router';
import HomePage from './pages/home/HomePage.tsx';
import SearchPage from './pages/search/SearchPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';
import SetupPage from './pages/setup/SetupPage.tsx';
import Layout from './components/Layout.tsx';
import ButtonPreviewPage from './pages/setup/ButtonPreviewPage.tsx';
import InputPreviewPage from './pages/setup/InputPreviewPage.tsx';
import CheckboxPreviewPage from './pages/setup/CheckboxPreviewPage.tsx';
import RadioPreviewPage from './pages/setup/RadioPreviewPage.tsx';
import JobRowPreviewPage from './pages/setup/JobRowPreviewPage.tsx';
import JobRowDesignAuditPage from './pages/setup/JobRowDesignAuditPage.tsx';
import JobCardPreviewPage from './pages/setup/JobCardPreviewPage.tsx';
import PopularSearchesPreviewPage from './pages/setup/PopularSearchesPreviewPage.tsx';
import SalaryTextPreviewPage from './pages/setup/SalaryTextPreviewPage.tsx';
import ScrapButtonPreviewPage from './pages/setup/ScrapButtonPreviewPage.tsx';
import SelectChipPreviewPage from './pages/setup/SelectChipPreviewPage.tsx';

const canShowComponentPreview =
  import.meta.env.DEV || import.meta.env.VITE_ENABLE_COMPONENT_PREVIEW === 'true';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
        {canShowComponentPreview && <Route path="setup/button" element={<ButtonPreviewPage />} />}
        {canShowComponentPreview && <Route path="setup/input" element={<InputPreviewPage />} />}
        {canShowComponentPreview && (
          <Route path="setup/checkbox" element={<CheckboxPreviewPage />} />
        )}
        {canShowComponentPreview && <Route path="setup/radio" element={<RadioPreviewPage />} />}
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
