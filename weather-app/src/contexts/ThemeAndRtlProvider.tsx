import React, { useMemo, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { CssBaseline } from '@mui/material';

interface RtlProviderProps {
  children: ReactNode;
}

export const RtlProvider: React.FC<RtlProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const language = i18n.language;

  // theme 
  const outerTheme = useTheme();

  // change dir in body
  useEffect(() => {
    document.body.dir = language === 'fa' ? 'rtl' : 'ltr';
  }, [language]);

  // create new theme with direction
  const theme = useMemo(() => {
    return createTheme({
      ...outerTheme,
      direction: language === 'fa' ? 'rtl' : 'ltr',
    });
  }, [language, outerTheme]);

  // 2 cache for languages
  const cache = useMemo(() => {
    return language === 'fa'
      ? createCache({
          key: 'muirtl',
          stylisPlugins: [prefixer, rtlPlugin],
        })
      : createCache({
          key: 'muiltr',
          stylisPlugins: [prefixer],
        });
  }, [language]);

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
};
