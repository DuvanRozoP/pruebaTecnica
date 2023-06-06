import { IMovieArticle } from '@type/page/Home';
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3001',
});

/**
 * funcion para obtener paginacion - GetMovieAll.
 * @param {string} query params para la peticion
 * @returns IMovieArticle[]
 * @example
 * // * normalmente
 * GetMovieAll('');
 * // * con params - favoritos
 * GetMovieAll('?isFavorite=true');
 */
export const GetMovieAll = async (query: string) => {
  try {
    return (await api.get(`/peliculas${query}`)).data;
  } catch (error) {
    throw new Error('GetMovieAll');
  }
};

/**
 * funcion para obtener paginacion - GetPagination.
 * @param {string} query params para la peticion
 * @returns IMovieArticle[]
 * @example
 * // * normalmente
 * GetPagination(`_page=${currentPage}&_limit=5`);
 * // * con params - favoritos
 * GetPagination(`isFavorite=true&_page=${currentPage}&_limit=5`);
 */
export const GetPagination = async (
  query: string,
): Promise<IMovieArticle[]> => {
  try {
    return (await api.get(`/peliculas?${query}`)).data;
  } catch (error) {
    throw new Error('GetPagination');
  }
};

/**
 * funcion para obtener paginacion - GetSearchByTitle.
 * @param {string} query params para la peticion
 * @returns IMovieArticle[]
 * @example
 * // * normalmente
 * GetSearchByTitle(`${query}&_page=${currenPage}&_limit=5`);
 * // * con params - favoritos
 * GetSearchByTitle(`${query}&isFavorite=true&_page=${currenPage}&_limit=5`);
 */
export const GetSearchByTitle = async (
  query: string,
): Promise<IMovieArticle[]> => {
  try {
    return (await api.get(`/peliculas?q=${query}`)).data;
  } catch (error) {
    throw new Error('GetSearchByTitle');
  }
};

/**
 * funcion para obtener paginacion - GetMoviesSortByActores.
 * @param {string} query params para la peticion
 * @returns IMovieArticle[]
 * @example
 * // * normalmente
 * GetMoviesSortByActores(`_sort=actores.length&_order=${orderAscDesc}&_page=${currenPage}&_limit=5`);
 * // * con params - favoritos
 * GetMoviesSortByActores(`isFavorite=true&_sort=actores.length&_order=${orderAscDesc}&_page=${currenPage}&_limit=5`);
 */
export const GetMoviesSortByActores = async (
  query: string,
): Promise<IMovieArticle[]> => {
  try {
    return (await api.get(`/peliculas?${query}`)).data;
  } catch (error) {
    throw new Error('GetMoviesSortByActores');
  }
};

export const PutMovieFavorite = async (id: number | string, value: boolean) => {
  try {
    const data = (await api.get(`/peliculas/${id}`)).data;
    await api.put(`/peliculas/${id}`, { ...data, isFavorite: value });
  } catch (error) {
    throw new Error('PutMovieFavorite');
  }
};

export const PostMovieComment = async (id: number, comment: string) => {
  try {
    if (comment.length === 0) throw new Error('comentario invalido');
    const data: IMovieArticle = (await api.get(`/peliculas/${id}`)).data;
    await api.put(`/peliculas/${id}`, {
      ...data,
      comments: [
        ...data.comments,
        {
          text: comment,
          author: 'anonimo',
        },
      ],
    });
  } catch (error) {
    throw new Error('PutMovieFavorite');
  }
};
