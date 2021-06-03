import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components'

import Cookies from 'js-cookie';

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
    if (!Boolean(Cookies.get("@GOFINANCEDGMOTA:theme"))) {
      Cookies.set("@GOFINANCEDGMOTA:theme", theme.title)
    } else {
      setTheme(Cookies.get("@GOFINANCEDGMOTA:theme") == "dark" ? dark : light)
    }
  }, [])


  const toggleTheme = () => {
    setTheme(theme.title === "light" ? dark : light)
    Cookies.set("@GOFINANCEDGMOTA:theme", theme.title === "light" ? "dark" : "light")
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
