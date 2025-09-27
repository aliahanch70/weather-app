import React from 'react';
import { useTranslation } from 'react-i18next';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

export const LanguageToggleButton: React.FC = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (
    _: React.MouseEvent<HTMLElement>,
    newLanguage: string | null,
  ) => {
    if (newLanguage !== null) {
      i18n.changeLanguage(newLanguage);
    }
  };

  return (
    <ToggleButtonGroup
      value={i18n.language}
      exclusive
      color="primary"
      onChange={handleLanguageChange}
      aria-label="language"
      sx={{
        borderRadius: 5
      }}
    >
      <ToggleButton sx={{ width: '100%' }} value="en" aria-label="English">En</ToggleButton>
      <ToggleButton sx={{ width: '100%' }} value="fa" aria-label="Farsi">Fa</ToggleButton>
    </ToggleButtonGroup>
  );
};