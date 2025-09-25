import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import { LanguageToggleButton } from './LanguageToggleButton';
import { useTranslation } from 'react-i18next';
import { useColorMode } from '../contexts/ThemeContext'; // 1. Import the theme hook

export default function NavbarSetting() {
  const { t } = useTranslation();
  // 2. Get the real mode and toggle function from our global context
  const { mode, toggleColorMode } = useColorMode(); 

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // 3. New handler for the theme toggle
  const handleThemeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newMode: 'light' | 'dark' | null,
  ) => {
    // Check if a new mode was selected and it's different from the current one
    if (newMode && newMode !== mode) {
      toggleColorMode();
    }
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}> 
        <Tooltip title={t('settings')}>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2, border: 1, padding: 0.5, borderRadius: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <SettingsOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl} 
        id="account-menu"
        open={open}
        onClose={handleClose}
        // ... (rest of the Menu props remain the same)
        slotProps={{ paper: { /* ... */ } }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* 4. Cleaner and more organized menu items */}
        <MenuItem>
          <Typography sx={{ fontSize: 15, mr: 2, flexGrow: 1 }}>{t('language')}</Typography>
          <LanguageToggleButton />
        </MenuItem>

        {/* Use a non-clickable container for the toggle group */}
        <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1 }}>
          <Typography sx={{ fontSize: 15, mr: 2, flexGrow: 1 }}>{t('theme')}</Typography>
          <ToggleButtonGroup
            color="primary"
            value={mode} // Use the mode from the global context
            exclusive
            onChange={handleThemeChange} // Use the new handler
            aria-label="theme"
          >
            <ToggleButton value="light">{t('light')}</ToggleButton>
            <ToggleButton value="dark">{t('dark')}</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Divider />
        
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {t('logout')}
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}