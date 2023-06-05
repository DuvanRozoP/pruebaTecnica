import Button from '@mui/material/Button';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Stack from '@mui/material/Stack';
import { useMovie } from '@context/movie/store';

export default function ButtonReset() {
  const { reset } = useMovie();
  const handleClick = () => {
    reset();
  };
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="contained"
        endIcon={<RestartAltIcon />}
        onClick={handleClick}
        sx={{ color: 'white', backgroundColor: 'green' }}
      >
        Reset
      </Button>
    </Stack>
  );
}
