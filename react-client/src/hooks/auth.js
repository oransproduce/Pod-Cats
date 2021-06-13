import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

export const authContext = createContext();

export const useAuth = () => useContext(authContext);

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);

  const login = (username, password, cb = () => {}) => {
    axios.post('/auth/login', { username, password }).then(({ data }) => {
      setUser(data);
      cb()
    }).catch((err) => {
      console.log('Login did not succeed, try again');
    });
  }
  const logout = (cb=() => {}) => {
    axios.delete('/auth/logout').then(() => {
      setUser(null);
      cb();
    })
  }
  const signup = (username, password, cb = () => {}) => {
    axios.post('/users', { username, password }).then(({ data }) => {
      setUser(data);
      cb();
    }).catch((err) => {
      console.log('Signup failed');
    });
  }
  const loggedin = (cb = () => {}) => {
    axios.get('/auth/loggedIn').then(({ data }) => {
      setUser(data);
      cb();
    }).catch((err) => {
      console.log(err);
    });
  }
  return {
    user,
    login,
    logout,
    signup,
    loggedin,
  };
}
