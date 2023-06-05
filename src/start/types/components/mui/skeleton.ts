import { IMovieArticle } from '@type/page/Home';

export interface MediaProps {
  loading?: boolean;
  dataSet: IMovieArticle[] | null;
}
