import Navbar from '@components/mui/nabvar';
import type { IMainNavbar } from '@type/components/layout/MainNavbar';
import './layout.css';

const MainNavbar = ({ children }: IMainNavbar): JSX.Element => {
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
        settings={['Peliculas', 'Favoritos']}
      />
      <main className="containerPrincipal">{children}</main>
    </>
  );
};

export default MainNavbar;
