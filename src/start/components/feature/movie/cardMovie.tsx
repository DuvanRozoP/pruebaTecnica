import Box from '@mui/material/Box';
import Skeleto from '../../mui/skeleton';
import type { MediaProps } from '@type/components/mui/skeleton';
import './cards.css';

export default function CardMovie({ loading = false, dataSet }: MediaProps) {
  return (
    <section className="ArticlesMovies">
      <Box sx={{ width: '100%', height: '100%' }}>
        <Skeleto dataSet={dataSet} loading={loading} />
      </Box>
    </section>
  );
}
