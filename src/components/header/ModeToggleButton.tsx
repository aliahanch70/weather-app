import React from 'react';
import { useTranslation } from 'react-i18next';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useColorMode } from '../../contexts/ThemeContext';
import SunnyIcon from '@mui/icons-material/Sunny';
import DarkModeTwoToneIcon from '@mui/icons-material/DarkModeTwoTone';


export const ModeToggleButton: React.FC = () => {
    const { t } = useTranslation();
    const { mode, toggleColorMode } = useColorMode();

    // theme toggle
    const handleThemeChange = (
        _event: React.MouseEvent<HTMLElement>,
        newMode: 'light' | 'dark' | null,
    ) => {
        // Check mode 
        if (newMode && newMode !== mode) {
            toggleColorMode();
        }
    };

    return (
        <ToggleButtonGroup
            color="primary"
            value={mode}
            exclusive
            onChange={handleThemeChange}
            aria-label="Theme"
            sx={{
                borderRadius: 5
            }}
        >
            <ToggleButton value="light" sx={{fontSize:12}}><SunnyIcon sx={{ fontSize: 16, mx: 1, }} /> {t('light')}</ToggleButton>
            <ToggleButton value="dark" sx={{fontSize:12}}><DarkModeTwoToneIcon sx={{ fontSize: 16, mx: 1 }} />{t('dark')}</ToggleButton>
        </ToggleButtonGroup>
    );
};