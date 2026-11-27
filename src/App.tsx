import { Route, Routes } from 'react-router';
import HomePage from './pages/home/HomePage.tsx';
import SearchPage from './pages/search/SearchPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';
import Layout from './components/Layout.tsx';
import SetupPage from './pages/setup/SetupPage.tsx';
import HeaderPreviewPage from './pages/setup/HeaderPreviewPage.tsx';
import { COMPONENT_PREVIEW_ROUTES } from './pages/setup/previewRoutes.tsx';

const canShowComponentPreview =
  import.meta.env.DEV || import.meta.env.VITE_ENABLE_COMPONENT_PREVIEW === 'true';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
        {canShowComponentPreview &&
          COMPONENT_PREVIEW_ROUTES.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      {canShowComponentPreview && <Route path="setup/header" element={<HeaderPreviewPage />} />}
      {canShowComponentPreview && <Route path="setup" element={<SetupPage />} />}
    </Routes>
  );
}

export default App;
