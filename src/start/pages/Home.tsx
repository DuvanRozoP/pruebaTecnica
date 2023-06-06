import { FC } from 'react';
import { useMovie } from '@context/Movies';
import ButtonReset from '@components/feature/movie/resetButton';
import CardMovie from '@components/feature/movie/cardMovie';
import PaginationOutlined from '@components/mui/pagination';
import MainNavbar from '@components/layout/MainNavbar';
import SelectAscDsc from '@components/feature/movie/selectAscDsc';
import { useNavigate } from 'react-router-dom';
import './pages.css';

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
  const navigation = useNavigate();

  // Todo: fix/bug no hace el redireccionamiento
  if (showMovies.length === 0) {
    navigation('/notfound');
  }

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
