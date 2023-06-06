import Navbar from '@components/mui/nabvar';
import type { IMainNavbar } from '@type/components/layout/MainNavbar';
import './layout.css';

const MainNavbar = ({ children, callBack }: IMainNavbar): JSX.Element => {
  const routes = [
    {
      name: 'Pelicular',
      path: '/',
    },
    {
      name: 'Favoritos',
      path: '/favorite',
    },
  ];
  return (
    <>
      <Navbar pages={routes} handleSearch={callBack} settings={routes} />

      <main className="containerPrincipal">{children}</main>
    </>
  );
};

export default MainNavbar;
