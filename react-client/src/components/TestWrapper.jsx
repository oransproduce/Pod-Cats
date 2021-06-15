import React from 'react';
import ProvideAuth from './ProvideAuth';
import { BrowserRouter } from 'react-router-dom';

export default function TestWrapper({ children }) {
  return (
    <BrowserRouter>
        {children}
    </BrowserRouter>
  );
}
