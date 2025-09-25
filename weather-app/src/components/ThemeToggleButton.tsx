import React from 'react';
import { IconButton, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7'; 
import { useColorMode } from '../contexts/ThemeContext';

const ThemeToggleButton: React.FC = () => {
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();

  return (
    <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
      {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};

export default ThemeToggleButton;