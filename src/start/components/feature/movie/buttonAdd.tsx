import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Stack from '@mui/material/Stack';
import { IButtonAdd } from '@type/components/mui/buttons';
import { PutMovieFavorite } from '@utils/axios';
import { useLocation } from 'react-router-dom';
import { useMovie } from '@context/Movies';
import { useFavorite } from '@context/Favorites';

export default function ButtonAdd({ id, isFavorite }: IButtonAdd) {
  const movie = useMovie();
  const favorite = useFavorite();
  const location = useLocation();
  const handleClick = () => {
    if (location.pathname === '/favorite') {
      if (isFavorite !== undefined) PutMovieFavorite(id, false);
      favorite.reset();
    } else {
      if (isFavorite !== undefined) PutMovieFavorite(id, !isFavorite);
      movie.reset();
    }
  };
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="contained"
        endIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        onClick={handleClick}
        sx={{ color: 'white', backgroundColor: isFavorite ? 'red' : 'blue' }}
      >
        {isFavorite ? 'Guardado' : 'Guardar'}
      </Button>
    </Stack>
  );
}
