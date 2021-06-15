import React, { useState } from 'react';
import AuthForm from './AuthForm';
import useAuth from '../hooks/useAuth';

export default function Signup({}) {
  const auth = useAuth();
  return (
    <AuthForm title="Signup" submitFunction={auth.signup} />
  );
}
