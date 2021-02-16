import React from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  img: {
    [theme.breakpoints.up('md')]: {
      height: 200,
      width: 200,
    },
    [theme.breakpoints.down('sm')]: {
      height: 100,
      width: 100,
    },
    cursor: 'pointer',
  },
  content: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  audio: {
    width: '100%',
  }
}));

export default function Episode ({ episode }) {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <Paper elevation={3} className={classes.paper}>
        <Grid container direction="column" justify="space-between" spacing={3}>
          <Grid item xs={12}>
            <Typography color="textPrimary" variant="h6">
              {episode.pubDate}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="textSecondary" variant="h6">
              {episode.title}
            </Typography>
          </Grid>
          <Grid className={classes.content} item xs={12}>
            <Typography dangerouslySetInnerHTML={{__html: episode.contentSnippet}} variant="body1" />
          </Grid>
          <Grid item xs={12}>
            <audio className={classes.audio} controls src={episode.audioLink}>
                  Your browser does not support the
                  <code>audio</code> element.
            </audio>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

//audioLink: "https://dts.podtrac.com/redirect.mp3/files.thisamericanlife.org/do-listen-twice/audio/do-listen-twice-10.mp3"

