import React, { useState } from 'react';
import AuthForm from './AuthForm';
import { useAuth } from '../hooks/auth';

export default function AbstractedSignup() {
  const auth = useAuth();
  return (
    <AuthForm title="Signup" submitFunction={auth.signup} />
  );
}
