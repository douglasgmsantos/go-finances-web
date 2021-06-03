import React, { createContext, useCallback, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import api from '../services/api';

import Cookies from 'js-cookie';

interface SignInCredentials {
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  isAuthenticated: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  updateUser(user: User): void;
  signOut(): void;
  checkSession(): void;
}

interface AuthState {
  token: string;
  user: User;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [data, setData] = useState<AuthState>(() => {
    const token = Cookies.get('@GOFINANCEDGMOTA:token');
    const user = Cookies.get('@GOFINANCEDGMOTA:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  useEffect(() => {
    async function loadUserFromCookies() {
      setLoading(true);
      const token = Cookies.get('@GOFINANCEDGMOTA:token');
      const user = Cookies.get('@GOFINANCEDGMOTA:user');


      if (token && user) {
        api.defaults.headers.authorization = `Bearer ${token}`;

        setData({ token, user: JSON.parse(user) });
      } else {
        delete api.defaults.headers.Authorization
        setData({} as AuthState)
      }

      setLoading(false);
    }

    loadUserFromCookies()
  }, [])

  const signIn = useCallback(async ({ email, password }) => {
    try {
      setLoading(true);

      const { data: { success, message, result } } = await api.post('/sessions', {
        email,
        password,
      });

      if (!success)
        throw new Error(message);


      const { token, user } = result;

      Cookies.set('@GOFINANCEDGMOTA:token', token, { expires: 60 });
      Cookies.set('@GOFINANCEDGMOTA:user', JSON.stringify(user), { expires: 60 });

      api.defaults.headers.authorization = `Bearer ${token}`;

      setData({ token, user });
      setLoading(false);
      router.push("/dashboard");
    } catch (error) {
      setLoading(false);
      throw error
    }

  }, []);

  const signOut = useCallback(() => {
    Cookies.remove('@GOFINANCEDGMOTA:token');
    Cookies.remove('@GOFINANCEDGMOTA:user');

    setData({} as AuthState);
    router.push("/");
  }, []);

  const updateUser = useCallback((user: User) => {
    Cookies.set('@GOFINANCEDGMOTA:user', JSON.stringify(user));

    setData({
      token: data.token,
      user,
    });
  }, [setData, data.token]
  );

  const checkSession = useCallback(async () => {
    const { data: { success, message, result } } = await api.get('/sessions');

    if (!success)
      signOut()

  }, [signOut])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: Boolean(data.user),
        user: data.user,
        signIn,
        signOut,
        updateUser,
        loading,
        checkSession
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within as AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
