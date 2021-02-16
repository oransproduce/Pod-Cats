import React, { useState } from 'react';
import { Card, Grid, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Rating } from '@material-ui/lab';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  card: {
    height: 200,
    padding: 16,
  },
});

export default function Review ({ review }) {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <Grid container justify="space-between" spacing={1} direction="column">
          <Grid item xs={12}>
            <Rating size="small" precision={0.1} value={review.rating} readOnly/>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">{review.username}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">{review.body}</Typography>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}