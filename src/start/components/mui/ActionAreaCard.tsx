import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import { Box, Button, CardActionArea, Stack, TextField } from '@mui/material';
import { IMovieArticle } from '@type/page/Home';
import { useState } from 'react';
import { PostMovieComment } from '@utils/axios';
import MainNavbar from '@components/layout/MainNavbar';
import Comments from './Comments';
import './ActionAreaCard.css';

//todo: tipos
interface IActionAreaCard {
  data: IMovieArticle;
}

export default function ActionAreaCard({ data }: IActionAreaCard) {
  const [input, setInput] = useState('');
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.currentTarget.value);
  };

  const addComment = async () => {
    try {
      await PostMovieComment(data.id, input);
    } catch (error) {
      alert(`no se pudo guardar el comentario`);
    } finally {
      window.location.reload();
    }
  };

  return (
    <MainNavbar>
      <section className="ActionAreaCard">
        <Card sx={{ maxWidth: 700, maxHeight: '50vh' }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={data.picture}
              alt={data.titulo}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {data.titulo}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {data.descripcion}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {`Calificacion • ${data.calificacion} - `}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {`Actores/Actrizes • ${data.actores?.length} - `}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {`Favorito • ${data.isFavorite ? 'si' : 'no'}`}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Box
          display="flex"
          height={40}
          justifyContent="center"
          alignItems="center"
          gap={4}
        >
          <Box
            sx={{
              width: '80%',
            }}
          >
            <TextField
              value={input}
              onChange={handleInput}
              fullWidth
              label="comentario"
              id="fullWidth"
            />
          </Box>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={addComment}
              sx={{
                color: 'white',
                backgroundColor: 'green',
              }}
            >
              Enviar
            </Button>
          </Stack>
        </Box>

        {data.comments.map((comment, index) => (
          <Comments key={comment.author + index} dataset={comment} />
        ))}
      </section>
    </MainNavbar>
  );
}
