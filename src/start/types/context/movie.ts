import { IMovieArticle } from '@type/page/Home';

export interface IMoviesState {
  showMovies: IMovieArticle[];
  orderAscDesc: 'asc' | 'desc' | 'none';
  currentPage: number;
  totalPage: number;
}

export interface IMoviesAction {
  getMovies: (query: string) => Promise<void>;
  getSearchByTitle: (value: string) => Promise<void>;
  getSortMoviesByActores: () => Promise<void>;
  setOrderByActors: (value: 'asc' | 'desc' | 'none') => void;
  setCurrentPage: (page: number) => void;
  reset: () => Promise<void>;
}

export interface IStore {
  children: React.ReactNode;
}
