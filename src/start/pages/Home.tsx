import { FC } from 'react';
import { useMovie } from '@context/movie/store';
import CardMovie from '@components/feature/movie/cardMovie';
import SelectText from '@components/feature/movie/selectAscDsc';
import ButtonReset from '@components/feature/movie/resetButton';
import './pages.css';
import PaginationOutlined from '@components/mui/pagination';

const Home: FC = () => {
  const {
    showMovies,
    totalPage,
    currentPage,
    orderAscDesc,
    setPagination,
    setCurrentPage,
  } = useMovie();

  const hanldePageChange = (page: number) => {
    setCurrentPage(page);

    if (orderAscDesc === 'asc' || orderAscDesc === 'desc')
      setPagination(
        `_sort=actores.length&_order=${orderAscDesc}&_page=${page}`,
      );
    else setPagination(`_page=${page}`);
  };

  return (
    <section className="Home">
      <nav className="minNavbar">
        <ButtonReset />
        <SelectText />
      </nav>
      <CardMovie dataSet={showMovies} />
      <PaginationOutlined
        totalPages={totalPage}
        currentPage={currentPage}
        handlePageChange={hanldePageChange}
      />
    </section>
  );
};

export default Home;
