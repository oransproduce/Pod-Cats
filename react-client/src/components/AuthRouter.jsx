import React, { useState } from 'react';
import { Route, Switch, BrowserRouter, Link } from 'react-router-dom';
import TopBar from './TopBar';
import App from './App';
import Login from './Login';
import Signup from './Signup';
import ProvideAuth from './ProvideAuth';

export default function AuthRouter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [itemDetail, setItemDetail] = useState(false);
  return (
    <ProvideAuth>
      <BrowserRouter>
        <TopBar setItemDetail={setItemDetail} setSearchTerm={setSearchTerm} />
        <Switch>
          <Route exact path="/">
            <App
              searchTerm={searchTerm}
              itemDetail={itemDetail}
              setItemDetail={setItemDetail}
            />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
        </Switch>
      </BrowserRouter>
    </ProvideAuth>
  );
}
