import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Grid, Typography, Container, Link, Box, Fab, CircularProgress } from '@material-ui/core';
import { FavoriteIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'

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
    width: 'auto',
    maxHeight: 'auto',
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

export default function PodcastDetail() {
  const [episodeCount, updateEpisodeCount] = useState(5);
  const [showModal, updateShowModal] = useState(false);
  const [pod, setPod] = useState(null);
  const classes = useStyles();
  const { podname } = useParams();

  const getByName = (name) => {
    axios.get(`/podcasts/name/${name}`).then(({data}) => {
      setPod(data);
    }).catch(err => {
      console.log(err);
    });
  };

  const getById = (id) => {
    axios.get(`/podcasts/${id}`).then(({data}) => {
      setPod(data);
    }).catch(err => {
      console.log(err);
    });
  }

  const postReview = (review) => {
    const id = pod._id;
    review.username = user.username;
    axios.post(`/podcasts/${id}/review`, review).then(() => {
      getById(id);
    }).catch(err => {
      console.log(err);
    });
  };

  useEffect(() => {
    getByName(podname);
  }, []);

  if (!pod) {
    return (
      <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }

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
              <Grid container direction="column" spacing={1} justify="space-between">
                <Grid item xs={12}>
                  <Grid container justify="center">
                    <img className={classes.imgSmall} src={pod.art600} />
                  </Grid>
                </Grid>
                <Grid className={classes.descriptionSmall} item xs={12}>
                  <Typography dangerouslySetInnerHTML={{__html: pod.description}} variant="body1" />
                </Grid>
                <Grid item xs={12}>
                  <EpisodeList episodeCount={episodeCount} episodes={pod.episodes} />
                </Grid>
                <Grid item xs={12}>
                  <Grid justify="center" container>
                    <Link onClick={() => updateEpisodeCount(episodeCount + 5)} className={classes.link}>
                      <Typography>
                        Show more Episodes...
                      </Typography>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Reviews reviews={pod.reviews} updateShowModal={updateShowModal} />
        </Grid>
      </Grid>
      <AddReviewModal postReview={postReview} showModal={showModal} updateShowModal={updateShowModal} />
    </Container>
  );
}
