import React from 'react';

import { QueryClientProvider, QueryClient } from 'react-query';

import { ThemePortalProvider } from './theme';
import { ToastProvider } from './toast';
import { UserProvider } from './user';
import { AuthProvider } from './auth';

const queryClient = new QueryClient();


const AppProvider: React.FC = ({ children }) => (
  <ThemePortalProvider>
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <UserProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </UserProvider>
      </ToastProvider>
    </QueryClientProvider>
  </ThemePortalProvider>
);

export default AppProvider;
