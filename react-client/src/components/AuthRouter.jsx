import React, { useState, useEffect } from 'react';
import { Route, Switch, BrowserRouter, Link } from 'react-router-dom';
import { CircularProgress, Box } from '@material-ui/core';
import axios from 'axios';

import TopBar from './TopBar';
import Main from './Main';
import Login from './Login';
import Signup from './Signup';
import ProtectedRoute from './ProtectedRoute';
import PodcastDetail from './PodcastDetail';

import useAuth from '../hooks/useAuth';

export default function AuthRouter() {

  const [searchTerm, setSearchTerm] = useState('');

  const { loggedin, loading } = useAuth();

  useEffect(loggedin, []);

  if (loading) {
    return (
      <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <BrowserRouter>
      <TopBar setSearchTerm={setSearchTerm} />
      <Switch>
        <ProtectedRoute exact path="/">
          <Main
            searchTerm={searchTerm}
          />
        </ProtectedRoute>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/:podname">
          <PodcastDetail />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
