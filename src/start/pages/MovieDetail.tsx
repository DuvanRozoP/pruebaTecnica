import useFetch from '@hooks/use-fetch';
import { useParams } from 'react-router-dom';
import ActionAreaCard from '@components/mui/ActionAreaCard';
import { IMovieArticle } from '@type/page/Home';
import './pages.css';

function MovieDetail() {
  const { id } = useParams();
  const { data, isLoading, error } = useFetch<IMovieArticle>(
    `/peliculas/${id}`,
  );

  if (isLoading) return <>cargando</>;
  if (error) return <>hubo un error</>;

  return (
    <main className="MovieDetail">
      {data !== null ? <ActionAreaCard data={data} /> : 'sin datos'}
    </main>
  );
}

export default MovieDetail;
