import React, { createContext, useState, useMemo, useContext, } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material';
import type { ReactNode } from 'react';
import type { PaletteMode } from '@mui/material';

// def context
interface ColorModeContextType {
  toggleColorMode: () => void;
  mode: PaletteMode;
}

const ColorModeContext = createContext<ColorModeContextType | undefined>(undefined);

export const ColorModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>(() => {
    try {
      const storedMode = localStorage.getItem('themeMode') as PaletteMode;
      return storedMode || 'dark'; // default dark
    } catch (error) {
      return 'light';
    }
  });

  // change theme mode and save to localStorage
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
        
        typography: {
          fontFamily: "Vazir, Arial, sans-serif",
        },


        palette: {
          mode,
          primary: {
            main: '#4f8ce7ff',
            light: '#e9a512ff',
            dark: '#2b54cfff',
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
        components: {
    MuiMenu: {
      styleOverrides: {
        paper: ({ theme }: any) => ({
          backgroundColor:
            theme.palette.mode === "dark"
              ? '#151D32'
              : '#fff',
          borderRadius: 8,
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          "--Paper-overlay": "none", // 🚀 این خط مهمه
          backgroundImage: "none",   // مطمئن میشه هیچ گرادیان نیاد
        },
      },
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

// custom hook for color mode context
export const useColorMode = (): ColorModeContextType => {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error('useColorMode must be used within a ColorModeProvider');
  }
  return context;
};