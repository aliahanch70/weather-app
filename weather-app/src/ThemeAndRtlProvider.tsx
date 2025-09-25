import React, { useMemo, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles'; // 1. Import useTheme
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { CssBaseline } from '@mui/material';

interface RtlProviderProps {
  children: ReactNode;
}

export const RtlProvider: React.FC<RtlProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const language = i18n.language;

  // 2. Get the theme from your OUTER provider (e.g., ColorModeProvider)
  const outerTheme = useTheme(); 

  useEffect(() => {
    document.body.dir = language === 'fa' ? 'rtl' : 'ltr';
  }, [language]);

  // 3. Create a NEW theme that combines the outer theme with the new direction
  const theme = useMemo(() => {
    return createTheme(outerTheme, {
      direction: language === 'fa' ? 'rtl' : 'ltr',
    });
  }, [language, outerTheme]);

  // The RTL cache logic remains the same
  const cacheRtl = useMemo(() => {
    return createCache({
      key: 'muirtl',
      stylisPlugins: language === 'fa' ? [rtlPlugin] : [],
    });
  }, [language]);

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
};