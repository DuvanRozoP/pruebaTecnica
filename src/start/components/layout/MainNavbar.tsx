import Navbar from '@components/mui/nabvar';
import type { IMainNavbar } from '@type/components/layout/MainNavbar';
import './layout.css';

const MainNavbar = ({ children, callBack }: IMainNavbar): JSX.Element => {
  return (
    <>
      <Navbar
        pages={[
          {
            name: 'Pelicular',
            path: '/',
          },
          {
            name: 'Favoritos',
            path: '/favorite',
          },
        ]}
        handleSearch={callBack}
        settings={['Peliculas', 'Favoritos']}
      />

      <main className="containerPrincipal">{children}</main>
    </>
  );
};

export default MainNavbar;
