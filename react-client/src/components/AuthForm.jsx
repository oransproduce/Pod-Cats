import React, { useState } from 'react';
import { Box, Grid, Container, Paper, TextField, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  verticalFlex: {
    height: '100%',
  }
}));

export default function AuthForm({ title, submitFunction }) {
  const { root, verticalFlex } = useStyles();
  const history = useHistory();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { from } = location.state || { from: { pathname: '/' } };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    if (name === 'username') {
      setUsername(value);
    } else {
      setPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitFunction(username, password, () => {
      setUsername('');
      setPassword('');
      history.replace(from);
    });
  };

  return (
    <Container maxWidth="lg">
      <Grid className={root} justify="center" container>
        <Grid item xs={6}>
          <Box className={verticalFlex} display="flex" flexDirection="column" justifyContent="center">
            <Box flex={1}/>
            <Box flex={1.5}>
              <Paper className={verticalFlex}>
                <form data-testid="auth-form" className={verticalFlex} onSubmit={handleSubmit}>
                  <Box
                    className={verticalFlex}
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-around"
                  >
                    <Box mx="auto">
                      <Typography variant="h4">
                        {title}
                      </Typography>
                    </Box>
                    <Box px={3}>
                      <TextField
                        name="username"
                        label="Username"
                        value={username}
                        onChange={handleChange}
                        fullWidth
                        data-testid="username-field"
                        required
                      />
                    </Box>
                    <Box px={3}>
                      <TextField
                        name="password"
                        label="Password"
                        value={password}
                        onChange={handleChange}
                        fullWidth
                        type="password"
                        data-testid="password-field"
                        required
                      />
                    </Box>
                    <Box mx="auto">
                      <Button variant="contained" type="submit">Submit</Button>
                    </Box>
                  </Box>
                </form>
              </Paper>
            </Box>
            <Box flex={1}/>
          </Box>
        </Grid>
    </Grid>
    </Container>
  );
}
