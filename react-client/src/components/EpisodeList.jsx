import React from 'react';
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Episode from './Episode';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function EpisodeList({ episodes, episodeCount }) {
  const classes = useStyles();
  episodes = episodes.slice(0, episodeCount);
  return (
    <Grid justify="center" container spacing={3}>
      {episodes.map(episode => <Episode episode={episode} key={episode.title}/>)}
    </Grid>
  )
};