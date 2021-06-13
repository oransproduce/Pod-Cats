import React, { useState } from 'react';
import { Box, Grid, Container, Paper, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    height: '100%',
    width: '100%',
  }
}));

export default function Login() {
  const { root, paper } = useStyles();
  const auth = useAuth();
  const history = useHistory();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { from } = location.state || { from: { pathname: '/' } };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else {
      setPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.login(username, password, () => {
      history.replace(from);
    });
  };

  return (
    <Container maxWidth="lg">
      <Grid className={root} justify="center" container>
        <Grid container direction="column" justify="center" item xs={6}>
          <Grid id="testing" item xs={7}>
            <Paper className={paper}>
              <form onSubmit={handleSubmit}>
                <Grid container justify="space-around" direction="column">
                  <Grid item xs={12}>
                    <TextField
                      name="username"
                      label="Username"
                      value={username}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="password"
                      label="Password"
                      value={password}
                      onChange={handleChange}
                      fullWidth
                      type="password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit">Submit</Button>
                  </Grid>
                </Grid>

              </form>
            </Paper>
          </Grid>
        </Grid>
    </Grid>
    </Container>
  );
}
