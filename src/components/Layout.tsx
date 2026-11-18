import { Outlet, useMatch } from 'react-router';
import Header from './Header.tsx';

function Layout() {
  const isSearch = useMatch('/search');
  const isHome = useMatch('/');
  return (
    <>
      <Header />
      <main className={isSearch || isHome ? 'full-width-page' : undefined}>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
