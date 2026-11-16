import { Outlet, useMatch } from 'react-router';
import Header from './Header.tsx';

function Layout() {
  const isSearch = useMatch('/search');
  return (
    <>
      <Header />
      <main className={isSearch ? 'search-page-main' : undefined}>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
