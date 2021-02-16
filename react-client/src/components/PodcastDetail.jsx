import React, { useState } from 'react';
import { Paper, Grid, Typography, Container, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Reviews from './Reviews';
import EpisodeList from './EpisodeList';
import AddReviewModal from './AddReviewModal';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 80,
  },
  img: {
    width: '100%',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
  },
  imgSmall: {
    width: '100%',
    height: '100%',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    },
  },
  link: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
  },
  description: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
  },
  descriptionSmall: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    },
  }
}));

export default function PodcastDetail({pod}) {
  const [episodeCount, updateEpisodeCount] = useState(5);
  const [showModal, updateShowModal] = useState(false);
  const classes = useStyles();

  const eps = Object.keys(pod).length > 0 ? <EpisodeList episodeCount={episodeCount} episodes={pod.episodes} /> : <></>;
  const rvs = Object.keys(pod).length > 0 ? <Reviews reviews={pod.reviews} updateShowModal={updateShowModal} /> : <></>;

  return (
    <Container className={classes.root} maxWidth="lg">
      <Grid container direction="column">
        <Grid item xs={12}>
          <Grid container spacing={4}>
            <Grid item xs={4}>
              <Grid container spacing={3} direction="column">
                <Grid item xs={12}>
                  <img className={classes.img} src={pod.art600} />
                </Grid>
                <Grid className={classes.description} item xs={12}>
                  <Typography dangerouslySetInnerHTML={{__html: pod.description}} variant="body1" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container direction="column">
                <Grid item xs={12}>
                  <img className={classes.imgSmall} src={pod.art600} />
                </Grid>
                <Grid className={classes.descriptionSmall} item xs={12}>
                  <Typography dangerouslySetInnerHTML={{__html: pod.description}} variant="body1" />
                </Grid>
                <Grid item xs={12}>
                  {eps}
                </Grid>
                <Grid item xs={12}>
                  <Grid justify="center" container>
                    <Link onClick={() => updateEpisodeCount(episodeCount + 5)} className={classes.link}>Show more Episodes...</Link>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {rvs}
        </Grid>
      </Grid>
      <AddReviewModal showModal={showModal} updateShowModal={updateShowModal} />
    </Container>
  );
};