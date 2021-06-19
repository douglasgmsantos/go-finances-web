import React, { createContext, useCallback, useState, useContext, useEffect } from 'react';
import Router, { useRouter } from 'next/router';

import { api } from "../services/apiClient";

import { setCookie, parseCookies, destroyCookie } from 'nookies'


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
  signOut(): void;
}

interface AuthState {
  token: string;
  user: User;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const signOut = () => {
  destroyCookie(undefined, '@GOFINANCEDGMOTA:token');
  destroyCookie(undefined, '@GOFINANCEDGMOTA:user');
  destroyCookie(undefined, '@GOFINANCEDGMOTA:refresh_token');


  Router.push("/");
};

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // async function loadUserFromCookies() {
    //   const { "@GOFINANCEDGMOTA:token": token } = parseCookies();
    //   const { "@GOFINANCEDGMOTA:use": user } = parseCookies();

    //   if (token && user) {
    //     api.defaults.headers.authorization = `Bearer ${token}`;

    //     setData({ token, user: JSON.parse(user) });
    //   } else {
    //     delete api.defaults.headers.Authorization
    //     setData({} as AuthState)
    //   }
    // }

    // loadUserFromCookies()
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


      const { token, user, refresh_token } = result;

      setCookie(undefined, '@GOFINANCEDGMOTA:token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30dias,
        path: "/"
      });
      setCookie(undefined, '@GOFINANCEDGMOTA:user', JSON.stringify(user), {
        maxAge: 60 * 60 * 24 * 30, // 30dias,
        path: "/"
      });
      setCookie(undefined, '@GOFINANCEDGMOTA:refresh_token', refresh_token, {
        maxAge: 60 * 60 * 24 * 30, // 30dias,
        path: "/"
      });

      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      setUser(user);
      router.push("/dashboard");
    } catch (error) {
      throw error
    } finally {
      setLoading(false);
    }

  }, []);


  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: Boolean(user),
        user,
        signIn,
        signOut,
        loading
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

export { AuthContext, AuthProvider, useAuth };
