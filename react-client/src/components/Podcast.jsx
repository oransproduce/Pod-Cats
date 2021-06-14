import React from 'react';
import { Paper, Grid, Typography, Fab } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  img: {
    height: 'auto',
    width: '100%',
    cursor: 'pointer',
  },
  description: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  }
}));

const Podcast = ({ pod, imageClick }) => {
  const classes = useStyles();
  return (
    <Grid item sm={9} xs={12}>
      <Paper elevation={3} className={classes.paper}>
        <Grid container justify="space-between" spacing={3}>
          <Grid container alignItems="center" item xs={4}>
            <img onClick={() => imageClick(pod._id)} className={classes.img} src={pod.art600} />
          </Grid>
          <Grid item xs={8}>
            <Grid container direction="column" spacing={2} justify="space-between">
              <Grid container item xs={12} justify="space-between">
                <Grid item>
                  <Typography color="textPrimary" variant="h5">
                    {pod.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Fab aria-label="like">
                    <FavoriteIcon />
                  </Fab>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography color="textSecondary" variant="h6">
                  {pod.author}
                </Typography>
              </Grid>
              <Grid className={classes.description} item xs={12}>
                <Typography dangerouslySetInnerHTML={{__html: pod.description}} variant="body1" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>

  );
}

export default Podcast;