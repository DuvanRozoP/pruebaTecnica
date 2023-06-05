export interface IMovieArticle {
  id: number;
  titulo: string;
  picture: string;
  isFavorite: boolean;
  calificacion: number;
  actores: string[];
  descripcion: string;
  comments: string[];
}
