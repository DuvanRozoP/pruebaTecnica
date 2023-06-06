import Button from '@mui/material/Button';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Stack from '@mui/material/Stack';
import { IButtonReset } from '@type/components/movie/button';

export default function ButtonReset({ handleReset }: IButtonReset) {
  const handleClick = () => {
    handleReset();
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
