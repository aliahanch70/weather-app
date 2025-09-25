import React from 'react';
import { useTranslation } from 'react-i18next';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

export const LanguageToggleButton: React.FC = () => {
  // Use array destructuring for older versions
  const [t, i18n] = useTranslation();

  const handleLanguageChange = (
    event: React.MouseEvent<HTMLElement>,
    newLanguage: string | null,
  ) => {
    if (newLanguage !== null) {
      // Now 'i18n' is the correct object from the array's second element
      i18n.changeLanguage(newLanguage);
    }
  };

  return (
    <ToggleButtonGroup
      value={i18n.language}
      exclusive
      onChange={handleLanguageChange}
      aria-label="language"
      size="small"
    >
      <ToggleButton value="en" aria-label="English">En</ToggleButton>
      <ToggleButton value="fa" aria-label="Farsi">Fa</ToggleButton>
    </ToggleButtonGroup>
  );
};