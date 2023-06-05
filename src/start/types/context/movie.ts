import { IMovieArticle } from '@type/page/Home';
import {
  SEARCH_QUERY,
  SORT_BY_ACTORS,
  CURRENT_PAGE,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  ADD_COMMENT,
  SET_MOVIES,
  ASC_DESC,
  SET_ACTORS_VALUE,
} from '@context/movie/actions';

export interface IMovieState {
  movies: IMovieArticle[];
  favorites: number[];
  searchQuery: string;
  sortByActors: 'asc' | 'desc' | 'all';
  currentPage: number;
  totalPages: number;
  comments: string[];
}

export interface IMovieAction {
  setSortByActors: (value: 'asc' | 'desc' | 'all') => void;
  setAscDesc: (currentPage: number) => Promise<void>;
  setMovies: (currentPage: number) => Promise<void>;
}

export interface IStore {
  children: React.ReactNode;
}

export type TAction =
  | {
      type: typeof ASC_DESC;
      payload: IMovieArticle[];
    }
  | {
      type: typeof SET_MOVIES;
      payload: {
        movies: IMovieArticle[];
        sizeComplete: number;
      };
    }
  | {
      type: typeof SET_ACTORS_VALUE;
      payload: 'asc' | 'desc' | 'all';
    };
