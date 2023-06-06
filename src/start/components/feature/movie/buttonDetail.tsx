import Button from '@mui/material/Button';
import InfoIcon from '@mui/icons-material/Info';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';

interface IButtonDetail {
  id: number | string;
}

export default function ButtonDetail({ id }: IButtonDetail) {
  return (
    <Link to={`/movie/${id}`}>
      <Stack direction="row" spacing={2} marginTop={2}>
        <Button
          variant="contained"
          endIcon={<InfoIcon />}
          sx={{ color: 'white', backgroundColor: 'green' }}
        >
          Click para mas.
        </Button>
      </Stack>
    </Link>
  );
}
