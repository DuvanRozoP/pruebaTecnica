import { FC } from 'react';
import { useFavorite } from '@context/Favorites';
import ButtonReset from '@components/feature/movie/resetButton';
import CardMovie from '@components/feature/movie/cardMovie';
import PaginationOutlined from '@components/mui/pagination';
import MainNavbar from '@components/layout/MainNavbar';
import './pages.css';
import SelectAscDsc from '@components/feature/movie/selectAscDsc';
import CircularIndeterminate from '@components/mui/loading';

const Favorite: FC = () => {
  const {
    currentPage,
    favorites,
    totalPage,
    reset,
    setCurrentPage,
    setOrderByActors,
    getSearchByTitle,
  } = useFavorite();

  const hanldePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortByActores = (value: 'asc' | 'desc' | 'none') => {
    setOrderByActors(value);
  };

  const handleSearchMovie = (value: string) => {
    getSearchByTitle(value);
  };

  const handleReset = () => {
    reset();
  };

  if (!favorites.length) return <CircularIndeterminate />;

  return (
    <MainNavbar callBack={handleSearchMovie}>
      <section className="Favorite">
        <nav className="minNavbar">
          <ButtonReset handleReset={handleReset} />
          <SelectAscDsc onChangeSelect={handleSortByActores} />
        </nav>
        <CardMovie dataSet={favorites} />
        <PaginationOutlined
          totalPages={totalPage}
          currentPage={currentPage}
          handlePageChange={hanldePageChange}
        />
      </section>
    </MainNavbar>
  );
};

export default Favorite;
