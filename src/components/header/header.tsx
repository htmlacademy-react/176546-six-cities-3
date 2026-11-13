import Logo from '@/components/logo/logo';
import Nav from '@/components/header/nav';

type HeaderProps = {
  showNav?: boolean;
};

function Header({ showNav = true }: HeaderProps): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo type="header" />
          </div>
          {showNav && <Nav />}
        </div>
      </div>
    </header>
  );
}

export default Header;
