import React, { useState, useEffect } from 'react';
import { Route, Switch, BrowserRouter, Link } from 'react-router-dom';

import TopBar from './TopBar';
import Main from './Main';
import Login from './Login';
import Signup from './Signup';
import ProtectedRoute from './ProtectedRoute';

import { useAuth } from '../hooks/auth';

export default function AuthRouter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [itemDetail, setItemDetail] = useState(false);
  const { loggedin } = useAuth();
  useEffect(loggedin, []);
  return (
    <BrowserRouter>
      <TopBar setItemDetail={setItemDetail} setSearchTerm={setSearchTerm} />
      <Switch>
        <ProtectedRoute exact path="/">
          <Main
            searchTerm={searchTerm}
            itemDetail={itemDetail}
            setItemDetail={setItemDetail}
          />
        </ProtectedRoute>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
