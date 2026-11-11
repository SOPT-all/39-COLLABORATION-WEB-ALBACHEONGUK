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
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      {/* Query·Zustand 세팅 확인용 임시 화면*/}
      <Route path="setup" element={<SetupPage />} />
    </Routes>
  );
}

export default App;
