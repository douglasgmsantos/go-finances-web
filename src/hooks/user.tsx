import React, { createContext, useCallback, useState, useContext } from 'react';
import { api } from "../services/apiClient";

interface User {
  name: string;
  email: string;
  password: string;
}


interface UserContextData {
  loading: boolean;
  registerUser(user: User): void;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

const UserProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false)

  const registerUser = useCallback(async ({ name, email, password }) => {
    try {
      setLoading(true);
      const { data: { success, message } } = await api.post('/users', {
        name, email, password
      });

      if (!success)
        throw new Error(message);

    } finally {
      setLoading(false);
    }
  }, [api]);

  return (
    <UserContext.Provider value={{
      registerUser,
      loading
    }}>
      {children}
    </UserContext.Provider>
  );

};

function user(): UserContextData {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within as UserProvider');
  }

  return context;
}

export { UserProvider, user };
