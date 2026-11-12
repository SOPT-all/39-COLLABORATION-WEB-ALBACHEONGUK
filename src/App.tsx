import { Route, Routes } from 'react-router';
import HomePage from './pages/home/HomePage.tsx';
import SearchPage from './pages/search/SearchPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';
import SetupPage from './pages/setup/SetupPage.tsx';
import Layout from './components/Layout.tsx';
import JobRowPreviewPage from './pages/setup/JobRowPreviewPage.tsx';
import JobRowDesignAuditPage from './pages/setup/JobRowDesignAuditPage.tsx';
import JobCardPreviewPage from './pages/setup/JobCardPreviewPage.tsx';
import ResumeSelectorPreviewPage from './pages/setup/ResumeSelectorPreviewPage.tsx';

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
          <Route path="setup/resume-selector" element={<ResumeSelectorPreviewPage />} />
        )}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      {/* Query·Zustand 세팅 확인용 임시 화면*/}
      <Route path="setup" element={<SetupPage />} />
    </Routes>
  );
}

export default App;
