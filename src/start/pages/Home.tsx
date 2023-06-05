import { useNavigate } from 'react-router-dom';
import { FC } from 'react';
import { useMovie } from '@context/movie/store';
import type { IMovieArticle } from '@type/page/Home';
import CardMovie from '@components/feature/movie/cardMovie';
import PaginationOutlined from '@components/mui/pagination';
import usePagination from '@hooks/use-pagination';
import SelectText from '@components/feature/movie/selectAscDsc';
import './pages.css';
import ButtonReset from '@components/feature/movie/resetButton';

const Home: FC = () => {
  const navigate = useNavigate();
  const { moviesList, moviesFilter } = useMovie();
  const { totalPages, currentPage, handlePageChange, getCurrentItems } =
    usePagination<IMovieArticle>(
      moviesFilter.length ? moviesFilter : moviesList,
      4,
    );

  const handlePagination = (
    _event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    handlePageChange(page);
  };

  if (moviesList.length === 0) navigate('/notfound');

  return (
    <section className="Home">
      <nav className="minNavbar">
        <ButtonReset />
        <SelectText />
      </nav>
      <CardMovie dataSet={getCurrentItems() || moviesList} />
      <PaginationOutlined
        handlePageChange={handlePagination}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </section>
  );
};

export default Home;
