import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components'

import { setCookie, parseCookies } from 'nookies'

import light from '../styles/themes/light';
import dark from '../styles/themes/dark';


interface ThemeContextData {
  theme: DefaultTheme;
  toggleTheme(): void;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

const ThemePortalProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<DefaultTheme>(light);

  useEffect(() => {
    const { "@GOFINANCEDGMOTA:theme": themeCookie } = parseCookies();

    if (!Boolean(themeCookie)) {
      setCookie(undefined, '@GOFINANCEDGMOTA:theme', theme.title, {
        maxAge: 60 * 60 * 24 * 30, // 30dias,
        path: "/"
      });
    } else {
      const { "@GOFINANCEDGMOTA:theme": themeCookie } = parseCookies();
      setTheme(themeCookie == "dark" ? dark : light)
    }
  }, [])


  const toggleTheme = () => {
    setTheme(theme.title === "light" ? dark : light);

    setCookie(undefined, '@GOFINANCEDGMOTA:theme', theme.title === "light" ? "dark" : "light", {
      maxAge: 60 * 60 * 24 * 30, // 30dias,
      path: "/"
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <ThemeContext.Provider value={{ toggleTheme, theme }} >
        {children}
      </ThemeContext.Provider>
    </ThemeProvider>
  );
};

function useTheme(): ThemeContextData {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within as ThemePortalProvider');
  }

  return context;
}

export { ThemePortalProvider, useTheme };
