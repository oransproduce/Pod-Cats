import React, { useState } from 'react';
import AuthForm from './AuthForm';
import useAuth from '../hooks/useAuth';

export default function Login() {
  const auth = useAuth();
  return (
    <AuthForm title="Login" submitFunction={auth.login} />
  );
}
