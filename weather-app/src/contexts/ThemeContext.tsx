import React, { createContext, useState, useMemo, useContext, } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material';
import type { ReactNode } from 'react';
import type { PaletteMode } from '@mui/material';

// تعریف نوع برای Context
interface ColorModeContextType {
  toggleColorMode: () => void;
  mode: PaletteMode;
}

const ColorModeContext = createContext<ColorModeContextType | undefined>(undefined);

export const ColorModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>(() => {
    try {
      const storedMode = localStorage.getItem('themeMode') as PaletteMode;
      return storedMode || 'dark'; // مقدار پیش‌فرض 
    } catch (error) {
      return 'light';
    }
  });

  // تابع برای تغییر حالت و ذخیره آن در حافظه مرورگر
  const toggleColorMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    try {
      localStorage.setItem('themeMode', newMode);
    } catch (error) {
      console.error("Could not save theme mode to localStorage", error);
    }
  };

  const theme = useMemo(
    () =>
      createTheme({
        
        palette: {
          mode,
          primary: {
            main: '#4f8ce7ff',
            light: '#F3F4F7',
            dark: '#F3F4F7',
            contrastText: '#ffffff',
          },
          secondary: {
            main: '#FFC107',
            contrastText: '#000000',
          },
          background: {
            default: mode === 'light' ? '#F3FAFE' : '#151D32',
            paper: mode === 'light' ? '#E1E9EE' : '#292F45',
          },
          background2: {
            default: mode === 'light' ? '#F3FAFE' : '#151D32',
            paper: mode === 'light' ? '#CDD9E0' : '#3F4861',
          },
          color1: {
            default: mode === 'light' ? ' #003464' : '#F3FAFE',
            paper: mode === 'light' ? '#3F4861' : '#3F4861',
          },
          color2: {
            default: mode === 'light' ? ' #202224ff' : '#F3FAFE',
            paper: mode === 'light' ? '#CDD9E0' : '#3F4861',
          },
          
          tertiary: {
            main: '#003464',
            contrastText: '#F3F4F7',
          },
        },
      }),
    [mode],
  );

  const value = { toggleColorMode, mode };

  return (
    <ColorModeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
};


export const useColorMode = (): ColorModeContextType => {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error('useColorMode must be used within a ColorModeProvider');
  }
  return context;
};