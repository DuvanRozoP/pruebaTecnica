import { IMovieArticle } from '@type/page/Home';

export const filterArrayByProperty =
  <T>(value: string, property: keyof T) =>
  (array: T[]): T[] => {
    return array.filter(item => {
      const propertyValue = item[property];
      if (typeof propertyValue === 'string') {
        return propertyValue.includes(value);
      }
      return false;
    });
  };

export const updateFavorite = (
  movies: IMovieArticle[],
  payload: string | number,
) =>
  movies.map(movie =>
    movie.id === payload ? { ...movie, isFavorite: !movie.isFavorite } : movie,
  );

export const ascDsc = (movies: IMovieArticle[], payload: 'asc' | 'dsc') => {
  const options = {
    asc: [...movies].sort((a, b) => b.actores.length - a.actores.length),
    dsc: [...movies].sort((a, b) => a.actores.length - b.actores.length),
  };

  return options[payload];
};
