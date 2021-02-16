import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Dialog, DiagloActions, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, Grid, Typography} from '@material-ui/core';
import { Rating } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
  },
  ratingTitle: {
    marginBottom: 10
  }

}));

export default function FormDialog({ showModal, updateShowModal, postReview }) {

  const classes = useStyles();

  let [value, changeValue] = useState('');
  let [rating, changeRating] = useState(2.5);
  const [hover, setHover] = useState(-1);

  const handleChange = (e) => {
    const { target } = e;
    changeValue(target.value);
  }

  const handleSubmit = (e) => {
    updateShowModal(false);
    const review = {
      body: value,
      rating,
    };
    postReview(review);
    changeValue('');
    changeRating('');
  }

  return (
    <div className={classes.root}>
      <Dialog maxWidth="xs" fullWidth open={showModal} onClose={() => updateShowModal(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Review</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Rating
          </DialogContentText>
          <Grid spacing={0} alignItems="flex-start" container justify="space-between">
            <Grid item xs={9}>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                  changeRating(newValue);
                  console.log(newValue);
                }}
                precision={0.1}
                size="large"
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <DialogContentText variant="h6">{rating}</DialogContentText>
            </Grid>
          </Grid>
          <DialogContentText>
            Add Your Review
          </DialogContentText>
          <TextField
            id="outlined-multiline-static"
            label="Review"
            multiline
            rows={10}
            value={value}
            onChange={handleChange}
            placeholder="Add Review"
            variant="outlined"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => updateShowModal(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}