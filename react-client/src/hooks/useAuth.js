import React, { createContext, useState, useContext } from 'react';
import { authContext } from './useProvideAuth.js';

export default function useAuth() {
  return useContext(authContext);
}
