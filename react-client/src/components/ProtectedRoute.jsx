import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

export default function ProtectedRoute({ children, ...rest }) {
  const auth = useAuth();
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={({ location }) => (auth.user ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: 'login',
            state: {
              from: location,
            },
          }}
        />
      ))}
    />
  );
}
