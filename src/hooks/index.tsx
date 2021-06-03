import React from 'react';

import { ThemePortalProvider } from './theme';
import { ToastProvider } from './toast';
import { UserProvider } from './user';
import { AuthProvider } from './auth';
import { TransactionProvider } from './useTransaction';


const AppProvider: React.FC = ({ children }) => (
  <ThemePortalProvider>
    <ToastProvider>
      <UserProvider>
        <AuthProvider>
          <TransactionProvider>
            {children}
          </TransactionProvider>
        </AuthProvider>
      </UserProvider>
    </ToastProvider>
  </ThemePortalProvider>
);

export default AppProvider;
