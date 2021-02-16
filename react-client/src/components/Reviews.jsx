import React, { useState } from 'react';
import { Card, Grid, Typography, Container, Divider, Toolbar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddCommentIcon from '@material-ui/icons/AddComment';
import Review from './Review';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  divider: {
    marginTop: 50,
    marginBottom: 20
  },
  reviews: {
    marginTop: 20,
    marginBottom: 10,
  },
  bold: {
    fontWeight: 800,
    marginRight: theme.spacing(1),
    marginBottom: 20,
  },
  icon: {
    marginRight: theme.spacing(1),
  }
}));

export default function Reviews ({reviews, updateShowModal}) {
  const classes = useStyles();
  const averageRating = reviews.map(review => review.rating).reduce((a, b) => a + b)/reviews.length;
  console.log(averageRating);
  return (
    <div className={classes.root}>
      <Divider className={classes.divider} light />
      <Grid className={classes.reviews} container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h5">Reviews</Typography>
        </Grid>
        <Grid item xs={6}>
          <Grid container justify="flex-end">
            <Button color="primary" size="large" onClick={() => updateShowModal(true)}>
              <AddCommentIcon className={classes.icon} />
              Add Review
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Toolbar>
        <Typography className={classes.bold} variant="h2">{Number.parseFloat(averageRating).toFixed(1)}</Typography>
        <Typography variant="h5">{'out of 5'}</Typography>
      </Toolbar>
      <Grid container spacing={3}>
        {reviews.map(review => <Review review={review} key={review.username}/>)}
      </Grid>
    </div>
  );
}