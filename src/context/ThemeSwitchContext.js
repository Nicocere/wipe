"use client"

import localforage from 'localforage';
import React, { createContext, useState, useContext, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleThemeChange = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
    const h2Tags = document.querySelectorAll('h2');
    h2Tags.forEach((p) => {
      p.classList.toggle('dark-mode');
    });
  };

  useEffect(() => {
    async function saveTheme() {
      const savedTheme = await localforage.getItem('theme');
      if (savedTheme) {
        setIsDarkMode(savedTheme === 'dark');
        if (savedTheme === 'dark') {
          document.body.classList.add('dark-mode');
        }
      }
    }

    saveTheme();
  }, []);

  useEffect(() => {
    async function localForageTheme() {
      await localforage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }

    localForageTheme();
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        handleThemeChange,
        setIsDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export function useThemeContext() {
  return useContext(ThemeContext);
}