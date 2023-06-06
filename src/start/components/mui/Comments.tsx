import { Avatar, Grid } from '@mui/material';
import { comments } from '@type/page/Home';

interface IComments {
  dataset: comments;
}

export default function Comments({ dataset }: IComments) {
  return (
    <Grid container wrap="nowrap" spacing={2}>
      <Grid item>
        <Avatar alt={dataset.author} src="https://picsum.photos/300/200" />
      </Grid>
      <Grid justifyContent="left" item xs zeroMinWidth>
        <h4 style={{ margin: 0, textAlign: 'left' }}>{dataset.author}</h4>
        <p style={{ textAlign: 'left' }}>{dataset.text}</p>
      </Grid>
    </Grid>
  );
}
