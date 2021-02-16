import React from 'react';
import { Paper, Grid, Container } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import Podcast from './Podcast.jsx';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 80,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const PodcastList = ({ podcasts, searchTerm, imageClick }) => {
  const classes = useStyles();
  return (
    <Container maxWidth='lg'>
      <div className={classes.root}>
        <Grid justify="center" container spacing={3}>
          {podcasts.map(pod => <Podcast imageClick={imageClick} pod={pod} key={pod.name} />)}
        </Grid>
      </div>
    </Container>
  );
}

export default PodcastList;
