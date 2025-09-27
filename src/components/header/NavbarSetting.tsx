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
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useNavigate } from 'react-router-dom';
import { LanguageToggleButton } from './LanguageToggleButton';
import { useTranslation } from 'react-i18next';
import { ModeToggleButton } from './ModeToggleButton';

export default function NavbarSetting() {
  const navigator = useNavigate();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {

    console.log("User logged out");
    navigator('/'); // redirect to login
  }

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title={t('settings')}>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2, border: 1 , opacity:"70%", padding: 0.9, borderRadius: 2 }}
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
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >

        <Box sx={{ display: 'flex', flexDirection: 'column', p:2 , borderRadius: 5 }}>
          <Typography sx={{ fontSize: 14, mr: 2, flexGrow: 1,mb:0.5 }}>{t('theme')}</Typography>
          <ModeToggleButton />
        </Box>

        <Divider sx={{mx:2}} />

        <Box sx={{ display: 'flex', flexDirection: 'column', p:2 , borderRadius: 5 }}>
          <Typography sx={{ fontSize: 14, mr: 2, flexGrow: 1 , mb:0.5 }}>{t('language')}</Typography>
          <LanguageToggleButton />
        </Box>
        <Divider sx={{mx:2}} />

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {t('logout')}
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}