import { Outlet } from 'react-router';
import Header from './Header.tsx';

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
