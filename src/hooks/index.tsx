import React from 'react';

import { ThemePortalProvider } from './theme';
import { ToastProvider } from './toast';
import { UserProvider } from './user';
import { AuthProvider } from './auth';


const AppProvider: React.FC = ({ children }) => (
  <ThemePortalProvider>
    <ToastProvider>
      <UserProvider>
        <AuthProvider>
            {children}
        </AuthProvider>
      </UserProvider>
    </ToastProvider>
  </ThemePortalProvider>
);

export default AppProvider;
