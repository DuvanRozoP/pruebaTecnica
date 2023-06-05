import { FC } from 'react';
import { useMovie } from '@context/movie/store';
import CardMovie from '@components/feature/movie/cardMovie';
import PaginationOutlined from '@components/mui/pagination';
import SelectText from '@components/feature/movie/selectAscDsc';
import './pages.css';
import ButtonReset from '@components/feature/movie/resetButton';

const Favorite: FC = () => {
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

    console.log('🚀 ~ orderAscDesc:', orderAscDesc);
    if (orderAscDesc === 'asc' || orderAscDesc === 'desc')
      setPagination(
        `isFavorite=true&_sort=actores.length&_order=${orderAscDesc}&_page=${page}`,
      );
    else setPagination(`isFavorite=true&_page=${page}`);
  };

  return (
    <section className="Favorite">
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
export default Favorite;
