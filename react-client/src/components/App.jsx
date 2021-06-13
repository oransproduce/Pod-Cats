import React from 'react';
import AuthRouter from './AuthRouter';
import ProvideAuth from './ProvideAuth';

export default function App() {
  return (
    <ProvideAuth>
      <AuthRouter/>
    </ProvideAuth>
  )
}
