import { Link } from 'react-router';

function Header() {
  return (
    <header>
      <nav>
        <Link to="/">홈</Link> {' | '} <Link to="/search">검색 결과</Link>
      </nav>
    </header>
  );
}

export default Header;
