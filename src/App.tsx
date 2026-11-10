import { Route, Routes } from 'react-router';
import HomePage from './pages/home/HomePage.tsx';
import SearchPage from './pages/search/SearchPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';
import SetupPage from './pages/setup/SetupPage.tsx';
import Layout from './components/Layout.tsx';
import JobRowPreviewPage from './pages/setup/JobRowPreviewPage.tsx';
import JobRowDesignAuditPage from './pages/setup/JobRowDesignAuditPage.tsx';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
        {import.meta.env.DEV && <Route path="setup/job-row" element={<JobRowPreviewPage />} />}
        {import.meta.env.DEV && (
          <Route path="setup/job-row/design" element={<JobRowDesignAuditPage />} />
        )}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      {/* Query·Zustand 세팅 확인용 임시 화면*/}
      <Route path="setup" element={<SetupPage />} />
    </Routes>
  );
}

export default App;
