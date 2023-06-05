import { IMovieState } from '@type/context/movie';
import { IMovieArticle } from '@type/page/Home';

export const setMoviesAll = (
  state: IMovieState,
  payload: {
    movies: IMovieArticle[];
    sizeComplete: number;
  },
): IMovieState => ({
  ...state,
  movies: payload.movies,
  totalPages: Math.ceil(payload.sizeComplete / 5),
});

export const setAscDesc = (state: IMovieState, payload: IMovieArticle[]) => ({
  ...state,
  movies: payload,
});

export const searchQuery = (
  state: IMovieState,
  payload: string,
): IMovieState => {
  return {
    ...state,
    searchQuery: payload,
  };
};

export const setValueSort = (
  state: IMovieState,
  payload: 'asc' | 'desc' | 'all',
) => {
  return {
    ...state,
    sortByActors: payload,
  };
};

export const sortByActors = (
  state: IMovieState,
  payload: {
    movies: IMovieArticle[];
    currentPage: number;
    totalPages: number;
  },
): IMovieState => {
  return {
    ...state,
    movies: payload.movies,
    currentPage: payload.currentPage,
    totalPages: payload.totalPages,
  };
};

export const setCurrentPageH = (
  state: IMovieState,
  payload: IMovieArticle[],
): IMovieState => {
  return {
    ...state,
    movies: payload,
  };
};

export const addFavorite = (
  state: IMovieState,
  payload: number,
): IMovieState => {
  const updatedFavorites = [...state.favorites, payload];
  return {
    ...state,
    favorites: updatedFavorites,
  };
};

export const removeFavorite = (
  state: IMovieState,
  payload: number,
): IMovieState => {
  const updatedFavorites = state.favorites.filter(id => id !== payload);
  return {
    ...state,
    favorites: updatedFavorites,
  };
};

export const addComment = (
  state: IMovieState,
  payload: { movieId: number; comment: string },
): IMovieState => {
  const updatedMovies = state.movies.map(movie => {
    if (movie.id === payload.movieId) {
      return {
        ...movie,
        comments: [...movie.comments, payload.comment],
      };
    }
    return movie;
  });
  return {
    ...state,
    movies: updatedMovies,
  };
};

export const updateCurrentPage = (state: IMovieState, payload: number) => {
  return {
    ...state,
    currentPage: payload,
  };
};
