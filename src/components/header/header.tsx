import Logo from '@/components/logo/logo.tsx';
import Nav from '@/components/header/nav';

function Header(): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo type="header" />
          </div>
          <Nav />
        </div>
      </div>
    </header>
  );
}

export default Header;
