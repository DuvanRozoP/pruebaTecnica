import { FC } from 'react';
import { useMovie } from '@context/Movies';
import ButtonReset from '@components/feature/movie/resetButton';
import CardMovie from '@components/feature/movie/cardMovie';
import PaginationOutlined from '@components/mui/pagination';
import MainNavbar from '@components/layout/MainNavbar';
import SelectAscDsc from '@components/feature/movie/selectAscDsc';
import './pages.css';
import CircularIndeterminate from '@components/mui/loading';

const Home: FC = () => {
  const {
    currentPage,
    showMovies,
    totalPage,
    reset,
    setCurrentPage,
    setOrderByActors,
    getSearchByTitle,
  } = useMovie();

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

  if (!showMovies.length) return <CircularIndeterminate />;

  return (
    <MainNavbar callBack={handleSearchMovie}>
      <section className="Home">
        <nav className="minNavbar">
          <ButtonReset handleReset={handleReset} />
          <SelectAscDsc onChangeSelect={handleSortByActores} />
        </nav>
        <CardMovie dataSet={showMovies} />
        <PaginationOutlined
          totalPages={totalPage}
          currentPage={currentPage}
          handlePageChange={hanldePageChange}
        />
      </section>
    </MainNavbar>
  );
};

export default Home;
