import React, { useState } from 'react';
import AuthForm from './AuthForm';
import { useAuth } from '../hooks/auth';

export default function AbstractedLogin() {
  const auth = useAuth();
  return (
    <AuthForm title="Login" submitFunction={auth.login} />
  );
}
