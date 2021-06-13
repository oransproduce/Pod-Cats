import React, { useState } from 'react';
import axios from 'axios';
import { Box } from '@material-ui/core';
import { useAuth } from '../hooks/auth';

export default function Signup() {

  const auth = useAuth();
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
    auth.signup(username, password, () => {
      setUsername('');
      setPassword('');
      history.replace(from);
    });
  };

  return (
    <Box mt={10}>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input name="username" value={username} onChange={handleChange} />
        </label>
        <label>
          Password
          <input name="password" type="password" value={password} onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </Box>
  );
}
