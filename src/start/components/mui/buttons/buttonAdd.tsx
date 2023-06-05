import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Stack from '@mui/material/Stack';
import { IButtonAdd } from '@type/components/mui/buttons';
import { useMovie } from '@context/movie/store';

export default function ButtonAdd({ id, isFavorite = false }: IButtonAdd) {
  const { addFavorite } = useMovie();
  const handleClick = () => {
    addFavorite(id);
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
