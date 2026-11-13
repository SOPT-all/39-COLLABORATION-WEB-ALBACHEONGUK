import { Outlet } from 'react-router';
import Header from './Header.tsx';

type LayoutProps = {
  isSignedIn?: boolean;
};

function Layout({ isSignedIn = false }: LayoutProps) {
  return (
    <>
      <Header isSignedIn={isSignedIn} />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
