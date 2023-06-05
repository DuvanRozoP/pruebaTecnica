import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import type { MediaProps } from '@type/components/mui/skeleton';
import ButtonAdd from './buttons/buttonAdd';

function Skeleto({ loading = false, dataSet }: MediaProps) {
  return (
    <Grid container wrap="wrap" spacing={0} padding={2}>
      {(loading ? Array.from(new Array(3)) : dataSet)?.map((item, index) => (
        <Box key={index} sx={{ width: 210, marginRight: 0.5, my: 5 }}>
          {item ? (
            <img
              style={{ width: 210, height: 118 }}
              alt={item.title}
              src={item.picture}
            />
          ) : (
            <Skeleton variant="rectangular" width={210} height={118} />
          )}
          {item ? (
            <Box sx={{ pr: 2 }}>
              <Typography gutterBottom variant="body1">
                {item.titulo}
              </Typography>
              <Typography
                display="block"
                variant="body2"
                color="text.secondary"
              >
                {item.descripcion}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {`Calificacion • ${item.calificacion} - `}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {`Actores/Actrizes • ${item.actores.length}`}
              </Typography>
              <ButtonAdd id={item.id} isFavorite={item.isFavorite} />
            </Box>
          ) : (
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          )}
        </Box>
      ))}
    </Grid>
  );
}

export default Skeleto;
